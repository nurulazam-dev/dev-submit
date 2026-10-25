import { CommonLayoutNavbar } from "@/components/shared/CommonLayoutNavbar";
import Footer from "@/components/shared/Footer";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommonLayoutNavbar />
      {children}
      <Footer />
    </>
  );
}
