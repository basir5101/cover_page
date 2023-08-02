import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"

export default function Assignment() {
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
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [html, setHtml] = useState("");
    const [bufferData, setBufferData] = useState("");
    const getHtml = async (pdfData) => {
        const { data } = await axios.post('/api/cover/bsmrstu/assignment', pdfData);
        console.log(data.data)
        setHtml(data.data?.htmlContent);
        setBufferData(data.data?.buffer);
    }

    const onSubmit = async (data) => {
        await getHtml(data)
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


    useEffect(() => {
        //  getHtml()

    }, [])
    return (
        <div className='container py-5'>
            {!html &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        {
                            fields.map(field => (
                                <div className='col-4 mb-3' key={field}>
                                    {/* include validation with required or other standard HTML validation rules */}
                                    <input placeholder={field} className='form-control' {...register(`${field}`, { required: true })} />
                                    {/* errors will return when field validation fails  */}
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

                    <button className='btn btn-success mt-4 px-5' onClick={downloadPDF}>Download PDF</button>
                </div>
            }
        </div>
    )
}
