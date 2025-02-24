import React from "react";
import Head from "next/head";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

export default function Champions() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Head>
        <title>Live Cricket Stream - champions-trophy</title>
        <meta
          name="description"
          content="Watch live cricket champions-trophy streaming."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-primary text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Live Cricket Stream</h1>
        <p className="text-sm">Watch live cricket matches here!</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{"Today's Match"}</h2>
          <div className="d-flex justify-center">
            <blockquote className="twitter-tweet" data-media-max-width="560">
              <p lang="zxx" dir="ltr">
                <a href="https://t.co/j1tpBFkkRh">https://t.co/j1tpBFkkRh</a>
              </p>
              &mdash; Durbin Stream (@durbinstream24){" "}
              <a href="https://twitter.com/durbinstream24/status/1893938379437535629?ref_src=twsrc%5Etfw">
                February 24, 2025
              </a>
            </blockquote>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Twitter Widget Script */}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </div>
  );
}
