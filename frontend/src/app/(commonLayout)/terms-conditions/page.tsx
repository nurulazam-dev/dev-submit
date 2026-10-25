import {
  FileText,
  Scale,
  UserCheck,
  AlertTriangle,
  CreditCard,
  Gavel,
  ChevronRight,
  Clock,
  ShieldCheck,
  Users,
  Code2,
  CheckCircle2,
  Ban,
  ArrowUpRight,
  Handshake,
  Info,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: UserCheck,
    number: "01",
  },
  {
    id: "user-accounts",
    title: "User Accounts",
    icon: Users,
    number: "02",
  },
  {
    id: "services-payments",
    title: "Platform & Submissions",
    icon: Code2,
    number: "03",
  },
  {
    id: "prohibited",
    title: "Prohibited Conduct",
    icon: Ban,
    number: "04",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: Scale,
    number: "05",
  },
  {
    id: "governing-law",
    title: "Governing Law",
    icon: Gavel,
    number: "06",
  },
];

const accountResponsibilities = [
  "Provide accurate and up-to-date registration information.",
  "Keep your password and account credentials confidential.",
  "Take responsibility for activities performed through your account.",
  "Notify the platform team if you suspect unauthorized account access.",
];

const platformFeatures = [
  {
    icon: Code2,
    title: "Project submissions",
    description:
      "Submit projects with relevant descriptions and repository or live-project links where supported.",
  },
  {
    icon: FileText,
    title: "Reviews and feedback",
    description:
      "Use the platform's review features to provide or receive relevant project feedback.",
  },
  {
    icon: Users,
    title: "Account responsibilities",
    description:
      "Use your account according to its assigned role and the features available to you.",
  },
  {
    icon: ShieldCheck,
    title: "Platform integrity",
    description:
      "Respect platform rules and avoid actions that compromise the security or reliability of the service.",
  },
];

const prohibitedItems = [
  {
    title: "Misrepresentation",
    description:
      "Submitting false information, impersonating another person, or misrepresenting project ownership.",
  },
  {
    title: "Unauthorized access",
    description:
      "Attempting to access accounts, data, or platform functionality without authorization.",
  },
  {
    title: "Abusive behavior",
    description:
      "Harassing users, threatening others, or submitting abusive or deliberately harmful content.",
  },
  {
    title: "Platform abuse",
    description:
      "Interfering with platform operations, exploiting vulnerabilities, or using features for unlawful purposes.",
  },
  {
    title: "Intellectual property violations",
    description:
      "Submitting or distributing content that infringes another party's rights.",
  },
  {
    title: "Fraudulent activity",
    description:
      "Using the platform to deceive other users or engage in fraudulent activities.",
  },
];

