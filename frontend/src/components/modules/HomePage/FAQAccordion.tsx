"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqData = [
  {
    question: "How do I book a service through MNA-ServiceHub?",
    answer:
      "Booking is simple! Just search for the service you need, select a verified provider based on ratings and pricing, choose your preferred time slot, and confirm your booking. You'll receive instant notification once the provider accepts.",
  },
  {
    question: "Are the service providers background-verified?",
    answer:
      "Absolutely. Every professional on our platform undergoes a multi-step verification process, including identity checks, criminal background checks, and technical skill assessments to ensure your safety and quality of service.",
  },
  {
    question: "What happens if I'm not satisfied with the service?",
    answer:
      "Your satisfaction is our priority. If the service doesn't meet your expectations, you can report it within 24 hours. We offer a 'Service Guarantee' which includes re-work or a partial/full refund depending on the case.",
  },
  {
    question: "How does the payment system work?",
    answer:
      "We support various payment methods including credit/debit cards, mobile banking (bKash/Nagad), and cash after service. To ensure security, payments made through the platform are held in escrow until the job is marked as complete.",
  },
  {
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Yes, you can reschedule or cancel your booking through the 'My Bookings' section. Please note that cancellations made less than 2 hours before the scheduled time may incur a small convenience fee.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest">
            <HelpCircle className="size-4" /> Have Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked <span className="text-slate-400">Questions</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Everything you need to know about MNA-ServiceHub. Can&apos;t find
            what you&apos;re looking for? Feel free to contact our support.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`group border-2 transition-all duration-300 rounded-[1.5rem] overflow-hidden ${
                  isOpen
                    ? "border-indigo-500/20 bg-white dark:bg-slate-900 shadow-xl shadow-indigo-500/5"
                    : "border-slate-200 dark:border-slate-800 bg-transparent hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span
                    className={`text-lg font-bold transition-colors duration-300 ${
                      isOpen
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
                      isOpen
                        ? "bg-indigo-600 text-white rotate-180"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 rounded-[1rem] border border-indigo-200 dark:border-indigo-400 shadow flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 size-40 bg-indigo-600/20 rounded-full blur-[60px] -mr-20 -mt-20" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <MessageCircle className="size-8 text-indigo-400" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold">Still have questions?</h4>
              <p className="text-slate-400 font-medium">
                We&apos;re here to help you 24/7.
              </p>
            </div>
          </div>

          <Link
            href="contact-us"
            className="p-3 px-5 rounded-xl hover:shadow-lg shadow-indigo-400 bg-white text-slate-900 hover:bg-slate-100 font-black text-base shadow-md transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
