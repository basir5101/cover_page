import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

export default function PDFJNU({ data }) {

    const {
        course_title = 'Course Title',
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
            padding: 40,
            fontFamily: 'Times New Roman',
            textAlign: 'center',
        },

        heading: {
            textAlign: 'center',
            color: '#2d7136',
            fontSize: 15,
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
        subTitle: {
            textAlign: 'center',
            // color: '#2d7136',
            fontSize: 20,
            marginTop: 12,
            fontFamily: 'Times-Bold'
        },
        hr: {
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            marginTop: 20,
        },
        assignmentTitle: {
            textAlign: 'center',
            fontSize: 15,
            marginTop: 5,
        },
        courseDetails: {
            marginTop: 20,
            marginBottom: 10
        },
        table: {
            display: 'table',
            width: '100%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            marginBottom: 20, // Add some margin to the table
        },
        tableRow: {
            flexDirection: 'row', // Adjust the flexDirection for table rows

        },
        tableCol: {
            flex: 1,
            borderStyle: 'solid',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            padding: 8,
        },
        text: {
            fontSize: 18,
            marginTop: 5,
        }
    });
    return (
        <Document>
            <Page size="A4" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} src="/images/logo/jnu.png" alt="bsmrstu logo" />
                </View>
                <Text style={styles.subTitle}> Department of {student_department} </Text>

                <View style={styles.courseDetails}>
                    <Text style={styles.text} >
                        <Text style={{ fontFamily: 'Times-Bold', textAlign: 'center' }}>Course Title:</Text> {course_title}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={{ fontFamily: 'Times-Bold', textAlign: 'center' }}>Course Code:</Text> {course_code}
                    </Text>
                </View>
                <View>
                    <Text style={{ textDecoration: 'underline', marginTop: 20 }}>Submitted To</Text>
                    <Text style={styles.text}>
                        <Text style={{ fontFamily: 'Times-Bold' }}>{teacher_name}</Text>
                    </Text>
                    <Text style={[styles.text, { fontFamily: 'Times-Bold', marginTop: 5 }]}>{teacher_position} </Text>
                    <Text style={[styles.text, { marginTop: 5 }]}>Department of {teacher_department} </Text>
                    <Text style={styles.text}>{teacher_university} </Text>
                </View>
                <View>
                    <Text style={{ textDecoration: 'underline', marginTop: 20 }}>Submitted By</Text>
                    <Text style={styles.text}>
                        {student_name}
                    </Text>
                    <Text style={styles.text}>
                        ID: {student_id}
                    </Text>
                    <Text style={styles.text} >
                        {student_batch} Batch
                    </Text>
                    <Text style={styles.text}>Department of {student_department}</Text>
                    <Text style={styles.text}> Jagannath University </Text>
                </View>
                <Text style={[styles.text, { marginTop: 40 }]}>Date of Submission: {submission_date} </Text>
            </Page>
        </Document>
    )
}
