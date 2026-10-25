import {
  Shield,
  Lock,
  Eye,
  FileText,
  Mail,
  Info,
  ChevronRight,
  UserRound,
  Code2,
  Database,
  CheckCircle2,
  Fingerprint,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: Info,
    number: "01",
  },
  {
    id: "data-collection",
    title: "Information We Collect",
    icon: Database,
    number: "02",
  },
  {
    id: "usage",
    title: "How We Use Information",
    icon: Eye,
    number: "03",
  },
  {
    id: "security",
    title: "Data Security",
    icon: Lock,
    number: "04",
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    number: "05",
  },
];

const dataCards = [
  {
    icon: UserRound,
    title: "Account Information",
    description:
      "Name, email address, and phone number provided when creating or managing an account.",
    tag: "IDENTITY",
  },
  {
    icon: Code2,
    title: "Submission Information",
    description:
      "Project titles, descriptions, repository links, live project links, and related submission details.",
    tag: "PROJECTS",
  },
  {
    icon: Fingerprint,
    title: "Account & Activity Data",
    description:
      "Information associated with account access, submission status, and platform interactions.",
    tag: "ACTIVITY",
  },
  {
    icon: FileText,
    title: "Feedback & Reviews",
    description:
      "Feedback, reviews, and related information submitted through the platform.",
    tag: "FEEDBACK",
  },
];

