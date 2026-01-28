import SEO from "@/components/SEO/SEO";
import FiverrBootstrapBanner from "@/components/common/FiverrBanner";
import Benefit from "@/components/home/Benefit";
import CampusLists from "@/components/home/CampusLists";
import Hero from "@/components/home/Hero";
import Invoice from "@/components/home/Invoice";
import Layout from "@/components/layout/CommonLayout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <SEO />
      <FiverrBootstrapBanner />
      <Hero />
      <CampusLists />
      <div className="py-5 px-5 bg-dark text-white">
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-primary">Watch This Video Tutorial</h2>
            <h4>It is only 1 minute</h4>
          </div>
          <div className="col-md-6">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/VWnWvBdj-fg"
                title="Assignment Cover Page Maker"
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Benefit />
      <Invoice />
    </Layout>
  );
}
