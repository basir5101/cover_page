import React from 'react'
import { AtSign, Facebook, GitHub, Linkedin, PhoneCall, ShoppingCart } from 'react-feather'
import { motion } from 'framer-motion'
import Link from 'next/link'
export default function Footer() {
    const contactDetails = [
        {
            title: 'LinkedIn',
            link: "https://www.linkedin.com/in/abdul-basir-b087971b1/",
            component: <Linkedin />,
        },
        {
            title: 'Github',
            link: "https://github.com/basir5101",
            component: <GitHub />,
        },
        {
            title: 'Email',
            link: "basir.bsmrstu@gmail.com",
            component: <AtSign />,
        },
        {
            title: 'Facebook',
            link: "https://www.facebook.com/basir5101",
            component: <Facebook />
        },
        {
            title: 'Phone',
            link: "https://wa.me/01774066225",
            component: <PhoneCall />
        },
        {
            title: 'Fiverr',
            link: "https://www.fiverr.com/s/761Z54",
            component: <ShoppingCart />
        },

    ]
    return (
        <footer className='bg-dark text-white py-5 mt-5'>
            <div className=' text-white text-center'>
                <h3 className='mb-3'>touch with me</h3>
                <motion.div initial={{ scale: 0.25 }} whileInView={{ scale: 1 }} className='p-12'>
                    <ul className='d-flex align-items-center justify-content-center'>
                        {
                            contactDetails.map((detail, index) => (
                                <li className='d-flex mb-3 mx-2' key={index}>
                                    <Link className='border p-3 text-white rounded-circle' target={"_blank"} href={detail.title === 'Email' ? `mailto:${detail.link}` : detail.link}>
                                        {detail.component}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </motion.div>
                <div> ©{`${new Date().getFullYear()}`} coverpagemaker.com. All rights reserved. </div>
            </div>
        </footer>
    )
}
