import { Mail, Phone, Building2 } from "lucide-react";
import { Card, CardBody, Badge } from "@/components/ui/primitives";
import { SectionWrap } from "@/components/public/sections";
import { SITE, FUTURE_TRACKS } from "@/lib/constants/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <SectionWrap>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">Get in touch</h1>
          <p className="mt-4 text-lg text-muted">
            Questions about plans, a school license, or a technical issue? Send us a
            message and our team will get back to you.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:bg-brand-50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-500">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase tracking-wide text-muted">
                  Email
                </span>
                <span className="text-sm font-semibold text-ink">{SITE.email}</span>
              </span>
            </a>

            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:bg-brand-50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-500">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase tracking-wide text-muted">
                  Phone
                </span>
                <span className="text-sm font-semibold text-ink">{SITE.phone}</span>
              </span>
            </a>
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-brand-50 p-5">
            <div className="flex items-center gap-2 text-ink">
              <Building2 className="h-5 w-5 text-brand-500" />
              <span className="text-sm font-semibold">Request a school demo</span>
            </div>
            <p className="mt-1.5 text-sm text-muted">
              Bringing {SITE.name} to your institution? Choose “School” in the form and
              we'll arrange a walkthrough of enrollment, analytics and licensing.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-ink">Coming soon</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {FUTURE_TRACKS.map((t) => (
                <Badge key={t.name} tone="amber">
                  {t.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Card>
          <CardBody>
            <form className="space-y-5">
              <div>
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="label" htmlFor="role">
                  I am a
                </label>
                <select id="role" name="role" className="input" defaultValue="Student">
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                  <option value="School">School</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="input"
                  placeholder="How can we help?"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Send message
              </button>
            </form>
          </CardBody>
        </Card>
      </div>
    </SectionWrap>
  );
}
