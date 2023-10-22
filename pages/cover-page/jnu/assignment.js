import React, { useEffect, useState } from 'react'
import Assignment from '@/components/pdf/Assignment';
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form"
import Image from 'next/image';
import SEO from '@/components/SEO/SEO';
import Layout from '@/components/layout/CommonLayout';
import PDFJNU from '@/components/pdf/JNUPDF';
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
    ssr: false, // Disable server-side rendering for PDFViewer
});
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), {
    ssr: false, // Disable server-side rendering for PDFViewer
});

export default function Assignment1() {
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(true);
    const [assignmentData, setAssignmentData] = useState({});
    const [client, setClient] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ ...assignmentData })
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
        setAssignmentData({ ...data, submission_date: formattedDate });
        localStorage.setItem('assignment_data', JSON.stringify({ ...data, submission_date: formattedDate }))

    }

    useEffect(() => {
        try {
            const assignment_data = localStorage.getItem('assignment_data')
            setAssignmentData(JSON.parse(assignment_data) || {});
            setClient(true);
        } catch (error) {
            setClient(true)

        }
    }, [])


    const currentYear = new Date().getFullYear();
    const years = [];
    const sessions = [];
    for (let i = 0; i < 10; i++) {
        const startYear = currentYear - i;
        const endYear = currentYear + 1 - i;
        years.push(startYear); // Push the startYear (e.g., 2014, 2015, 2016, etc.) to the years array
        sessions.push(`${startYear}-${String(endYear).slice(2)}`);
    }


    const fields = [
        'course_title',
        'course_code',
        'assignment_title',
        'student_name',
        'student_id',
        'student_batch',
        'student_department',
        'teacher_name',
        'teacher_position',
        'teacher_department',
        'teacher_university',
        'submission_date'
    ];

    const styles = {
        pdfContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
        },
        pdfViewer: {
            width: '90%',
            height: '90%',
        },
    };
    return (
        <Layout>
            <section className='container py-5'>
                <SEO
                    title="Assignment Cover Page maker for JNU - Jagannath University</h1>"
                    description="Generate Assignment Cover Page for Jagannath University (JNU). Create a new assignment cover page for Jagannath University and configure the new assignment cover page for JNU"
                />
                <h1 className='my-4 text-primary' style={{ fontSize: 20 }}>Assignment Cover Page - Jagannath University, Dhaka</h1>
                <div className='mb-3 border border-danger px-2 border-round text-center d-inline-block'>
                    <span className="fw-bold">Note: </span> Please use chrome browser for best experience.
                </div>
                {
                    loading && <div className="d-flex align-items-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                    </div>
                }
                {
                    !loading && editing && client &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            {
                                fields.map(field => (
                                    <div className='col-md-4 mb-3' key={field}>
                                        <label htmlFor={field}>{field.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</label>
                                        {
                                            field === 'student_semester' ?
                                                <select defaultValue={assignmentData[field]} className="form-select" {...register(field)}>
                                                    <option value="">Select Semester</option>
                                                    {
                                                        ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map(item => <option key={item} value={item}> {item} </option>)
                                                    }
                                                </select> :
                                                field === 'student_year' ?
                                                    <select defaultValue={assignmentData[field]} className="form-select" {...register(field)}>
                                                        <option value="">Select Year</option>
                                                        {['1st', '2nd', '3rd', '4th'].map((year) => (
                                                            <option key={year} value={year}>
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </select> :
                                                    field === 'student_session' ?
                                                        <select defaultValue={assignmentData[field]} className="form-select" {...register(field)}>
                                                            <option value="">Select Session</option>
                                                            {sessions.map((year) => (
                                                                <option key={year} value={year}>
                                                                    {year}
                                                                </option>
                                                            ))}
                                                        </select> :
                                                        field === 'teacher_position' ?
                                                            <select className="form-select" defaultValue={assignmentData[field]} {...register(field)}>
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
                                                                <input defaultValue={'Jagannath University, Dhaka'} placeholder={field} className='form-control' {...register(`${field}`, { required: true })} /> :
                                                                field === 'submission_date' ?
                                                                    <input type='date' className='form-control' {...register(`${field}`, { required: true })} /> :
                                                                    <input defaultValue={assignmentData[field]} className='form-control' {...register(`${field}`, { required: true })} />

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
                            <PDFDownloadLink style={{ color: '#fff', borderRadius: '5px', backgroundColor: '#28a745', padding: '7px 25px', textDecoration: 'none', }} document={<PDFJNU data={assignmentData} />} fileName={`${assignmentData?.student_id || 'cover'}.pdf`}>
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                            </PDFDownloadLink>
                            <button className='btn btn-primary ms-2 px-5' onClick={() => (setEditing(true))}>Edit Again</button>
                        </div>
                        {/* <div style={styles.pdfContainer}>
                            <PDFViewer style={styles.pdfViewer}>
                                <PDFJNU data={assignmentData} />
                            </PDFViewer>
                        </div> */}
                    </>
                }
            </section>
        </Layout>
    )
}
