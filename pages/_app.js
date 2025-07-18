import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle.min.js")
      : null;
  }, []);
  return (
    <>
      {/* <Script
      id="Adsense-id"
      data-ad-client='ca-pub-5411529356815327'
      async
      strategy="lazyOnload"
      onError={(e) => { console.error('adsense failed to load', e) }}
      src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      crossorigin="anonymous"
    /> */}
      <meta name="google-adsense-account" content="ca-pub-5411529356815327" />
      <Script
        onError={(e) => console.log("failed to load", e)}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5411529356815327"
        crossorigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  );
}