export default function TermsConditionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-140 overflow-hidden"
      >
        <div className="absolute left-1/2 -top-70 size-162.5 -translate-x-1/2 rounded-full bg-primary/9 blur-[120px]" />
        <div className="absolute -right-35 top-45 size-75 rounded-full bg-blue-500/[0.07] blur-[100px]" />
        <div className="absolute -left-40 top-75 size-75 rounded-full bg-cyan-500/[6 blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="relative border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-medium text-primary shadow-sm">
              <Scale className="size-4" />
              Clear rules. Fair participation.
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Terms &{" "}
              <span className="bg-linear-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Conditions.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              These terms explain the responsibilities and expectations
              associated with using Dev Submit. Please review them carefully
              before using the platform.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-4 py-3 text-sm shadow-sm backdrop-blur">
                <FileText className="size-4 text-primary" />
                Terms of service
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-4 py-3 text-sm text-muted-foreground shadow-sm backdrop-blur">
                <Clock className="size-4 text-primary" />
                Please review before use
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                icon: Handshake,
                title: "Fair participation",
                description: "Respect other users and their work",
              },
              {
                icon: ShieldCheck,
                title: "Account responsibility",
                description: "Keep your account secure",
              },
              {
                icon: Scale,
                title: "Clear expectations",
                description: "Understand platform rules",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 p-4 backdrop-blur transition-colors hover:border-primary/30"
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
          {/* Contents navigation */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Legal information
                  </p>
                  <h2 className="mt-1 text-lg font-bold">Contents</h2>
                </div>

                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-4" />
                </div>
              </div>

              <nav
                aria-label="Terms and conditions contents"
                className="space-y-1"
              >
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
                <Info className="size-5 text-primary" />

                <p className="mt-3 text-sm font-semibold">
                  Use the platform responsibly
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Respect account security, project ownership, and the rights of
                  other users.
                </p>
              </div>
            </div>
          </aside>

          {/* Terms content */}
          <article className="min-w-0 space-y-6">
            {/* 01 Acceptance */}
            <section
              id="acceptance"
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9"
            >
              <SectionHeading
                number="01"
                eyebrow="PLEASE READ CAREFULLY"
                title="Acceptance of Terms"
                icon={UserCheck}
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <p>
                  Welcome to{" "}
                  <strong className="text-foreground">Dev Submit</strong>. These
                  Terms and Conditions describe the general rules and
                  responsibilities associated with using the platform.
                </p>

                <p>
                  By accessing or using Dev Submit, you acknowledge that you
                  have read and understood these terms. If you do not agree with
                  the applicable terms, you should discontinue using the
                  platform.
                </p>

                <p>
                  These terms should be read together with the platform&apos;s
                  Privacy Policy and any additional conditions presented for
                  specific features.
                </p>
              </div>
            </section>

            {/* 02 User accounts */}
            <section
              id="user-accounts"
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9"
            >
              <SectionHeading
                number="02"
                eyebrow="ACCOUNT & RESPONSIBILITY"
                title="User Accounts"
                icon={Users}
              />

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Some platform features require a registered account. When
                creating and using an account, you are expected to:
              </p>

              <div className="mt-6 space-y-3">
                {accountResponsibilities.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/30 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />

                    <span className="text-sm leading-6 text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/6 p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />

                  <p className="text-sm leading-6 text-muted-foreground">
                    Do not share your password or attempt to use another
                    person&apos;s account without authorization.
                  </p>
                </div>
              </div>
            </section>

            {/* 03 Platform and submissions */}
            <section
              id="services-payments"
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9"
            >
              <SectionHeading
                number="03"
                eyebrow="PLATFORM USE"
                title="Platform & Submissions"
                icon={Code2}
              />

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Dev Submit supports project submissions and related platform
                features. Users should use these features appropriately and
                provide information they are authorized to share.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {platformFeatures.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group rounded-2xl border border-border/80 bg-muted/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/[0.035] hover:shadow-md"
                    >
                      <div className="flex size-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" />
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

              <div className="mt-6 rounded-xl border border-border bg-background p-5">
                <div className="flex gap-3">
                  <CreditCard className="mt-0.5 size-5 shrink-0 text-primary" />

                  <div>
                    <h3 className="font-semibold">Payments and fees</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Any payment, fee, refund, or paid feature must be governed
                      by the pricing and payment terms actually displayed by the
                      platform. Do not assume a payment or refund arrangement
                      unless it has been explicitly communicated.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 04 Prohibited conduct */}
            <section
              id="prohibited"
              className="scroll-mt-28 overflow-hidden rounded-2xl border border-red-500/20 bg-linear-to-br from-red-500/6 via-card to-card shadow-sm"
            >
              <div className="p-6 sm:p-9">
                <SectionHeading
                  number="04"
                  eyebrow="COMMUNITY STANDARDS"
                  title="Prohibited Conduct"
                  icon={Ban}
                />

                <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                  Users must not engage in conduct that violates others&apos;
                  rights, compromises platform integrity, or interferes with
                  legitimate use of the service.
                </p>

                <div className="mt-7 space-y-3">
                  {prohibitedItems.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/70 p-4"
                    >
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                        <AlertTriangle className="size-4" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold">{item.title}</h3>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  Where appropriate and permitted by applicable rules, the
                  platform may investigate reported violations and take
                  proportionate action under its established policies.
                </p>
              </div>
            </section>

            {/* 05 Liability */}
            <section
              id="liability"
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9"
            >
              <SectionHeading
                number="05"
                eyebrow="RESPONSIBILITIES & LIMITS"
                title="Limitation of Liability"
                icon={Scale}
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <p>
                  Dev Submit is provided subject to the features and terms made
                  available by the platform. Users are responsible for the
                  content and project information they submit and for ensuring
                  that they have the necessary rights to share it.
                </p>

                <p>
                  To the extent permitted by applicable law, limitations of
                  liability may apply to losses arising from platform
                  interruptions, user-submitted content, unauthorized account
                  access, or interactions between users.
                </p>

                <p>
                  Nothing in these terms excludes or limits liability where such
                  exclusion or limitation is prohibited by applicable law.
                </p>
              </div>
            </section>

            {/* 06 Governing law */}
            <section
              id="governing-law"
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-9"
            >
              <SectionHeading
                number="06"
                eyebrow="LEGAL FRAMEWORK"
                title="Governing Law"
                icon={Gavel}
              />

              <p className="mt-6 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                The governing law and jurisdiction applicable to Dev Submit
                should be specified by the platform owner in accordance with the
                business&apos;s legal requirements and applicable law. Any
                dispute should be handled through the legally applicable
                process.
              </p>

              <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-5">
                <div className="flex gap-3">
                  <Info className="mt-0.5 size-5 shrink-0 text-primary" />

                  <p className="text-sm leading-6 text-muted-foreground">
                    The applicable jurisdiction and dispute-resolution
                    provisions should be confirmed before this page is published
                    as a final legal document.
                  </p>
                </div>
              </div>
            </section>

            {/* Closing card */}
            <section className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/8 via-card to-card p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
                    <Handshake className="size-6" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">
                      Questions about these terms?
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                      Contact the Dev Submit team through the official support
                      channel listed on the platform.
                    </p>
                  </div>
                </div>

                <a
                  href="#acceptance"
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Review terms
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </section>

            {/* Back to top */}
            <div className="flex justify-end border-t border-border/70 pt-5">
              <a
                href="#acceptance"
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
  icon: typeof Scale;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
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
