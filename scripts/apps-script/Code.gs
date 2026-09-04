/**
 * Laxmi Developers — form receiver.
 *
 * Receives enquiry and career submissions from the Next.js site, appends each
 * one as a row in a Google Sheet, saves any attached CV to Drive, and emails a
 * notification.
 *
 * ---------------------------------------------------------------------------
 * SETUP
 * ---------------------------------------------------------------------------
 * 1. Create a Google Sheet. Copy its ID from the URL:
 *      https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
 * 2. In that Sheet: Extensions -> Apps Script. Delete the starter code and
 *    paste this file in.
 * 3. Project Settings -> Script Properties, add:
 *      SHEET_ID        the ID from step 1
 *      NOTIFY_EMAIL    where notifications go (comma-separate for several)
 *      CV_FOLDER_ID    (optional) a Drive folder ID for uploaded CVs
 * 4. Deploy -> New deployment -> type "Web app".
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    Authorise when prompted, then copy the /exec URL.
 * 5. Put that URL in the site's .env.local as:
 *      NEXT_PUBLIC_FORMS_ENDPOINT=https://script.google.com/macros/s/.../exec
 *
 * Re-deploy ("Manage deployments" -> edit -> new version) after any edit here,
 * otherwise the live URL keeps serving the old code.
 * ---------------------------------------------------------------------------
 */

var SHEETS = {
  enquiry: {
    name: 'Enquiries',
    headers: [
      'Submitted At',
      'Name',
      'Phone',
      'Email',
      'Project',
      'Best Time',
      'Message',
      'Consent',
      'Source',
      'Page URL',
    ],
  },
  career: {
    name: 'Applications',
    headers: [
      'Submitted At',
      'Name',
      'Phone',
      'Email',
      'Role',
      'Experience',
      'Message',
      'Consent',
      'Source',
      'Page URL',
      'CV',
    ],
  },
};

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Empty request body.' });
    }

    var payload = JSON.parse(e.postData.contents);
    var form = payload.form === 'career' ? 'career' : 'enquiry';

    // Reject anything missing the fields the site always sends — usually a bot.
    if (!payload.name || !payload.phone || !payload.email) {
      return jsonResponse({ ok: false, error: 'Missing required fields.' });
    }

    var submittedAt = payload.submittedAt ? new Date(payload.submittedAt) : new Date();
    var timestamp = Utilities.formatDate(submittedAt, 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');

    var row;
    var cvLink = '';

    if (form === 'career') {
      cvLink = saveCv(payload.cv, payload.name);
      row = [
        timestamp,
        payload.name,
        payload.phone,
        payload.email,
        payload.role || '',
        payload.experience || '',
        payload.message || '',
        payload.consent ? 'Yes' : 'No',
        payload.source || '',
        payload.pageUrl || '',
        cvLink,
      ];
    } else {
      row = [
        timestamp,
        payload.name,
        payload.phone,
        payload.email,
        payload.project || '',
        payload.bestTime || '',
        payload.message || '',
        payload.consent ? 'Yes' : 'No',
        payload.source || '',
        payload.pageUrl || '',
      ];
    }

    appendRow(form, row);
    sendNotification(form, payload, timestamp, cvLink);

    return jsonResponse({ ok: true });
  } catch (err) {
    // Log for the Apps Script execution history, but never leak internals to the page.
    console.error(err);
    return jsonResponse({ ok: false, error: 'Could not record the submission.' });
  }
}

/** A plain GET is handy for confirming the deployment is live. */
function doGet() {
  return jsonResponse({ ok: true, service: 'Laxmi Developers forms' });
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

function prop(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

/** Appends to the right tab, creating it with a frozen header row if needed. */
function appendRow(form, row) {
  var config = SHEETS[form];
  var sheetId = prop('SHEET_ID');
  var book = sheetId ? SpreadsheetApp.openById(sheetId) : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(config.name);

  if (!sheet) {
    sheet = book.insertSheet(config.name);
    sheet.appendRow(config.headers);
    sheet.getRange(1, 1, 1, config.headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow(row);
}

/** Writes a base64 CV into Drive and returns a shareable link (blank if none). */
function saveCv(cv, applicantName) {
  if (!cv || !cv.data) return '';

  var bytes = Utilities.base64Decode(cv.data);
  var safeName = String(applicantName || 'applicant').replace(/[^\w\s-]/g, '').trim();
  var stamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd-HHmmss');
  var blob = Utilities.newBlob(bytes, cv.mimeType || 'application/octet-stream', safeName + ' - ' + stamp + ' - ' + cv.filename);

  var folderId = prop('CV_FOLDER_ID');
  var file = folderId ? DriveApp.getFolderById(folderId).createFile(blob) : DriveApp.createFile(blob);

  return file.getUrl();
}

function sendNotification(form, payload, timestamp, cvLink) {
  var to = prop('NOTIFY_EMAIL');
  if (!to) return;

  var isCareer = form === 'career';
  var subject = isCareer
    ? 'New job application: ' + payload.name + ' — ' + (payload.role || 'role not specified')
    : 'New enquiry: ' + payload.name + ' — ' + (payload.project || 'no project selected');

  var rows = [
    ['Name', payload.name],
    ['Phone', payload.phone],
    ['Email', payload.email],
  ];

  if (isCareer) {
    rows.push(['Role', payload.role || '—']);
    rows.push(['Experience', payload.experience || '—']);
    if (cvLink) rows.push(['CV', '<a href="' + cvLink + '">Open CV</a>']);
  } else {
    rows.push(['Project', payload.project || '—']);
    rows.push(['Best time to call', payload.bestTime || 'Any time']);
  }

  rows.push(['Message', payload.message || '—']);
  rows.push(['Source', payload.source || '—']);
  rows.push(['Page', payload.pageUrl || '—']);
  rows.push(['Received', timestamp + ' IST']);

  var body =
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">' +
    '<h2 style="color:#14593a;margin:0 0 16px">' +
    (isCareer ? 'New job application' : 'New website enquiry') +
    '</h2><table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px">' +
    rows
      .map(function (pair, i) {
        var bg = i % 2 === 0 ? '#f7f5ef' : '#ffffff';
        return (
          '<tr style="background:' +
          bg +
          '"><td style="width:150px;color:#7a7a7a">' +
          pair[0] +
          '</td><td style="color:#121c26"><strong>' +
          pair[1] +
          '</strong></td></tr>'
        );
      })
      .join('') +
    '</table>' +
    '<p style="margin-top:20px;font-size:12px;color:#7a7a7a">Sent automatically from laxmi-developers.com</p></div>';

  MailApp.sendEmail({
    to: to,
    subject: subject,
    htmlBody: body,
    replyTo: payload.email,
    name: 'Laxmi Developers Website',
  });
}
