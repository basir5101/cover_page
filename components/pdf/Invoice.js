import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

export default function Invoice({ data }) {
    console.log(data.image);
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
        submission_date = 'Submission Date',
        image = "/logo.png"
    } = data;


    // Load any fonts if needed
    Font.register({
        family: 'Times New Roman',
        fonts: [
            { src: '/fonts/times.ttf' },
        ],
    });


    const invoiceData = {
        type: 'invoice',
        from: 'Abdul Basir',
        to: "Abdul Basir to",
        ship_to: 'sontospur bangabari',
        number: 1,
        purchase_order: 'sdf',
        date: '2023-08-21',
        payment_terms: 'Net 30',
        due_date: '2023-09-20',
        due_balance: 323,
        custom_fields: [
            { name: 'Field 1', value: 'Value 1' },
            { name: 'Field 2', value: 'Value 2' }
        ],
        items: [
            {
                quantity: 2,
                name: 'Product A',
                description: 'Description of Product A',
                unit_cost: 50,
                amount: 100
            },
            {
                quantity: 3,
                name: 'Product B',
                description: 'Description of Product B',
                unit_cost: 30,
                amount: 90
            }
        ],
        currency: 'usd',
        fields: {
            discounts: true,
            tax: '10%',
            shipping: true
        },
        discounts: 15,
        tax: 19,
        shipping: 8,
        amount_paid: 180,
        notes: 'Additional notes for the invoice.',
        terms: 'These are the terms and conditions.',
        payment_methods: ['Credit Card', 'Bank Transfer'],
        header: 'INVOICE',
        credit_note_header: 'CREDIT NOTE',
        credit_note_number_title: '#',
        invoice_number_title: '#',
        invoice_number: '3434',
        to_title: 'Bill To',
        ship_to_title: 'Ship To',
        date_title: 'Invoice Date',
        payment_terms_title: 'Payment Terms',
        due_date_title: 'Due Date',
        purchase_order_title: 'PO Number',
        item_header: 'Item',
        quantity_header: 'Quantity',
        unit_cost_header: 'Rate',
        amount_header: 'Amount',
        subtotal_title: 'Subtotal',
        discounts_title: 'Discount',
        tax_title: 'Tax',
        shipping_title: 'Shipping',
        total_title: 'Total',
        amount_paid_title: 'Amount Paid',
        balance_title: 'Balance Due',
        terms_title: 'Terms',
        notes_title: 'Notes',
        draft: true,
        id: 1,
        subtotal: 190,
        total: 193.9,
        balance: 13.9
    };


    // Create styles
    const styles = StyleSheet.create({
        container: {
            padding: 40,
            fontFamily: 'Times New Roman',
        },
        logoContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: 10,
        },
        logo: {
            height: 120,
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
            flexGrow: 0,
        },
        tableCol: {
            // padding: 8,
            flexGrow: 1,

        },
        col70: {
            flexBasis: '60%', // Use flexBasis for fixed dimension
            maxWidth: '60%', // Additionally set maxWidth to ensure content doesn't overflow
        },
        col30: {
            flexBasis: '40%', // Use flexBasis for fixed dimension
            maxWidth: '40%', // Additionally set maxWidth to ensure content doesn't overflow
        },
        text: {
            fontSize: 12,
            marginTop: 5,
        },
        title: {
            fontSize: 20,
            marginTop: 5,
            fontFamily: 'Times-Bold'
        },
        bold: { fontFamily: 'Times-Bold' },
        rightAlignedColumn: {
            flexDirection: 'column', // Ensure text items stack vertically
            alignItems: 'flex-end', // Align text items to the end (right)
        },
    });
    return (
        <Document>
            <Page size="A4" style={styles.container}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo} src={image} alt="logo" />
                            </View>
                            <Text style={[styles.text, styles.bold]}>{invoiceData.from} </Text>
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <View style={[styles.tableCol, styles.col70]}>
                                        <Text style={styles.text}> Bill To </Text>
                                        <Text style={styles.text}> {invoiceData.to} </Text>
                                    </View>
                                    <View style={[styles.tableCol, styles.col30]}>
                                        <Text style={styles.text}>Ship To </Text>
                                        <Text style={styles.text}> {invoiceData.ship_to} </Text>

                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.tableCol, { direction: 'rtl' }]}>
                            <Text style={styles.title}>{invoiceData.header} </Text>
                            <Text style={styles.text}>{invoiceData.invoice_number_title} {invoiceData.invoice_number} </Text>
                            <Text style={[styles.text, { marginTop: '10px' }]}>Date: {invoiceData.date} </Text>
                            <Text style={[styles.text]}>Payment terms: {invoiceData.terms} </Text>
                            <Text style={[styles.text]}>Due date: {invoiceData.due_date} </Text>
                            <Text style={[styles.text]}>balance due: {invoiceData.due_balance} </Text>
                        </View>
                    </View>

                </View>
                <View style={[styles.table, { textAlign: 'center' }]}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol]}>
                            <Text style={[styles.text, { backgroundColor: '#111', textAlign: 'center', color: '#fff' }]}> Item </Text>

                            {
                                invoiceData.items.map((item, index) => <Text key={index} style={styles.text}> {item.name} </Text>)
                            }
                        </View>
                        <View style={[styles.tableCol]}>
                            <Text style={[styles.text, { backgroundColor: '#111', textAlign: 'center', color: '#fff' }]}> Quantity </Text>
                            {
                                invoiceData.items.map((item, index) => <Text key={index} style={styles.text}> {item.quantity} </Text>)
                            }
                        </View>
                        <View style={[styles.tableCol]}>
                            <Text style={[styles.text, { backgroundColor: '#111', textAlign: 'center', color: '#fff' }]}> rate </Text>
                            {
                                invoiceData.items.map((item, index) => <Text key={index} style={styles.text}> {item.unit_cost} </Text>)
                            }
                        </View>
                        <View style={[styles.tableCol]}>
                            <Text style={[styles.text, { backgroundColor: '#111', textAlign: 'center', color: '#fff' }]}> amount </Text>
                            {
                                invoiceData.items.map((item, index) => <Text key={index} style={styles.text}> {item.amount} </Text>)
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol]}>
                        </View>
                        <View style={[styles.tableCol, styles.rightAlignedColumn]}>
                            <Text style={[styles.text, { textAlign: 'right' }]}> Subtotal:  {invoiceData.subtotal} </Text>
                            <Text style={styles.text}> Total:  {invoiceData.total} </Text>
                            <Text style={styles.text}> Amount Paid:  {invoiceData.amount_paid} </Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.text, { marginTop: 5 }]}>Date of Submission: {submission_date} </Text>
            </Page>
        </Document>
    )
}
