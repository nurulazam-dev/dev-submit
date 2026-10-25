import {
  RefreshCcw,
  XCircle,
  Clock,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function RefundCancellationPolicyPage() {
  const sections = [
    {
      id: "cancellation",
      title: "Cancellation Policy",
      icon: <XCircle className="size-4" />,
    },
    {
      id: "refund-eligibility",
      title: "Refund Eligibility",
      icon: <ShieldCheck className="size-4" />,
    },
    {
      id: "refund-process",
      title: "Refund Process",
      icon: <RefreshCcw className="size-4" />,
    },
    {
      id: "non-refundable",
      title: "Non-refundable Items",
      icon: <AlertCircle className="size-4" />,
    },
    {
      id: "contact-support",
      title: "Support & Disputes",
      icon: <HelpCircle className="size-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-300 pb-20">
      {/* Header Section */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 dark:bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-3xl text-primary animate-pulse">
              <RefreshCcw className="size-12 md:size-16" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight dark:text-white transition-all">
            Refund & Cancellation
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We understand that plans change. Our policy ensures a fair process
            for both our customers and service professionals.
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
                Policy Sections
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

          {/* Policy Content */}
          <main className="lg:w-3/4 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm">
              <article className="prose prose-slate dark:prose-invert max-w-none space-y-12">
                {/* 01. Cancellation Policy */}
                <section id="cancellation" className="scroll-mt-28 group">
                  <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-white group-hover:text-primary transition-colors">
                    <span className="text-primary/40 font-mono text-xl">
                      01.
                    </span>{" "}
                    Cancellation Policy
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-green-500">
                      <h4 className="font-bold mb-2">Before 24 Hours</h4>
                      <p className="text-sm m-0 opacity-80">
                        Cancellations made more than 24 hours before the service
                        time are eligible for a full refund.
                      </p>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-orange-500">
                      <h4 className="font-bold mb-2">Within 24 Hours</h4>
                      <p className="text-sm m-0 opacity-80">
                        A 20% cancellation fee may apply for bookings cancelled
                        within 24 hours of the scheduled time.
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                {/* 02. Refund Eligibility */}
                <section id="refund-eligibility" className="scroll-mt-28 group">
                  <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-white group-hover:text-primary transition-colors">
                    <span className="text-primary/40 font-mono text-xl">
                      02.
                    </span>{" "}
                    Refund Eligibility
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    You are eligible for a refund under the following
                    conditions:
                  </p>
                  <ul className="space-y-4 mt-6 list-none p-0">
                    {[
                      "The service provider fails to show up at the scheduled time.",
                      "The service delivered is significantly different from what was described.",
                      "Technical issues on MNA-ServiceHub prevented the service delivery.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl"
                      >
                        <ShieldCheck className="text-primary size-5 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                {/* 03. Refund Process */}
                <section id="refund-process" className="scroll-mt-28 group">
                  <h2 className="text-3xl font-bold dark:text-white group-hover:text-primary transition-colors">
                    <span className="text-primary/40 font-mono text-xl">
                      03.
                    </span>{" "}
                    Refund Process
                  </h2>
                  <div className="space-y-6 mt-8">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold m-0">Request Submission</h4>
                        <p className="text-sm opacity-70">
                          Submit a refund request via your dashboard within 48
                          hours of the service time.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold m-0">Review Period</h4>
                        <p className="text-sm opacity-70">
                          Our team will review the request and consult with the
                          provider (usually takes 2-3 business days).
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold m-0">Credit Issuance</h4>
                        <p className="text-sm opacity-70">
                          Once approved, the refund will be credited back to
                          your original payment method within 5-7 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 04. Non-refundable */}
                <section id="non-refundable" className="scroll-mt-28 mt-12">
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 p-8 rounded-3xl">
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-amber-900 dark:text-amber-400 m-0 mb-4">
                      <AlertCircle className="size-6" /> 4. Non-refundable Items
                    </h2>
                    <ul className="text-amber-800/80 dark:text-amber-300/80 m-0 text-sm space-y-2">
                      <li>
                        • Platform service fees once the booking is confirmed.
                      </li>
                      <li>
                        • Services already completed and signed off by the
                        customer.
                      </li>
                      <li>
                        • Last-minute cancellations (less than 2 hours before
                        the service).
                      </li>
                    </ul>
                  </div>
                </section>

                {/* 05. Support */}
                <section id="contact-support" className="scroll-mt-28 pt-8">
                  <h2 className="text-3xl font-bold dark:text-white">
                    05. Support & Disputes
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    If you have an issue with a specific refund or wish to
                    dispute a provider&apos;s claim, please reach out to our
                    dedicated support team.
                  </p>
                  <div className="mt-8 p-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold m-0">
                        Need help with a refund?
                      </h3>
                      <p className="text-sm opacity-70 m-0 mt-1">
                        Available 24/7 for your assistance.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="mailto:support@mna-servicehub.com"
                        className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                      >
                        Email Support
                      </a>
                    </div>
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