const usageItems = [
  {
    title: "Operate the platform",
    description:
      "Manage accounts and provide the platform's submission and review features.",
  },
  {
    title: "Manage submissions",
    description:
      "Track submitted projects, submission statuses, and associated feedback.",
  },
  {
    title: "Communicate with users",
    description:
      "Support relevant account communications and service-related notifications.",
  },
  {
    title: "Protect platform integrity",
    description:
      "Help maintain account security and identify suspicious or unauthorized activity.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-145 overflow-hidden"
      >
        <div className="absolute left-1/2 top-70 size-162.5 -translate-x-1/2 rounded-full bg-primary/9 blur-[120px]" />
        <div className="absolute -right-37.5 top-40 size-75 rounded-full bg-blue-500/[0.07] blur-[100px]" />
        <div className="absolute -left-37.5 top-65 size-75 rounded-full bg-cyan-500/6 blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="relative border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-medium text-primary shadow-sm">
              <ShieldCheck className="size-4" />
              Your privacy matters
              <span className="ml-1 size-1.5 rounded-full bg-primary" />
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Privacy, built on{" "}
              <span className="bg-linear-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                trust.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Your projects deserve a secure place to grow. Learn what
              information Dev Submit collects, how it is used, and how we
              approach protecting your privacy.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-4 py-3 text-sm shadow-sm backdrop-blur">
                <FileText className="size-4 text-primary" />
                Privacy policy
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-4 py-3 text-sm text-muted-foreground shadow-sm backdrop-blur">
                <Lock className="size-4 text-primary" />
                Data protection
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                icon: Eye,
                title: "Transparency",
                description: "Understand our data practices",
              },
              {
                icon: Shield,
                title: "Privacy awareness",
                description: "Thoughtful handling of information",
              },
              {
                icon: Fingerprint,
                title: "Account protection",
                description: "Security-conscious practices",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 p-4 text-left backdrop-blur transition-colors hover:border-primary/30"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    On this page
                  </p>
                  <h2 className="mt-1 text-lg font-bold">Contents</h2>
                </div>

                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-4" />
                </div>
              </div>

              <nav aria-label="Privacy policy contents" className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;

                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground transition-all hover:bg-primary/[0.07] hover:text-foreground"
                    >
                      <span className="font-mono text-xs text-muted-foreground/60 group-hover:text-primary">
                        {section.number}
                      </span>

                      <Icon className="size-4 shrink-0 group-hover:text-primary" />

                      <span className="min-w-0 flex-1 font-medium">
                        {section.title}
                      </span>

                      <ChevronRight className="size-4 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  );
                })}
              </nav>

              <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-4">
                <ShieldCheck className="size-5 text-primary" />

                <p className="mt-3 text-sm font-semibold">
                  Your information matters
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Review this policy to understand how information is handled
                  when using Dev Submit.
                </p>
              </div>
            </div>
          </aside>

          {/* Policy */}
          <article className="min-w-0 space-y-6">
            {/* Introduction */}
            <section
              id="introduction"
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9"
            >
              <SectionHeading
                number="01"
                eyebrow="WELCOME TO DEV SUBMIT"
                title="Introduction"
                icon={Info}
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <p>
                  Welcome to{" "}
                  <strong className="text-foreground">Dev Submit</strong>. We
                  recognize that your personal information deserves careful
                  handling. This Privacy Policy explains the types of
                  information that may be collected when you use the platform,
                  how that information may be used, and the importance of
                  protecting it.
                </p>

                <p>
                  By using Dev Submit, you can refer to this policy to
                  understand our stated privacy practices. The information
                  provided here should be read alongside any applicable notices
                  presented when you use specific platform features.
                </p>
              </div>
            </section>

            {/* Data collection */}
            <section
              id="data-collection"
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9"
            >
              <SectionHeading
                number="02"
                eyebrow="INFORMATION & DATA"
                title="Information We Collect"
                icon={Database}
              />

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Depending on how you use the platform, the following categories
                of information may be relevant to providing and managing Dev
                Submit features.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {dataCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group rounded-2xl border border-border/80 bg-muted/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/[0.035] hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex size-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-5" />
                        </div>

                        <span className="rounded-md border border-border px-2 py-1 text-[10px] font-bold tracking-wider text-muted-foreground">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="mt-5 font-bold tracking-tight">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Usage */}
            <section
              id="usage"
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9"
            >
              <SectionHeading
                number="03"
                eyebrow="PURPOSE & TRANSPARENCY"
                title="How We Use Information"
                icon={Eye}
              />

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Information may be used to support the platform&apos;s core
                functionality and help maintain a reliable experience. Relevant
                purposes may include:
              </p>

              <div className="mt-7 space-y-3">
                {usageItems.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-xl border border-border/70 p-4 transition-colors hover:border-primary/25 hover:bg-muted/30 sm:p-5"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Security */}
            <section
              id="security"
              className="scroll-mt-28 overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/8 via-card to-card shadow-sm"
            >
              <div className="relative p-6 sm:p-9">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 size-52 rounded-full border border-primary/10"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-2 size-32 rounded-full border border-primary/10"
                />

                <SectionHeading
                  number="04"
                  eyebrow="SECURITY & RESPONSIBILITY"
                  title="Data Security"
                  icon={Lock}
                />

                <p className="relative mt-6 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  Protecting information is an important part of operating a
                  platform. Appropriate safeguards should be used to help
                  protect information against unauthorized access, alteration,
                  disclosure, or loss.
                </p>

                <div className="relative mt-6 flex gap-3 rounded-xl border border-border/80 bg-background/75 p-4 backdrop-blur">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

                  <p className="text-sm leading-6 text-muted-foreground">
                    No online platform can guarantee absolute security. Specific
                    security measures depend on the systems and services
                    actually implemented by the platform.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section
              id="contact"
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9"
            >
              <SectionHeading
                number="05"
                eyebrow="WE ARE HERE TO HELP"
                title="Contact & Questions"
                icon={Mail}
              />

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                If you have questions about this Privacy Policy or how
                information is handled on Dev Submit, please contact the
                platform team through its official support channel.
              </p>

              <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-border bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="size-5" />
                  </div>

                  <div>
                    <h3 className="font-bold">Privacy inquiries</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Contact the Dev Submit team
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Official support channel
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
            </section>

            {/* Closing note */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CheckCircle2 className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Thank you for using Dev Submit
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Please review this policy periodically.
                  </p>
                </div>
              </div>

              <a
                href="#introduction"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Back to top
                <ChevronRight className="-rotate-90 size-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  icon: Icon,
}: {
  number: string;
  eyebrow: string;
  title: string;
  icon: typeof Shield;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
        <span>{number}</span>
        <span className="h-px w-7 bg-primary/40" />
        <span>{eyebrow}</span>
      </div>

      <div className="mt-4 flex items-center gap-3 sm:gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary sm:size-12">
          <Icon className="size-5 sm:size-6" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}
