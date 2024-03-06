import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import ImageContainer from '../library/ImageContainer'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className="hero-section bg-dark py-5 text-white text-center">
            <div className="container">
                <div className="row">
                    <motion.div initial={{ y: -300, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }} className="col-md-7 m-auto d-flex align-items-center justify-content-center">
                        <div className=''>
                            <h1 className="display-2 fw-bold text-primary">Free Cover Page generator</h1>
                            <p className='h4 mt-4 mb-3'>Create professional cover pages for your assignments and lab reports.</p>
                            <Link href={'/invoice/cover'} className='btn btn-success px-5 my-3'> Start Making Now</Link>
                            {/* <a href="#" className="btn btn-primary">Get Started</a> */}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    )
}
