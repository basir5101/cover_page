import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"

export default function Assignment() {
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(true);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [html, setHtml] = useState("");
    const [bufferData, setBufferData] = useState("");


    const getHtml = async (pdfData) => {
        // const { data } = await axios.post('/api/cover/bsmrstu/assignment', pdfData);
        try {
            const response = await fetch('/api/cover/bsmrstu/assignment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pdfData),
            });

            const data = await response.json();
            console.log(data)
            setHtml(data.data?.htmlContent);
            setBufferData(data.data?.buffer);
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (data) => {
        setLoading(true);
        setEditing(false)
        // Convert the submission date to the desired format "dd-mm-yyyy"
        const formattedDate = new Date(data.submission_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        await getHtml({ ...data, submission_date: formattedDate });
        setLoading(false);
    }
    const downloadPDF = () => {
        const buffer = Buffer.from(bufferData);
        const blob = new Blob([buffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cover.pdf';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };



    const currentYear = new Date().getFullYear();
    const years = [];
    const sessions = [];
    for (let i = 0; i < 10; i++) {
        const startYear = currentYear - i;
        const endYear = currentYear + 1 - i;
        years.push(startYear); // Push the startYear (e.g., 2014, 2015, 2016, etc.) to the years array
        sessions.push(`${startYear}-${String(endYear).slice(2)}`);
    }

    const handleReset = () => {
        setEditing(true);
        setHtml(null);
        setBufferData(null);
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
    return (
        <div className='container py-5'>
            <h1 className='my-5' style={{ fontSize: 20 }}>Generate Assignment Cover Page for BSMRSTU</h1>
            {
                loading && <div className="d-flex align-items-center">
                    <strong>Loading...</strong>
                    <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                </div>
            }
            {
                !html && !loading && editing &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        {
                            fields.map(field => (
                                <div className='col-md-4 mb-3' key={field}>
                                    <label htmlFor={field}>{field.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</label>
                                    {
                                        field === 'student_semester' ?
                                            <select className="form-select" {...register(field)}>
                                                <option value="">Semester</option>
                                                {
                                                    ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map(item => <option key={item} value={item}> {item} </option>)
                                                }
                                            </select> :
                                            field === 'student_year' ?
                                                <select className="form-select" {...register(field)}>
                                                    <option value="">Year</option>
                                                    {['1st', '2nd', '3rd', '4th'].map((year) => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                                </select> :
                                                field === 'student_session' ?
                                                    <select className="form-select" {...register(field)}>
                                                        <option value="">Session</option>
                                                        {sessions.map((year) => (
                                                            <option key={year} value={year}>
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </select> :
                                                    field === 'teacher_position' ?
                                                        <select className="form-select" {...register(field)}>
                                                            <option value="">Teacher Position</option>
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
                                                                <input type='date' placeholder={'date of submission'} className='form-control' {...register(`${field}`, { required: true })} /> :
                                                                <input placeholder={field} className='form-control' {...register(`${field}`, { required: true })} />

                                    }
                                    {errors[field] && <span className='text-danger'>This field is required</span>}
                                </div>
                            ))
                        }
                    </div>


                    <input className='btn btn-success mt-3 px-5' type="submit" value={'Preview'} />
                </form>

            }

            {
                html && <div>
                    <div dangerouslySetInnerHTML={{ __html: html }}></div>

                    <button className='btn btn-success mt-4 px-5 me-3' onClick={downloadPDF}>Download PDF</button>
                    <button className='btn btn-primary mt-4 px-5' onClick={handleReset}>Edit Again</button>
                </div>
            }
        </div>
    )
}
