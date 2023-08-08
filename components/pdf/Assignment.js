import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

export default function Assignment() {

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
            height: 120,
        },
        subTitle: {
            textAlign: 'center',
            color: '#2d7136',
            fontSize: 12,
            marginTop: 20,
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
        tableHeader: {
            flexDirection: 'row',
            backgroundColor: '#2d7136',
            color: 'white',
            fontSize: 12,
            width: '100%',
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
        submissionDate: {
            fontSize: 12,
            marginTop: 20,
        },
        default: {
            fontSize: 12,
        },
        flex: {
            display: 'flex',
        },
        boldText: {
            fontWeight: 'bold',
        },
    });
    return (
        <Document>
            <Page size="A4" style={styles.container}>
                <Text style={styles.heading}>BANGABANDHU SHEIKH MUJIBUR RAHMAN SCIENCE</Text>
                <Text style={styles.heading}>&</Text>
                <Text style={styles.heading}>TECHNOLOGY UNIVERSITY</Text>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} src="/images/logo/bsmrstu.jpg" alt="bsmrstu logo" />
                </View>
                <Text style={styles.subTitle}>GOPALGANJ-8100</Text>
                <View style={styles.hr} />
                <Text style={styles.assignmentTitle}>Assignment on</Text>
                <Text style={styles.assignmentTitle}>web development</Text>
                <View style={styles.courseDetails}>
                    <Text>Course Title: <Text style={{ fontWeight: 'normal' }}>physics</Text></Text>
                    <Text>Course Code: <Text style={{ fontWeight: 'normal' }}>phy304</Text></Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Submitted By</Text>
                        <Text style={styles.tableCol}>Submitted To</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text>
                                <Text style={{ fontFamily: 'Times-Bold' }}>Name:</Text> shaon
                            </Text>
                            <Text>
                                <Text style={{ fontFamily: 'Times-Bold' }}>Student Id:</Text> 18phy040
                            </Text>
                            <Text>
                                <Text style={{ fontFamily: 'Times-Bold' }}>Year:</Text> 18phy040
                            </Text>
                            <Text>
                                <Text style={{ fontFamily: 'Times-Bold' }}>Session:</Text> 2019-20
                            </Text>
                            <Text>Department of physics</Text>
                            <Text>Bangabandhu Sheikh Mujibur Rahman Science & Technology University,</Text>
                            <Text>Gopalganj-8100</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text>
                                <Text style={{ fontFamily: 'Times-Bold' }}>Name:</Text> shaon
                            </Text>
                            <Text style={{ marginTop: 3 }}>Lecturer</Text>
                            <Text style={{ marginTop: 20 }}>Department of Physics</Text>
                            <Text >Bangabandhu Sheikh Mujibur Rahman Science and Technology University Gopalganj - 8100</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.submissionDate}>Date of Submission: 09/08/2023</Text>
            </Page>
        </Document>
    )
}
