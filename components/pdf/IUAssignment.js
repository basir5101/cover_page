import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

export default function IUAssignment({ data }) {

    const {
        course_name = 'Course Title',
        assignment_title = 'Assignment Title',
        course_code = 'Course Code',
        student_name = 'Student Name',
        student_id = 'Student ID',
        student_department = 'Student Department',
        teacher_name = 'Teacher Name',
        teacher_position = 'Teacher Position',
        teacher_department = 'Teacher Department',
        teacher_university = 'Teacher University',
        submission_date = 'Submission Date',
        student_batch = 'Student batch',
        student_roll_no = 'Student Roll Number',
        student_registration_no = 'Student Registration Number',
        student_session = 'Student Session'
    } = data;


    // Load any fonts if needed
    Font.register({
        family: 'Times New Roman',
        fonts: [
            { src: '/fonts/times.ttf' },
        ],
    });

    // Create styles
    const styles = StyleSheet.create({
        container: {
            padding: 60,
            fontFamily: 'Times New Roman',
            textAlign: 'center',
        },
        primaryColor: {
            color: '#1da902',
        },
        secondaryColor: {
            color: '#3730a3',
        },
        logoContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        logo: {
            height: 140,
        },
        hr: {
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            marginTop: 20,
        },
        table: {
            display: 'table',
            width: '100%',
            marginBottom: 20, // Add some margin to the table
        },
        tableRow: {
            flexDirection: 'row', // Adjust the flexDirection for table rows
        },
        tableCol: {
            padding: 8,
        },
        text: {
            fontSize: 15,
            marginTop: 5,
        },
        header: {
            fontSize: 28,
            fontFamily: 'Times-Bold'
        },
        subheader: {
            fontSize: 19,
            fontFamily: 'Times-Bold'
        },
        bold: {
            fontFamily: 'Times-Bold'
        }
    });
    return (
        <Document>
            <Page size="A4" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} src="/images/logo/iu.png" alt="islamic university logo" />
                </View>

                <View style={{ textAlign: 'center' }}>
                    <Text style={[styles.text, styles.secondaryColor]}> An </Text>
                    <Text style={[{ fontSize: 17 }, styles.secondaryColor]}> Assignment On </Text>
                    <Text style={[styles.subheader, styles.primaryColor]}> {assignment_title} </Text>
                    <Text style={[styles.text, styles.bold]}> Course Code: {course_code} </Text>
                    <Text style={[styles.text, styles.bold]}> Course Name: {course_name} </Text>

                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow} >
                        <View style={styles.tableCol} >
                            <Text style={[styles.text, styles.bold, styles.primaryColor, { textDecoration: 'underline', marginTop: 20, }]}>Submitted To</Text>
                            <Text style={styles.text}>
                                <Text style={[styles.text, styles.bold]}>{teacher_name}</Text>
                            </Text>
                            <Text style={styles.text}>{teacher_position} </Text>
                            <Text style={[styles.text, { marginTop: 5 }]}>Department of {teacher_department} </Text>
                            <Text style={styles.text}>{teacher_university} </Text>
                        </View>
                        <View style={styles.tableCol}>

                        </View>
                    </View>
                    <View style={styles.tableRow} >
                        <View style={[styles.tableCol, { width: '50%' }]} >

                        </View>
                        <View style={styles.tableCol}>
                            <Text style={[styles.text, styles.bold, styles.primaryColor, { textDecoration: 'underline', marginTop: 20, }]}>Submitted By</Text>
                            <Text style={[styles.text, styles.bold]}>
                                {student_name}
                            </Text>
                            <Text style={styles.text}>
                                Roll No: {student_roll_no}
                            </Text>
                            <Text style={styles.text} >
                                Registration No.: {student_registration_no}
                            </Text>
                            <Text style={styles.text} >
                                Session: {student_session}
                            </Text>
                            <Text style={styles.text}>Department of {student_department}</Text>
                            <Text style={styles.text}>Islamic University, Kushtia </Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.text, { marginTop: 30 }, styles.bold]}>Date of Submission: {submission_date} </Text>
            </Page>
        </Document>
    )
}
