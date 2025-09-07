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
      {/* <!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/68bdbd3ddb5a38192515d772/1j4iimeiu';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script--> */}
      <Script id="tawkto-script" strategy="afterInteractive">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/68bdbd3ddb5a38192515d772/1j4iimeiu';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();`}
      </Script>
    </>
  );
}
