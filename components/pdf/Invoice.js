import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

export default function Invoice({ data }) {
    console.log(data);
    const {
        image = "/logo.png"
    } = data;


    // Load any fonts if needed
    Font.register({
        family: 'Times New Roman',
        fonts: [
            { src: '/fonts/times.ttf' },
        ],
    });



    const {
        user_company = 'user company',
        user_name = 'default name',
        company_address = 'default address',
        city_state = 'default city',
        title = 'INVOICE',
        bill_to_tile = 'Bill To: ',
        client_company = 'default client company',
        client_address = 'default client address',
        client_city_state = 'default client city',
        invoice_number_title = 'INVOICE#',
        invoice_number = '001',
        invoice_date_title = 'Invoice date: ',
        invoice_date = '08/25/2023',
        due_date_tile = 'Due Date: ',
        due_date = '08/25/2023',
        items = [
            { name: 'item', quantity: 4, rate: 330 },
        ],
        sub_total_title = 'default sub total title',
        tax_title = 'Tax',
        tax = 0,
        total_title = 'Total',
        notes = 'default notes',
        terms = 'default terms'
    } = data;


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
        },
        logo: {
            height: 80,
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
                            {
                                image && <View style={styles.logoContainer}>
                                    <Image style={styles.logo} src={image} alt="logo" />
                                </View>
                            }
                            <Text style={[styles.text, styles.bold]}>{user_company} </Text>
                            <Text style={styles.text}>{user_name} </Text>
                            <Text style={styles.text}>{company_address} </Text>
                            <Text style={styles.text}>{city_state} </Text>
                        </View>
                        <View style={[styles.tableCol, {
                            flexDirection: 'column',
                            alignItems: 'flex-end'
                        }]}>
                            <Text style={styles.title}>{title} </Text>
                            <Text style={styles.text}>{invoice_number_title} {invoice_number} </Text>
                        </View>
                    </View>

                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, styles.col70]}>
                            <Text style={[styles.text, styles.bold]}> {bill_to_tile} </Text>
                            <Text style={styles.text}> {client_company} </Text>
                            <Text style={styles.text}> {client_address} </Text>
                            <Text style={styles.text}> {client_city_state} </Text>
                        </View>
                        <View style={[styles.tableCol, styles.col30]}>
                            <Text style={[styles.text, { marginTop: '10px' }]}>{invoice_date_title} {invoice_date} </Text>
                            <Text style={[styles.text]}>{due_date_tile} {due_date} </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.table, { textAlign: 'center' }]}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol]}>
                            <Text style={[styles.text, { backgroundColor: '#111', textAlign: 'center', color: '#fff' }]}> # </Text>

                            {
                                items.map((item, index) => <Text key={index} style={styles.text}> {index + 1} </Text>)
                            }
                        </View>
                        <View style={[styles.tableCol]}>
                            <Text style={[styles.text, { backgroundColor: '#111', textAlign: 'center', color: '#fff' }]}> Item </Text>

                            {
                                items.map((item, index) => <Text key={index} style={styles.text}> {item.name} </Text>)
                            }
                        </View>
                        <View style={[styles.tableCol]}>
                            <Text style={[styles.text, { backgroundColor: '#111', textAlign: 'center', color: '#fff' }]}> Quantity </Text>
                            {
                                items.map((item, index) => <Text key={index} style={styles.text}> {item.quantity} </Text>)
                            }
                        </View>
                        <View style={[styles.tableCol]}>
                            <Text style={[styles.text, { backgroundColor: '#111', textAlign: 'center', color: '#fff' }]}> rate </Text>
                            {
                                items.map((item, index) => <Text key={index} style={styles.text}> {item.rate} </Text>)
                            }
                        </View>
                        <View style={[styles.tableCol]}>
                            <Text style={[styles.text, { backgroundColor: '#111', textAlign: 'center', color: '#fff' }]}> amount </Text>
                            {
                                items.map((item, index) => <Text key={index} style={styles.text}> {item.quantity * item.rate} </Text>)
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol]}>
                        </View>
                        <View style={[styles.tableCol, styles.rightAlignedColumn]}>
                            <Text style={[styles.text, { textAlign: 'right' }]}> Sub total:  {
                                items.map(item => item.quantity * item.rate).reduce((total, subtotal) => total + subtotal, 0)
                            } </Text>
                            <Text style={styles.text}> Tax {`(${tax}%)`}:  {
                                ((items.map(item => item.quantity * item.rate).reduce((total, subtotal) => total + subtotal, 0) * tax) / 100).toFixed(2)
                            } </Text>
                            <Text style={styles.text}> {total_title}: {
                                Number(((items.map(item => item.quantity * item.rate).reduce((total, subtotal) => total + subtotal, 0) * tax) / 100).toFixed(2)) + items.map(item => item.quantity * item.rate).reduce((total, subtotal) => total + subtotal, 0)
                            } </Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.text, { marginTop: 5 }, styles.bold]}> Notes: </Text>
                <Text style={[styles.text]}> {notes} </Text>
                <Text style={[styles.text, { marginTop: 15 }, styles.bold]}> Terms and Conditions: </Text>
                <Text style={[styles.text]}> {terms} </Text>
            </Page>
        </Document>
    )
}
