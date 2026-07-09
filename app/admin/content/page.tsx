import type { Metadata } from "next";
import { ContentExplorer } from "./ContentExplorer";

export const metadata: Metadata = { title: "Content" };

const CONTENT_ROWS = [
  { id: "c1", title: "Newton's Laws of Motion", type: "Concept Card", subject: "Physics", status: "active" },
  { id: "c2", title: "Quadratic Equations", type: "Concept Card", subject: "Mathematics", status: "active" },
  { id: "c3", title: "IELTS Task 2 Structure", type: "Concept Card", subject: "English", status: "active" },
  { id: "c4", title: "Physics Board Model Test", type: "Mock Exam", subject: "Physics", status: "active" },
  { id: "c5", title: "Organic Chemistry Basics", type: "Concept Card", subject: "Chemistry", status: "draft" },
  { id: "c6", title: "IELTS Reading Full Mock", type: "Mock Exam", subject: "English", status: "active" },
  { id: "c7", title: "Balancing Redox Reactions", type: "Question", subject: "Chemistry", status: "draft" },
  { id: "c8", title: "Trigonometric Identities", type: "Question", subject: "Mathematics", status: "active" },
];

export default function AdminContentPage() {
  return <ContentExplorer initialRows={CONTENT_ROWS} />;
}
