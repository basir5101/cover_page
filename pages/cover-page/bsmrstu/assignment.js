import React, { useEffect, useState } from 'react'
import Assignment from '@/components/pdf/Assignment';
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form"
import Image from 'next/image';
import SEO from '@/components/SEO/SEO';
import Layout from '@/components/layout/CommonLayout';
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
    ssr: false, // Disable server-side rendering for PDFViewer
});
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), {
    ssr: false, // Disable server-side rendering for PDFViewer
});
import { motion } from 'framer-motion';

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


    useEffect(() => {
        try {
            const assignment_data = localStorage.getItem('assignment_data')
            setAssignmentData(JSON.parse(assignment_data) || {});
            setClient(true);
        } catch (error) {
            setClient(true)

        }
    }, [])

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
        localStorage.setItem('assignment_data', JSON.stringify({ ...data, submission_date: formattedDate }))
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


    const fields = [
        'assignment_topic',
        'course_title',
        'course_code',
        'student_name',
        'student_id',
        'student_year',
        'student_semester',
        'student_session',
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
                    title="Generate Assignment Cover Page for BSMRSTU</h1>"
                    description="Generate Assignment Cover Page for BSMRSTU. Create a new assignment cover page for BSMRSTU and configure the new assignment cover page for BSMRSTU"
                />
                <h1 className='my-4 text-primary' style={{ fontSize: '2.3 rem' }}>Generate Assignment Cover Page for BSMRSTU</h1>
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
                                        <motion.label initial={{ x: 150, opacity: 0.1 }} whileInView={{ x: 0, opacity: 1 }} htmlFor={field}>{field.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</motion.label>
                                        {
                                            field === 'student_semester' ?
                                                <motion.select initial={{ x: 150, opacity: 0.1 }} whileInView={{ x: 0, opacity: 1 }} defaultValue={assignmentData[field]} className="form-select" {...register(field)}>
                                                    <option value="">Select Semester</option>
                                                    {
                                                        ['1st', '2nd', '3rd'].map(item => <option key={item} value={item}> {item} </option>)
                                                    }
                                                </motion.select> :
                                                field === 'student_year' ?
                                                    <motion.select initial={{ x: 150, opacity: 0.1 }} whileInView={{ x: 0, opacity: 1 }} defaultValue={assignmentData[field]} className="form-select" {...register(field)}>
                                                        <option value="">Select Year</option>
                                                        {['1st', '2nd', '3rd', '4th'].map((year) => (
                                                            <option key={year} value={year}>
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </motion.select> :
                                                    field === 'student_session' ?
                                                        <motion.select initial={{ x: 150, opacity: 0.1 }} whileInView={{ x: 0, opacity: 1 }} defaultValue={assignmentData[field]} className="form-select" {...register(field)}>
                                                            <option value="">Select Session</option>
                                                            {sessions.map((year) => (
                                                                <option key={year} value={year}>
                                                                    {year}
                                                                </option>
                                                            ))}
                                                        </motion.select> :
                                                        field === 'teacher_position' ?
                                                            <motion.select initial={{ x: 150, opacity: 0.1 }} whileInView={{ x: 0, opacity: 1 }} defaultValue={assignmentData[field]} className="form-select" {...register(field)}>
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
                                                            </motion.select> :
                                                            field === 'teacher_university' ?
                                                                <motion.input initial={{ x: 150, opacity: 0.1 }} whileInView={{ x: 0, opacity: 1 }} defaultValue={'Bangabandhu Sheikh Mujibur Rahman Science and Technology University, Gopalganj - 8100'} placeholder={field} className='form-control' {...register(`${field}`, { required: true })} /> :
                                                                field === 'submission_date' ?
                                                                    <motion.input initial={{ x: 150, opacity: 0.1 }} whileInView={{ x: 0, opacity: 1 }} defaultValue={assignmentData[field]} type='date' className='form-control' {...register(`${field}`, { required: true })} /> :
                                                                    <motion.input initial={{ x: 150, opacity: 0.1 }} whileInView={{ x: 0, opacity: 1 }} defaultValue={assignmentData[field]} className='form-control' {...register(`${field}`, { required: true })} />

                                        }
                                        {errors[field] && <span className='text-danger'>This field is required</span>}
                                    </div>
                                ))
                            }
                        </div>
                        <input className='btn btn-success mt-3 px-5 bounce-btn' type="submit" value={'Generate'} />
                    </form>

                }


                {
                    !editing &&
                    <>
                        <div className='text-center'>
                            <Image height={500} width={500} src={'/images/done.svg'} alt='assignment cover page generator for bsmrstu' />
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <PDFDownloadLink className='bounce-btn' style={{ color: '#fff', borderRadius: '5px', backgroundColor: '#28a745', padding: '7px 25px', textDecoration: 'none', }} document={<Assignment data={assignmentData} />} fileName={`${assignmentData?.student_id || 'cover'}${assignmentData?.course_code || 'cover'}.pdf`}>
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                            </PDFDownloadLink>
                            <button className='btn btn-primary ms-2 px-5' onClick={() => (setEditing(true))}>Edit Again</button>
                            {/* <div style={styles.pdfContainer}>
                                <PDFViewer style={styles.pdfViewer}>
                                    <Assignment data={assignmentData} />
                                </PDFViewer>
                            </div> */}
                        </div>
                    </>
                }
            </section>
        </Layout>
    )
}
