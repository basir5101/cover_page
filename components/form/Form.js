import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form"
import Image from 'next/image';
import SEO from '@/components/SEO/SEO';
import Layout from '@/components/layout/CommonLayout';
import RUPDF from '@/components/pdf/RUPDF';
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
    ssr: false, // Disable server-side rendering for PDFViewer
});
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), {
    ssr: false, // Disable server-side rendering for PDFViewer
});

export default function Form({
    title = "",
    fields = [],
    PDF
}) {
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(true);
    const [assignmentData, setAssignmentData] = useState({});

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [bufferData, setBufferData] = useState("");




    const onSubmit = async (data) => {
        setLoading(true);
        setEditing(false);
        const formattedDate = new Date(data.submission_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        setLoading(false);
        setAssignmentData({ ...data, submission_date: formattedDate })
    }



    const currentYear = new Date().getFullYear();
    const years = [];
    const sessions = [];
    for (let i = 0; i < 10; i++) {
        const startYear = currentYear - i;
        const endYear = currentYear + 1 - i;
        years.push(startYear); // Push the startYear (e.g., 2014, 2015, 2016, etc.) to the years array
        sessions.push(`${startYear}-${String(endYear).slice(2)}`);
    }




    const styles = {
        pdfContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
        },
        pdfViewer: {
            width: '100%', // Set the width to 100% to fill the available space
            height: '100vh', // Set the height to full viewport height
        },
    };

    return (
        <Layout>
            <section className='container py-5'>

                <h1 className='my-4 text-primary' style={{ fontSize: 20 }}> {title} </h1>
                {
                    loading && <div className="d-flex align-items-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                    </div>
                }
                {
                    !loading && editing &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            {
                                fields.map(field => (
                                    <div className='col-md-4 mb-3' key={field}>
                                        <label htmlFor={field}>{field.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</label>
                                        {
                                            field === 'student_semester' ?
                                                <select className="form-select" {...register(field)}>
                                                    <option value="">Select Semester</option>
                                                    {
                                                        ['1st', '2nd', '3rd'].map(item => <option key={item} value={item}> {item} </option>)
                                                    }
                                                </select> :
                                                field === 'student_year' ?
                                                    <select className="form-select" {...register(field)}>
                                                        <option value="">Select Year</option>
                                                        {['1st', '2nd', '3rd', '4th'].map((year) => (
                                                            <option key={year} value={year}>
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </select> :
                                                    field === 'student_session' ?
                                                        <select className="form-select" {...register(field)}>
                                                            <option value="">Select Session</option>
                                                            {sessions.map((year) => (
                                                                <option key={year} value={year}>
                                                                    {year}
                                                                </option>
                                                            ))}
                                                        </select> :
                                                        field === 'teacher_position' ?
                                                            <select className="form-select" {...register(field)}>
                                                                <option value="">Select Teacher Position</option>
                                                                {[
                                                                    "Lecturer",
                                                                    "Assistant Professor",
                                                                    "Associate Professor",
                                                                    "Professor"
                                                                ].map((item) => (
                                                                    <option key={item} value={item}>
                                                                        {item}
                                                                    </option>
                                                                ))}
                                                            </select> :
                                                            field === 'teacher_university' ?
                                                                <input defaultValue={'Bangabandhu Sheikh Mujibur Rahman Science and Technology University Gopalganj - 8100'} placeholder={field} className='form-control' {...register(`${field}`, { required: true })} /> :
                                                                field === 'submission_date' ?
                                                                    <input type='date' className='form-control' {...register(`${field}`, { required: true })} /> :
                                                                    <input className='form-control' {...register(`${field}`, { required: true })} />

                                        }
                                        {errors[field] && <span className='text-danger'>This field is required</span>}
                                    </div>
                                ))
                            }
                        </div>
                        <input className='btn btn-success mt-3 px-5' type="submit" value={'Generate'} />
                    </form>

                }


                {
                    !editing &&
                    <>
                        <div className='text-center'>
                            <Image height={500} width={500} src={'/images/done.svg'} alt='assignment cover page generator for bsmrstu' />
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <PDFDownloadLink style={{ color: '#fff', borderRadius: '5px', backgroundColor: '#28a745', padding: '7px 25px', textDecoration: 'none', }} document={<RUPDF data={assignmentData} />} fileName={`${assignmentData?.student_id || 'cover'}.pdf`}>
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                            </PDFDownloadLink>
                            <button className='btn btn-primary ms-2 px-5' onClick={() => (setEditing(true))}>Edit Again</button>
                        </div>
                        <div style={styles.pdfContainer} className='mt-5'>
                            <PDFViewer style={styles.pdfViewer}>
                                <PDF data={assignmentData} />
                            </PDFViewer>
                        </div>
                    </>
                }
            </section>
        </Layout>
    )
}
