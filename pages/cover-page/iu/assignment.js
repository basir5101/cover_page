import React, { useEffect, useState } from 'react'
import Assignment from '@/components/pdf/Assignment';
import SEO from '@/components/SEO/SEO';
import Layout from '@/components/layout/CommonLayout';
import FormGenerator from '@/components/common/FormGenerator';
import IUAssignment from '@/components/pdf/IUAssignment';

export default function assignment() {
    const fields = [
        'assignment_topic',
        'course_name',
        'course_code',
        'student_name',
        'student_roll_no.',
        'student_registration_no.',
        'student_session',
        'student_department',
        'teacher_name',
        'teacher_position',
        'teacher_department',
        'teacher_university',
        'submission_date'
    ];
    return (
        <Layout>
            <SEO
                title="Generate Assignment Cover Page for Islamic University-IU</h1>"
                description="Generate Assignment Cover Page for Islamic University, kushtia. Create a new assignment cover page for IU and configure the new assignment cover page for Islamic University"
            />
            <FormGenerator
                fields={fields} title='Generate Assignment Cover Page for Islamic University'
                Design={IUAssignment}
                university='Islamic University, Kushtia'
            />
        </Layout>
    )
}
