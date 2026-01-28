import { Analytics } from "@vercel/analytics/react";
import FiverrBootstrapBanner from "../common/FiverrBanner";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
        <Analytics />
        <FiverrBootstrapBanner />
      </main>
      {/* <ChatBot /> */}
      <Footer />
    </>
  );
}
