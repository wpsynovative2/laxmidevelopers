/** Job roles offered on the live site's Apply Now form, grouped as they appear there. */

export interface RoleGroup {
  group: string;
  blurb: string;
  roles: string[];
}

export const roleGroups: RoleGroup[] = [
  {
    group: "Projects & Engineering",
    blurb: "Planning, execution and site delivery — the people who put the building up.",
    roles: [
      "Project Manager",
      "Site Engineer",
      "Civil Engineer",
      "Construction Supervisor",
      "Quantity Surveyor",
      "Safety Officer",
    ],
  },
  {
    group: "Sales & Marketing",
    blurb: "The front line — channel relationships, campaigns and customer conversations.",
    roles: [
      "Sales Executive / Sales Manager",
      "Channel Partner Manager",
      "Marketing Executive",
      "Digital Marketing Specialist",
      "Customer Relationship Manager",
    ],
  },
  {
    group: "Property & Operations",
    blurb: "Keeping delivered assets running well long after handover.",
    roles: ["Property Manager", "Facility Manager", "Leasing Executive", "Operations Manager"],
  },
  {
    group: "Corporate & Compliance",
    blurb: "Finance, people and the legal clarity every project is built on.",
    roles: [
      "HR Executive",
      "Accounts Executive",
      "Finance Manager",
      "Legal Officer (Real Estate / RERA)",
      "Admin Executive",
    ],
  },
];

/** Flat list for the role <select> on the application form. */
export const allRoles = roleGroups.flatMap((g) => g.roles);

export const experienceOptions = ["Fresher", "1 – 3 years", "3 – 5 years", "5 – 10 years", "10+ years"];
