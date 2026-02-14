import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Layout/Header";
import Footer from "@/app/components/Layout/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";
import Aoscompo from "@/utils/aos";
import VisitTracker from "@/app/components/VisitTracker";
const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get customerId from environment variable or use default
  const customerId = process.env.NEXT_PUBLIC_CUSTOMER_ID || 'string22';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}`}>
          <VisitTracker customerId={customerId} />
          <Aoscompo>
            <Header />
            {children}
            <Footer />
          </Aoscompo>
          <ScrollToTop />
      </body>
    </html>
  );
}
