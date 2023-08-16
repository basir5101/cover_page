import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form"
import Image from 'next/image';
import SEO from '@/components/SEO/SEO';
import Layout from '@/components/layout/CommonLayout';
import RUPDF from '@/components/pdf/RUPDF';
import Form from '@/components/form/Form';
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
    ssr: false, // Disable server-side rendering for PDFViewer
});
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), {
    ssr: false, // Disable server-side rendering for PDFViewer
});

export default function Assignment() {
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
            width: '100%', // Set the width to 100% to fill the available space
            height: '100vh', // Set the height to full viewport height
        },
    };

    return (
        <>
            <SEO
                title="Assignment Cover Page Maker for RU</h1>"
                description="Generate Assignment Cover Page for University of Rajshahi. Create a new assignment cover page for RU and configure the new assignment cover page for RU"
            />
            <Form
                title={'Assignment Cover Page - University of Rajshahi'}
                PDF={RUPDF}
                fields={fields}
            />

        </>
    )
}
