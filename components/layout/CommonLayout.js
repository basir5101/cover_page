import React from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import { Analytics } from '@vercel/analytics/react'
import ChatBot from '../common/Chatbot'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
                <Analytics />
            </main>
            <ChatBot />
            <Footer />
        </>
    )
}
