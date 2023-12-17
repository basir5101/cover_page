import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import CampusLists from '@/components/home/CampusLists';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO/SEO';
import Layout from '@/components/layout/CommonLayout';
import Hero from '@/components/home/Hero';
import Invoice from '@/components/home/Invoice';
import Benefit from '@/components/home/Benefit';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <SEO />
      <Hero />
      <CampusLists />
      <div className='my-3'>
        <div className="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/VWnWvBdj-fg" title="Assignment Cover Page Maker" allowFullScreen={true}></iframe>
        </div>
      </div>
      <Benefit />
      <Invoice />
    </Layout>
  )
}
