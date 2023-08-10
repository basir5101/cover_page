import ChatBot from '@/components/common/Chatbot';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Analytics } from '@vercel/analytics/react';


export default function App({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
  </>
}
