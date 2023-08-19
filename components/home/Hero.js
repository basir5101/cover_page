import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import ImageContainer from '../library/ImageContainer'

export default function Hero() {
    return (
        <section className="hero-section py-5">
            <div className="container">
                <div className="row">
                    <motion.div initial={{ y: -300, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }} className="col-md-7 d-flex align-items-center justify-content-center">
                        <div className=''>
                            <h1 className="display-2 fw-bold">Welcome to  <br /> <span className="text-primary">Cover Page Maker</span></h1>
                            <p className='h4 mt-4 mb-3'>Create professional cover pages for your assignments and lab reports.</p>
                            {/* <a href="#" className="btn btn-primary">Get Started</a> */}
                        </div>
                    </motion.div>
                    <div className="col-md-5">
                        <ImageContainer width={500} height={400} src="/images/hero.png" alt="Hero" className="img-fluid" />
                    </div>
                </div>
            </div>
        </section >
    )
}
