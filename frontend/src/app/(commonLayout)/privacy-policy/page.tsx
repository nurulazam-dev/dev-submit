import {
  Shield,
  Lock,
  Eye,
  FileText,
  Mail,
  Info,
  ChevronRight,
  User,
  Briefcase,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <Info className="size-4" />,
    },
    {
      id: "data-collection",
      title: "Data We Collect",
      icon: <FileText className="size-4" />,
    },
    { id: "usage", title: "How We Use Data", icon: <Eye className="size-4" /> },
    {
      id: "security",
      title: "Data Security",
      icon: <Lock className="size-4" />,
    },
    { id: "contact", title: "Contact Us", icon: <Mail className="size-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-300 pb-20">
      {/* Header Section */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16 text-center relative overflow-hidden">
        {/* Decorative Background Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 dark:bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-3xl text-primary animate-bounce shadow-inner">
              <Shield className="size-12 md:size-16" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight dark:text-white transition-all">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            At MNA-ServiceHub, your privacy is our priority. Learn how we handle
            your data with total transparency and bank-grade security.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-primary bg-primary/5 dark:bg-primary/10 w-fit mx-auto px-5 py-2 rounded-full border border-primary/20">
            Last Updated: April 12, 2026
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky Navigation - Desktop */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24 space-y-1 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-4">
                Contents
              </p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between group px-3 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="group-hover:scale-110 transition-transform text-slate-400 group-hover:text-primary">
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
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
              <article className="prose prose-slate dark:prose-invert max-w-none space-y-12">
                {/* 01. Introduction */}
                <section id="introduction" className="scroll-mt-28 group">
                  <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-white group-hover:text-primary transition-colors">
                    <span className="text-primary/40 font-mono text-xl">
                      01.
                    </span>{" "}
                    Introduction
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                    Welcome to <strong>MNA-ServiceHub</strong>. We value the
                    trust you place in us when sharing your personal
                    information. This Privacy Policy explains what data we
                    collect, how we use it, and the steps we take to ensure it
                    remains protected.
                  </p>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                {/* 02. Data We Collect */}
                <section id="data-collection" className="scroll-mt-28 group">
                  <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-white group-hover:text-primary transition-colors">
                    <span className="text-primary/40 font-mono text-xl">
                      02.
                    </span>{" "}
                    Data We Collect
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    To provide a seamless service marketplace experience, we
                    collect specific types of information:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border-t-4 border-primary shadow-sm hover:scale-[1.02] transition-transform">
                      <User className="text-primary mb-3 size-6" />
                      <h4 className="font-bold mb-2">Personal Identity</h4>
                      <p className="text-sm m-0 opacity-80">
                        Name, email address, and phone number used for secure
                        account management.
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border-t-4 border-primary shadow-sm hover:scale-[1.02] transition-transform">
                      <Briefcase className="text-primary mb-3 size-6" />
                      <h4 className="font-bold mb-2">Service Data</h4>
                      <p className="text-sm m-0 opacity-80">
                        Service listings, portfolio details for providers, and
                        history for tracking.
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                {/* 03. How We Use Your Data */}
                <section id="usage" className="scroll-mt-28 group">
                  <h2 className="text-3xl font-bold dark:text-white group-hover:text-primary transition-colors">
                    03. Usage Policy
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 list-none p-0">
                    {[
                      "Facilitate bookings between users.",
                      "Secure payment gateway integration.",
                      "Real-time security alerts via email/OTP.",
                      "Algorithm optimization for user feedback.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg"
                      >
                        <div className="size-2 rounded-full bg-primary" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 04. Data Security */}
                <section id="security" className="scroll-mt-28 mt-12">
                  <div className="bg-blue-50 dark:bg-primary/5 border border-blue-100 dark:border-primary/20 p-8 rounded-3xl relative overflow-hidden group">
                    <Lock className="absolute -right-4 -bottom-4 size-32 opacity-5 text-primary group-hover:rotate-12 transition-transform duration-700" />
                    <h2 className="text-2xl font-bold flex items-center gap-3 dark:text-white m-0 mb-4">
                      <Lock className="text-primary size-6" /> 4. Data Security
                    </h2>
                    <p className="m-0 text-slate-700 dark:text-slate-300 font-medium relative z-10">
                      We use industry-standard encryption (AES-256) and secure
                      authentication (JWT) to protect your data. Your sensitive
                      information is salted and hashed, never stored in plain
                      text.
                    </p>
                  </div>
                </section>

                {/* 05. Contact Us */}
                <section id="contact" className="scroll-mt-28 pt-8">
                  <h2 className="text-3xl font-bold dark:text-white">
                    05. Contact Us
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    If you have any questions regarding this policy, feel free
                    to reach out to our privacy team:
                  </p>
                  <div className="mt-8">
                    <a
                      href="mailto:support@mna-servicehub.com"
                      className="group inline-flex items-center gap-4 p-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-1"
                    >
                      <div className="bg-primary/20 p-3 rounded-xl group-hover:bg-primary transition-colors">
                        <Mail className="size-6 text-primary group-hover:text-white" />
                      </div>
                      <div className="text-left">
                        <span className="block text-xs opacity-50 uppercase tracking-tighter">
                          Official Email
                        </span>
                        <span className="text-lg">
                          support@mna-servicehub.com
                        </span>
                      </div>
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
