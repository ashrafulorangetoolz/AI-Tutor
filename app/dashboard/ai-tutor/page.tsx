import { PageHeader } from "@/components/dashboard/cards";
import { AiTutorChat } from "@/components/ai/AiTutorChat";

export const metadata = { title: "AI Tutor" };

export default function AiTutorPage() {
  return (
    <div>
      <PageHeader
        title="AI Tutor"
        subtitle="Ask anything — step by step, in English or বাংলা"
      />
      <AiTutorChat userId="usr_student" />
    </div>
  );
}
