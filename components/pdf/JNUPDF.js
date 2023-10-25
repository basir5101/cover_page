import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

export default function PDFJNU({ data, name, logo }) {

    const {
        course_title = 'Course Title',
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
        assignment_no
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
        primaryColor: {
            color: '#954a22',
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
            fontSize: 18,
            marginTop: 5,
        },
        header: {
            fontSize: 28,
            fontFamily: 'Times-Bold'
        },
        subheader: {
            fontSize: 20,
            fontFamily: 'Times-Bold'
        },
        bold: {
            fontFamily: 'Times-Bold'
        }
    });
    return (
        <Document>
            <Page size="A4" style={styles.container}>
                <View>
                    <Text style={[styles.header, styles.primaryColor]}> {name} </Text>
                    <Text style={styles.subheader}> Department of {student_department} </Text>
                </View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} src={logo} alt={`${name} logo`} />
                </View>
                <View>
                    <Text style={[styles.text, styles.secondaryColor, styles.bold]}> Assignment On </Text>
                    <Text style={styles.subheader}> {assignment_title} </Text>
                    {
                        assignment_no && <Text style={styles.text} > {assignment_title} </Text>
                    }
                    <Text style={[styles.text, styles.bold]}> Course Title: {course_title} </Text>
                    <Text style={[styles.text, styles.bold]}> Course Code: {course_code} </Text>
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
                                ID: {student_id}
                            </Text>
                            <Text style={styles.text} >
                                {student_batch} Batch
                            </Text>
                            <Text style={styles.text}>Department of {student_department}</Text>
                            <Text style={styles.text}> {name} </Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.text, { marginTop: 30 }, styles.bold]}>Date of Submission: {submission_date} </Text>
            </Page>
        </Document>
    )
}
