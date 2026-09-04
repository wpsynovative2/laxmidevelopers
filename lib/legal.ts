/**
 * Privacy Policy, Terms & Conditions and Disclaimer — transcribed verbatim from
 * the popups on https://laxmi-developers.com. Shown through the shared modal.
 */

export type LegalKey = "privacy" | "terms" | "disclaimer";

export interface LegalDocument {
  key: LegalKey;
  title: string;
  intro?: string;
  /** Bullet list; `term` renders as a bolded lead-in when present. */
  points: { term?: string; text: string }[];
  outro?: string;
}

export const legalDocuments: Record<LegalKey, LegalDocument> = {
  privacy: {
    key: "privacy",
    title: "Privacy Policy",
    intro: "We respect your privacy and are committed to protecting your personal information.",
    points: [
      { term: "Information Collected", text: "Name, phone number, email, and any details you submit through the form." },
      {
        term: "Usage",
        text: "Your information is used to contact you regarding this residential project, share updates, offers, and respond to your inquiries.",
      },
      { term: "Consent", text: "By submitting the form, you agree to receive communication via call, SMS, email, or WhatsApp." },
      {
        term: "Data Sharing",
        text: "We do not sell your personal data. It may be shared with our authorized sales and marketing partners strictly for project-related communication.",
      },
      { term: "Data Security", text: "We take reasonable steps to protect your information from unauthorized access or misuse." },
      { term: "Your Rights", text: "You may request to access, update, or delete your personal data by contacting us." },
    ],
    outro: "By using this website and submitting your details, you agree to this Privacy Policy.",
  },

  terms: {
    key: "terms",
    title: "Terms & Conditions",
    intro: "By submitting this form, you agree to the following:",
    points: [
      { text: "You consent to be contacted via call, SMS, email, or WhatsApp regarding this residential project." },
      { text: "The information provided by you is accurate to the best of your knowledge." },
      { text: "Submission of this form does not constitute a booking or any legal commitment." },
      { text: "All project details, including pricing, plans, and specifications, are subject to change without prior notice." },
      { text: "Images and visuals are for illustrative purposes only." },
      { text: "Your data will be used as per our Privacy Policy." },
    ],
  },

  disclaimer: {
    key: "disclaimer",
    title: "Disclaimer",
    points: [
      {
        text: "The information, plans, specifications, images, configuration, dimensions, facilities and other details contained herein are indicative of the kind of development that is proposed by the Promoter and the intended recipient/reader/viewer/interested party should note that these are to be treated as purely provisional and informative and as such only tentative subject to approval of authorities or otherwise and the Promoter reserves the right to make changes and alterations at its sole discretion.",
      },
      {
        text: "None of the images, material, stock photography, projections, elevations, details, descriptions and other information that are displayed/contained herein, should be deemed to be or constitute advertisements, solicitations, marketing, offer for sale, invitation to offer, invitation to acquire, including within the purview of the Real Estate (Development and Regulation) Act, 2016 (\u201cRERA\u201d).",
      },
      {
        text: "This advertisement is purely conceptual and purchase in this project shall be governed by the terms and conditions of the Agreement for Sale. While every reasonable care has been taken in fashioning this advertisement, any intended recipient/reader/viewer/interested party should verify all the information with the Promoter prior to purchase in the project; the Promoter cannot be held responsible for any inaccuracies or omissions.",
      },
      {
        text: "The Promoter shall not be responsible for any action taken by the intended recipient/reader/viewer/interested party relying on such material/information on the Website and brochures and any information provided by Real Estate Agent/Broker/Channel Partner without independently verifying with the Promoter.",
      },
    ],
    outro: "*T&C Apply",
  },
};

/** Short version pinned to the footer of every page. */
export const shortDisclaimer =
  "All images, plans, specifications and details shown are indicative and subject to change and to the approval of the competent authorities. Nothing on this website constitutes an offer or invitation under RERA. Please verify all details with the Promoter before purchase.";
