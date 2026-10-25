import ContactUs from "@/components/modules/HomePage/ContactUs";
import FAQAccordion from "@/components/modules/HomePage/FAQAccordion";
import Hero from "@/components/modules/HomePage/Hero";
import HowItWork from "@/components/modules/HomePage/HowItWork";
import NewsletterCTA from "@/components/modules/HomePage/NewsletterCTA";
import StatsCounter from "@/components/modules/HomePage/StatsCounter";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-(--breakpoint-xl)">
      <Hero />
      <StatsCounter />
      <HowItWork />

      <FAQAccordion />
      <NewsletterCTA />
      <ContactUs />
    </main>
  );
}
