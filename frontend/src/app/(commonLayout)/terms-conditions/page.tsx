import {
  FileText,
  Scale,
  UserCheck,
  AlertTriangle,
  CreditCard,
  Gavel,
  ChevronRight,
  Clock,
} from "lucide-react";

export default function TermsConditionsPage() {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <UserCheck className="size-4" />,
    },
    {
      id: "user-accounts",
      title: "User Accounts",
      icon: <FileText className="size-4" />,
    },
    {
      id: "services-payments",
      title: "Services & Payments",
      icon: <CreditCard className="size-4" />,
    },
    {
      id: "prohibited",
      title: "Prohibited Conduct",
      icon: <AlertTriangle className="size-4" />,
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <Scale className="size-4" />,
    },
    {
      id: "governing-law",
      title: "Governing Law",
      icon: <Gavel className="size-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-300 pb-20">
      {/* Header Section */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 dark:bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-3xl text-primary animate-pulse shadow-inner">
              <Scale className="size-12 md:size-16" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight dark:text-white transition-all">
            Terms & Conditions
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using MNA-ServiceHub. By
            using our platform, you agree to these legally binding rules.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-primary bg-primary/5 dark:bg-primary/10 w-fit mx-auto px-5 py-2 rounded-full border border-primary/20">
            <Clock className="size-4" /> Last Updated: April 12, 2026
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky Navigation - Desktop */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24 space-y-1 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-4">
                Legal Sections
              </p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between group px-3 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 group-hover:text-primary transition-colors">
                      {section.icon}
                    </span>
                    {section.title}
                  </div>
                  <ChevronRight className="size-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </aside>

          {/* Terms Content */}
          <main className="lg:w-3/4 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm transition-all overflow-hidden">
              <article className="prose prose-slate dark:prose-invert max-w-none space-y-12">
                {/* Section 01 */}
                <section id="acceptance" className="scroll-mt-28 group">
                  <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-white group-hover:text-primary transition-colors">
                    <span className="text-primary/40 font-mono text-xl">
                      01.
                    </span>{" "}
                    Acceptance of Terms
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                    By accessing or using <strong>MNA-ServiceHub</strong>, you
                    agree to be bound by these Terms and Conditions and our
                    Privacy Policy. If you do not agree with any part of these
                    terms, you must not use our services.
                  </p>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                {/* Section 02 */}
                <section id="user-accounts" className="scroll-mt-28 group">
                  <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-white group-hover:text-primary transition-colors">
                    <span className="text-primary/40 font-mono text-xl">
                      02.
                    </span>{" "}
                    User Accounts
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    To access certain features, you must register for an
                    account. You are responsible for:
                  </p>
                  <ul className="space-y-3 mt-4 list-none p-0">
                    {[
                      "Maintaining the confidentiality of your account password.",
                      "Providing accurate and current information during registration.",
                      "All activities that occur under your account.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
                      >
                        <div className="mt-1.5 size-2 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                {/* Section 03 */}
                <section id="services-payments" className="scroll-mt-28 group">
                  <h2 className="text-3xl font-bold dark:text-white group-hover:text-primary transition-colors">
                    <span className="text-primary/40 font-mono text-xl">
                      03.
                    </span>{" "}
                    Services & Payments
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                      <h4 className="font-bold mb-2">For Customers</h4>
                      <p className="text-sm m-0 opacity-80">
                        Payments are processed securely at the time of booking.
                        MNA-ServiceHub holds funds until service delivery is
                        confirmed.
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                      <h4 className="font-bold mb-2">For Providers</h4>
                      <p className="text-sm m-0 opacity-80">
                        Service providers agree to pay a platform fee per
                        successful booking as outlined in their dashboard.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 04 */}
                <section id="prohibited" className="scroll-mt-28">
                  <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-8 rounded-3xl">
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-red-900 dark:text-red-400 m-0 mb-4">
                      <AlertTriangle className="size-6" /> 4. Prohibited Conduct
                    </h2>
                    <p className="text-red-800/80 dark:text-red-300/80 m-0">
                      Users are strictly prohibited from bypassing our payment
                      system, posting fraudulent listings, or harassing other
                      community members. Violation of these rules will result in
                      immediate account termination.
                    </p>
                  </div>
                </section>

                {/* Section 05 */}
                <section id="liability" className="scroll-mt-28 group">
                  <h2 className="text-3xl font-bold dark:text-white group-hover:text-primary transition-colors">
                    05. Limitation of Liability
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    MNA-ServiceHub is a marketplace connecting users. We are not
                    liable for the quality of services provided by third-party
                    professionals or any disputes arising between users, though
                    we may assist in mediation.
                  </p>
                </section>

                {/* Section 06 */}
                <section
                  id="governing-law"
                  className="scroll-mt-28 pt-8 border-t border-slate-100 dark:border-slate-800"
                >
                  <h2 className="text-3xl font-bold dark:text-white">
                    06. Governing Law
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    These terms are governed by the laws of Bangladesh. Any
                    disputes will be settled in the courts of Dhaka.
                  </p>
                  <div className="mt-12 p-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold m-0">
                        Questions about our terms?
                      </h3>
                      <p className="text-sm opacity-70 m-0 mt-1">
                        Our legal team is ready to assist you.
                      </p>
                    </div>
                    <a
                      href="mailto:legal@mna-servicehub.com"
                      className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                    >
                      Contact Legal Team
                    </a>
                  </div>
                </section>
              </article>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
