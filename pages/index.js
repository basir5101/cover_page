import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import CampusLists from '@/components/home/CampusLists';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO/SEO';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <SEO />
      <main>
        <CampusLists />
      </main>
    </>
  )
}
