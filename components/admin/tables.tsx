import { Avatar, Badge } from "@/components/ui/primitives";
import { bdt } from "@/lib/utils/format";
import { RowMenu } from "./RowMenu";

function StatusBadge({ status }: { status: string }) {
  const s = status.toUpperCase();
  const tone =
    s === "ACTIVE" || s === "PAID"
      ? "green"
      : s === "PENDING" || s === "TRIALING"
        ? "amber"
        : s === "FAILED" ||
            s === "SUSPENDED" ||
            s === "CANCELLED" ||
            s === "INACTIVE" ||
            s === "EXPIRED"
          ? "gray"
          : "blue";
  return (
    <Badge tone={tone as "green" | "amber" | "gray" | "blue"}>{status}</Badge>
  );
}

function Table({
  head,
  children,
}: {
  head: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-line bg-surface">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
            {head.map((h) => (
              <th
                key={h}
                className={`px-4 py-3 font-semibold ${
                  h === "Action" ? "text-right" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}

// ---- UserTable ----
type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  status: string;
  joined: string;
};

export function UserTable({
  rows,
  onEdit,
  onToggleStatus,
  onDelete,
}: {
  rows: UserRow[];
  onEdit?: (user: UserRow) => void;
  onToggleStatus?: (user: UserRow) => void;
  onDelete?: (user: UserRow) => void;
}) {
  const withActions = Boolean(onEdit || onToggleStatus || onDelete);
  const head = ["User", "Role", "Plan", "Status", "Joined"];
  if (withActions) head.push("Action");

  return (
    <Table head={head}>
      {rows.map((u) => (
        <tr key={u.id} className="hover:bg-brand-50/40">
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar name={u.name} size={32} />
              <div>
                <div className="font-medium text-ink">{u.name}</div>
                <div className="text-xs text-muted">{u.email}</div>
              </div>
            </div>
          </td>
          <td className="px-4 py-3 text-muted">{u.role.replace("_", " ")}</td>
          <td className="px-4 py-3">
            <Badge tone="blue">{u.plan}</Badge>
          </td>
          <td className="px-4 py-3">
            <StatusBadge status={u.status} />
          </td>
          <td className="px-4 py-3 text-muted">{u.joined}</td>
          {withActions && (
            <td className="px-4 py-3">
              <RowMenu
                items={[
                  ...(onEdit
                    ? [{ label: "Edit", onSelect: () => onEdit(u) }]
                    : []),
                  ...(onToggleStatus
                    ? [
                        {
                          label:
                            u.status === "suspended" ? "Activate" : "Suspend",
                          onSelect: () => onToggleStatus(u),
                        },
                      ]
                    : []),
                  ...(onDelete
                    ? [
                        {
                          label: "Delete",
                          danger: true,
                          onSelect: () => onDelete(u),
                        },
                      ]
                    : []),
                ]}
              />
            </td>
          )}
        </tr>
      ))}
    </Table>
  );
}

// ---- PaymentTable ----
export function PaymentTable({
  rows,
}: {
  rows: {
    id: string;
    user: string;
    provider: string;
    plan: string;
    amount: number;
    status: string;
    date: string;
  }[];
}) {
  return (
    <Table head={["User", "Provider", "Plan", "Amount", "Status", "Date"]}>
      {rows.map((p) => (
        <tr key={p.id} className="hover:bg-brand-50/40">
          <td className="px-4 py-3 font-medium text-ink">{p.user}</td>
          <td className="px-4 py-3 text-muted">{p.provider}</td>
          <td className="px-4 py-3 text-muted">{p.plan}</td>
          <td className="px-4 py-3 font-semibold text-ink">{bdt(p.amount)}</td>
          <td className="px-4 py-3">
            <StatusBadge status={p.status} />
          </td>
          <td className="px-4 py-3 text-muted">{p.date}</td>
        </tr>
      ))}
    </Table>
  );
}

// ---- SubscriptionTable ----
export function SubscriptionTable({
  rows,
}: {
  rows: {
    id: string;
    user: string;
    plan: string;
    status: string;
    started: string;
    renews: string;
  }[];
}) {
  return (
    <Table head={["User", "Plan", "Status", "Started", "Renews"]}>
      {rows.map((s) => (
        <tr key={s.id} className="hover:bg-brand-50/40">
          <td className="px-4 py-3 font-medium text-ink">{s.user}</td>
          <td className="px-4 py-3">
            <Badge tone="blue">{s.plan}</Badge>
          </td>
          <td className="px-4 py-3">
            <StatusBadge status={s.status} />
          </td>
          <td className="px-4 py-3 text-muted">{s.started}</td>
          <td className="px-4 py-3 text-muted">{s.renews}</td>
        </tr>
      ))}
    </Table>
  );
}

// ---- ContentManagerTable ----
type ContentRow = {
  id: string;
  title: string;
  type: string;
  subject: string;
  status: string;
};

export function ContentManagerTable({
  rows,
  onEdit,
  onToggleStatus,
  onDelete,
}: {
  rows: ContentRow[];
  onEdit?: (row: ContentRow) => void;
  onToggleStatus?: (row: ContentRow) => void;
  onDelete?: (row: ContentRow) => void;
}) {
  const withActions = Boolean(onEdit || onToggleStatus || onDelete);
  const head = ["Title", "Type", "Subject", "Status"];
  if (withActions) head.push("Action");

  return (
    <Table head={head}>
      {rows.map((c) => (
        <tr key={c.id} className="hover:bg-brand-50/40">
          <td className="px-4 py-3 font-medium text-ink">{c.title}</td>
          <td className="px-4 py-3 text-muted">{c.type}</td>
          <td className="px-4 py-3 text-muted">{c.subject}</td>
          <td className="px-4 py-3">
            <StatusBadge status={c.status} />
          </td>
          {withActions && (
            <td className="px-4 py-3">
              <RowMenu
                items={[
                  ...(onEdit
                    ? [{ label: "Edit", onSelect: () => onEdit(c) }]
                    : []),
                  ...(onToggleStatus
                    ? [
                        {
                          label: c.status === "active" ? "Unpublish" : "Publish",
                          onSelect: () => onToggleStatus(c),
                        },
                      ]
                    : []),
                  ...(onDelete
                    ? [
                        {
                          label: "Delete",
                          danger: true,
                          onSelect: () => onDelete(c),
                        },
                      ]
                    : []),
                ]}
              />
            </td>
          )}
        </tr>
      ))}
    </Table>
  );
}

export { StatusBadge };
