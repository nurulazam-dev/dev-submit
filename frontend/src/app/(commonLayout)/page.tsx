import AboutOurCompany from "@/components/modules/AboutUs/AboutOurCompany";
import AboutOurGoal from "@/components/modules/AboutUs/AboutOurGoal";
import AboutUsDetailedInfo from "@/components/modules/AboutUs/AboutUsDetailedInfo";
import ValueProposition from "@/components/modules/AboutUs/ValueProposition";
import ClientTestimonials from "@/components/modules/HomePage/ClientTestimonials";
import ContactUs from "@/components/modules/HomePage/ContactUs";
import FAQAccordion from "@/components/modules/HomePage/FAQAccordion";
import FeaturedCertifications from "@/components/modules/HomePage/FeaturedCertifications";
import GoogleMapLocation from "@/components/modules/HomePage/GoogleMapLocation";
import Hero from "@/components/modules/HomePage/Hero";
import HowItWork from "@/components/modules/HomePage/HowItWork";
import MobileAppPromo from "@/components/modules/HomePage/MobileAppPromo";
import NewsletterCTA from "@/components/modules/HomePage/NewsletterCTA";
import SpecialOffersBanner from "@/components/modules/HomePage/SpecialOffersBanner";
import StatsCounter from "@/components/modules/HomePage/StatsCounter";
import TrustSignals from "@/components/modules/HomePage/TrustSignals";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-(--breakpoint-xl)">
      <Hero />
      <StatsCounter />
      <AboutUsDetailedInfo />
      <ValueProposition />
      {/* <ServiceCategoriesGrid /> */}
      <HowItWork />
      <TrustSignals />
      <AboutOurGoal />
      <AboutOurCompany />
      {/* <TopRatedProviders /> */}
      <ClientTestimonials />
      <SpecialOffersBanner />

      <MobileAppPromo />
      <FAQAccordion />
      <GoogleMapLocation />
      <FeaturedCertifications />
      <NewsletterCTA />
      <ContactUs />
    </main>
  );
}
