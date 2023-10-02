import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import ImageContainer from '../library/ImageContainer'
import Link from 'next/link'

export default function Invoice() {
    return (
        <section className="hero-section-2 py-5 mt-4">
            <div className="container">
                <div className="row">
                    <motion.div initial={{ y: -300, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }} className="col-10 m-auto d-flex align-items-center justify-content-center">
                        <div className='text-center'>
                            <h1 className="display-2 fw-bold text-primary">Free Invoice Generator </h1>
                            <p className='h4 mt-4 mb-3'>Create professional Invoice for your assignments and lab reports.</p>
                            <Link href={'/invoice/generate'} className='btn btn-success px-5 my-3'> Generate Invoice Now</Link>
                            {/* <a href="#" className="btn btn-primary">Get Started</a> */}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    )
}
