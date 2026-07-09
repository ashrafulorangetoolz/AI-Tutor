import type { Metadata } from "next";
import { UsersExplorer } from "./UsersExplorer";

export const metadata: Metadata = { title: "Users" };

export default function AdminUsersPage() {
  return <UsersExplorer />;
}
