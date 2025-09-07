import { Analytics } from "@vercel/analytics/react";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
        <Analytics />
      </main>
      {/* <ChatBot /> */}
      <Footer />
    </>
  );
}
