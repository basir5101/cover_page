import React, { useEffect, useState } from 'react'
import Assignment from '@/components/pdf/Assignment';
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form"
import Image from 'next/image';
import SEO from '@/components/SEO/SEO';
import Layout from '@/components/layout/CommonLayout';
import PDFJNU from '@/components/pdf/JNUPDF';
import { AssignmentProvider } from '@/components/context/AssignmentContext';
import FormGenerator from '@/components/common/FormGenerator';
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
            <SEO
                title="Assignment Cover Page maker for JNU - Jagannath University</h1>"
                description="Generate Assignment Cover Page for Jagannath University (JNU). Create a new assignment cover page for Jagannath University and configure the new assignment cover page for JNU"
            />
            <AssignmentProvider
                university='Jagannath University'
                logo={"/images/logo/jnu.png"}
            >
                <FormGenerator
                    fields={fields} title='Assignment Cover Page - Jagannath University, Dhaka'
                    Design={PDFJNU}
                    university='Jagannath University'
                />
            </AssignmentProvider>
        </Layout>
    )
}
