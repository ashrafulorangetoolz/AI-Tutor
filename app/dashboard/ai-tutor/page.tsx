import { AiTutorChat } from "@/components/ai/AiTutorChat";

export const metadata = { title: "AI Tutor" };

export default function AiTutorPage() {
  return (
    <div className="h-[calc(100vh-7rem)]">
      <AiTutorChat userId="usr_student" />
    </div>
  );
}
