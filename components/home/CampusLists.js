import { campusList } from '@/data/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImageContainer from '../library/ImageContainer'

export default function CampusLists() {
    return (
        <section className='container pt-5'>
            <div className="headline-container mb-3">
                <h1 className="headline py-1">Choose Your Cover Page Template</h1>
            </div>
            <div className="row">
                {
                    campusList.map((item, index) => (
                        <div className='col-sm-6 col-md-4 col-lg-3 mb-3' key={index}>
                            <Link href={item.url} className="m-1 shadow card nav-link  text-center">
                                <ImageContainer height={180} style={{ width: 'auto', height: '260px' }} width={180} src={item.logo} alt={item.name_details} />
                                <div className="bg-light p-3">
                                    <h5 className='mt-4 text-primary'> {item.type} Cover Page </h5>
                                    <h4> {item.campus_name} </h4>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
