import ChatBot from '@/components/common/Chatbot';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return <>
    <Script
      id="Adsense-id"
      data-ad-client='ca-pub-5411529356815327'
      async
      strategy="lazyOnload"
      onError={(e) => { console.error('adsense failed to load', e) }}
      src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      crossorigin="anonymous"
    />
    <Component {...pageProps} />
  </>
}
