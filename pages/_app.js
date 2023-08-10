import ChatBot from '@/components/common/Chatbot';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Analytics } from '@vercel/analytics/react';


export default function App({ Component, pageProps }) {
  return <>
    <Navbar />
    <Component {...pageProps} />
    <Analytics />
    <ChatBot />
    <Footer />
  </>
}
