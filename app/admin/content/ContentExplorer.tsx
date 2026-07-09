"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/cards";
import { ContentManagerTable } from "@/components/admin/tables";
import { useToast } from "@/components/ui/toast";

const TYPE_OPTIONS = ["Concept Card", "Mock Exam", "Question"];
const SUBJECT_OPTIONS = [
  "Physics",
  "Mathematics",
  "Chemistry",
  "English",
  "Biology",
];
const STATUS_OPTIONS = ["active", "draft"];

type ContentRow = {
  id: string;
  title: string;
  type: string;
  subject: string;
  status: string;
};

export function ContentExplorer({ initialRows }: { initialRows: ContentRow[] }) {
  const { toast } = useToast();
  const [rows, setRows] = useState<ContentRow[]>(initialRows);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<ContentRow | null>(null);

  return (
    <>
      <PageHeader
        title="Content Management"
        action={
          <button className="btn-primary" onClick={() => setAddOpen(true)}>
            ＋ New concept card
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Concept cards"
          value={(1240).toLocaleString()}
          icon={<span>📚</span>}
          tone="brand"
        />
        <StatCard
          label="Mock exams"
          value={(86).toLocaleString()}
          icon={<span>📝</span>}
          tone="blue"
        />
        <StatCard
          label="Questions"
          value={(5400).toLocaleString()}
          icon={<span>❓</span>}
          tone="amber"
        />
      </div>

      <ContentManagerTable
        rows={rows}
        onEdit={(row) => setEditing(row)}
        onToggleStatus={(row) => {
          setRows((prev) =>
            prev.map((x) =>
              x.id === row.id
                ? { ...x, status: x.status === "active" ? "draft" : "active" }
                : x,
            ),
          );
          toast(row.status === "active" ? "Unpublished." : "Published.");
        }}
        onDelete={(row) => {
          setRows((prev) => prev.filter((x) => x.id !== row.id));
          toast("Content deleted.");
        }}
      />

      <ContentDialog
        open={addOpen || editing !== null}
        item={editing}
        onClose={() => {
          setAddOpen(false);
          setEditing(null);
        }}
        onCreate={(row) => setRows((prev) => [row, ...prev])}
        onUpdate={(row) =>
          setRows((prev) => prev.map((x) => (x.id === row.id ? row : x)))
        }
      />
    </>
  );
}

function ContentDialog({
  open,
  item,
  onClose,
  onCreate,
  onUpdate,
}: {
  open: boolean;
  item: ContentRow | null;
  onClose: () => void;
  onCreate: (row: ContentRow) => void;
  onUpdate: (row: ContentRow) => void;
}) {
  const { toast } = useToast();
  const isEdit = item !== null;
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Concept Card");
  const [subject, setSubject] = useState("Physics");
  const [status, setStatus] = useState("draft");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setTitle(item?.title ?? "");
    setType(item?.type ?? "Concept Card");
    setSubject(item?.subject ?? "Physics");
    setStatus(item?.status ?? "draft");
  }, [open, item]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast("Title is required.", "error");
      return;
    }
    if (isEdit) {
      onUpdate({ ...item, title: title.trim(), type, subject, status });
      toast("Content updated.");
    } else {
      onCreate({
        id: `c${Math.floor(Date.now() % 1_000_000)}`,
        title: title.trim(),
        type,
        subject,
        status,
      });
      toast("Concept card created.");
    }
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <form
          role="dialog"
          aria-modal="true"
          aria-label={isEdit ? "Edit content" : "New concept card"}
          onSubmit={submit}
          className={`w-full max-w-md rounded-2xl bg-surface shadow-xl transition-all duration-200 ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between border-b border-line px-5 py-4">
            <div>
              <h2 className="text-xl font-semibold text-ink">
                {isEdit ? "Edit content" : "New concept card"}
              </h2>
              <p className="mt-0.5 text-sm text-muted">
                {isEdit
                  ? "Update this content item's details."
                  : "Add a new item to the content library."}
              </p>
            </div>
            <button
              type="button"
              className="btn-ghost -mr-2 -mt-1 p-2"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4 px-5 py-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Title
              </label>
              <input
                className="input"
                placeholder="e.g. Newton's Laws of Motion"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  Type
                </label>
                <select
                  className="input"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  Subject
                </label>
                <select
                  className="input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {SUBJECT_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Status
              </label>
              <select
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-line px-5 py-4">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? "Save changes" : "Create card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
