export type Issue = {
  id: string;
  title: string;
  category: string;
  description: string;
  country: string;
  state: string;
  district: string;
  city: string;
  locality: string;
  supporters: number;
  comments: number;
  status: "Reported" | "Under Review" | "Acknowledged" | "In Progress" | "Resolved";
};

export const issues: Issue[] = [
  {
    id: "issue-001",
    title: "Large potholes on main road",
    category: "Roads & Transport",
    description:
      "Several large potholes have appeared along the main road and are making travel difficult and unsafe.",
    country: "India",
    state: "Example State",
    district: "Example District",
    city: "Example City",
    locality: "Example Area",
    supporters: 24,
    comments: 1,
    status: "Reported",
  },
  {
 id: "issue-002",
    title: "Irregular drinking water supply",
    category: "Water & Sanitation",
    description:
      "Residents are reporting inconsistent access to the local drinking water supply.",
    country: "India",
    state: "Example State",
    district: "Example District",
    city: "Example City",
    locality: "Example Area",
    supporters: 18,
    comments: 3,
    status: "Under Review",
  },
];