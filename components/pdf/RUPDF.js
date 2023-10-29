import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

export default function RUPDF({ data, name, logo }) {

    const {
        assignment_topic = 'Assignment Topic',
        course_title = 'Course Title',
        course_code = 'Course Code',
        student_name = 'Student Name',
        student_id = 'Student ID',
        student_year = 'Student Year',
        student_semester = 'Student Semester',
        student_session = 'Student Session',
        student_department = 'Student Department',
        teacher_name = 'Teacher Name',
        teacher_position = 'Teacher Position',
        teacher_department = 'Teacher Department',
        teacher_university = 'Teacher University',
        submission_date = 'Submission Date'
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
        },

        heading: {
            textAlign: 'center',
            color: '#0303f2',
            fontSize: 25,
            fontFamily: 'Times-Bold'
        },
        logoContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        logo: {
            height: 120,
        },
        subTitle: {
            textAlign: 'center',
            color: '#0303f2',
            fontSize: 18,
            marginTop: 8,
        },
        hr: {
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            marginTop: 20,
        },
        assignmentTitle: {
            textAlign: 'center',
            fontSize: 18,
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
                <Text style={styles.heading}>{name}</Text>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} src={logo} alt="bsmrstu logo" />
                </View>
                <Text style={[styles.assignmentTitle, { fontFamily: 'Times-Bold' }]}>Assignment on</Text>
                <Text style={styles.assignmentTitle}> {assignment_topic} </Text>
                <View style={styles.courseDetails}>
                    <Text style={styles.text} >
                        <Text style={{ fontFamily: 'Times-Bold' }}>Course Name:</Text> {course_title}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={{ fontFamily: 'Times-Bold' }}>Course No:</Text> {course_code}
                    </Text>
                </View>
                <View style={styles.table}>
                    <View style={[styles.tableRow, { textAlign: 'center', fontFamily: 'Times-Bold' }]}>
                        <Text style={styles.tableCol}>Submitted By</Text>
                        <Text style={styles.tableCol}>Submitted To</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.text}>
                                <Text style={{ fontFamily: 'Times-Bold' }}>Name:</Text> {student_name}
                            </Text>
                            <Text style={styles.text}>
                                <Text style={{ fontFamily: 'Times-Bold' }}>Student Id:</Text> {student_id}
                            </Text>
                            <Text style={styles.text} >
                                <Text style={{ fontFamily: 'Times-Bold' }}>Year:</Text> {student_year}
                            </Text>
                            <Text style={styles.text} >
                                <Text style={{ fontFamily: 'Times-Bold' }}>Semester:</Text> {student_semester}
                            </Text>

                            <Text style={styles.text}>
                                <Text style={{ fontFamily: 'Times-Bold' }}>Session:</Text> {student_session}
                            </Text>
                            <Text style={styles.text}>Department of {student_department}</Text>
                            <Text style={styles.text}>{name} </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.text}>
                                <Text style={{ fontFamily: 'Times-Bold' }}>Name:</Text> {teacher_name}
                            </Text>
                            <Text style={[styles.text, { marginTop: 3 }]}>{teacher_position} </Text>
                            <Text style={[styles.text, { marginTop: 20 }]}>Department of {teacher_department} </Text>
                            <Text style={styles.text}>{teacher_university} </Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.text, { marginTop: 5 }]}>Date of Submission: {submission_date} </Text>
            </Page>
        </Document>
    )
}
