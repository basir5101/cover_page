import Image from 'next/image'
import React from 'react'

export default function Benefit() {
    return (
        <section className='bg-light  my-3'>
            <div className='container py-4'>
                <div className="row m-auto">
                    <div className='col-md-6 d-flex flex-column justify-content-center'>
                        <h1 className='headline mb-3'>Benefit of Using Our Create Cover Pages</h1>
                        <h2>Cover Page</h2>
                        <ul>
                            <li>
                                <p>Enjoy the flexibility of selecting from a variety of appealing template designs.</p>
                            </li>
                            <li>
                                <p>Customize any chosen template with your {`university's`} name and logo.</p>
                            </li>
                            <li>
                                <p>Simply complete the required forms once, with future changes limited to your course name and code.</p>
                            </li>
                        </ul>

                        <h2>Responsive Design</h2>
                        <li className='ms-3 mb-4'>Our platform is optimized for use on various devices, including mobile phones, tablets, and laptops.</li>

                        <h2>Efficient and Ad-Free</h2>
                        <li className='ms-3'>Experience a fast, ad-free, and visually appealing design.</li>
                    </div>
                    <div className="col-md-6">
                        <Image height={600} width={600} alt='benefits of coverpagemaker.com' src={'/images/benefit.svg'} />
                    </div>
                </div>

            </div>
        </section>
    )
}
