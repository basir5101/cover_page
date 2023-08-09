import { campusList } from '@/data/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CampusLists() {
    return (
        <section className='container pt-5'>
            <h1 className='mb-4 ms-1'>List of available cover pages</h1>
            <div className="row">
                {
                    campusList.map((item, index) => (
                        <div className='col-sm-6 col-md-4 col-lg-4' key={index}>
                            <Link href={item.url} className="m-1 card nav-link p-3 text-center">
                                <Image height={180} style={{ width: '100%', height: 'auto' }} width={180} src={item.logo} alt={item.name_details} />
                                <h5 className='mt-4 text-primary'> {item.type} Cover Page </h5>
                                <h4> {item.campus_name} </h4>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
