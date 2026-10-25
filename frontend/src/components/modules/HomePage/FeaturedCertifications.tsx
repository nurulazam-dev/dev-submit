import { ArrowRight, Award, Handshake, Medal, ShieldCheck } from "lucide-react";

const certificationsData = [
  {
    icon: Award,
    title: "ISO 9001:2015 CERTIFIED QUALITY MANAGEMENT",
    description:
      "Recognized for consistent service quality and customer satisfaction.",
  },
  {
    icon: Medal,
    title: "BANGLADESH SKILLS DEVELOPMENT AUTHORITY (BSDA) ACCREDITED",
    description: "Ensuring top-tier technical proficiency for every job.",
  },
  {
    icon: ShieldCheck,
    title: "CYBERSECURITY ESSENTIALS COMPLIANT PLATFORM",
    description:
      "Your data and payments are protected by industry-leading security.",
  },
  {
    icon: Handshake,
    title: "PROFESSIONAL LIABILITY INSURED PARTNERS",
    description:
      "Additional protection for all your home services and projects.",
  },
];

const FeaturedCertifications = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-950/20 py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Title and Value Proposition (Left) */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            BUILDING TRUST through
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              VERIFIED EXCELLENCE
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            Your peace of mind is our priority. We partner with leading
            organizations to ensure our service providers meet the highest
            standards of skill, safety, and reliability.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            {[
              { label: "Verified Pros", value: "5,000+" },
              { label: "Customer Satisfaction", value: "98%" },
              { label: "Secure Platform", value: "100%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Grid (Right) */}
        <div className="w-full md:w-3/5 lg:w-[55%] relative group">
          {/* Subtle Glow Effect behind the grid */}
          <div className="absolute -inset-2 bg-linear-to-r from-indigo-500/20 to-blue-600/10 rounded-[2.5rem] blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>

          <div className="relative bg-white/95 backdrop-blur-sm dark:bg-slate-900/90 p-6 rounded-[2.2rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certificationsData.map((cert) => {
                const Icon = cert.icon;
                return (
                  <div
                    key={cert.title}
                    className="flex flex-col gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-xl transition-all"
                  >
                    <div className="shrink-0 p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                      <Icon className="size-10 text-indigo-500" />
                    </div>
                    <div className="flex flex-col gap-1.5 overflow-hidden">
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                        {cert.title}
                      </p>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 m-0">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Primary CTA and Footer (Bottom) */}
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
        <a
          href="/certifications" // Update with correct link
          className="inline-flex items-center justify-center h-16 px-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg shadow-xl shadow-indigo-900/20 transition-all gap-3 group"
        >
          EXPLORE ALL CERTIFICATIONS
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </a>

        <p className="text-center text-xs text-slate-500 font-medium max-w-lg">
          MNA-ServiceHub is dedicated to providing Bangladesh with verified,
          trusted, and accredited home services. We are committed to excellence
          in every job.
        </p>
      </div>
    </section>
  );
};

export default FeaturedCertifications;
