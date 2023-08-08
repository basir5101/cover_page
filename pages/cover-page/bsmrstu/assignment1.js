import React from 'react'
import Assignment from '@/components/pdf/Assignment';
import dynamic from 'next/dynamic';
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
    ssr: false, // Disable server-side rendering for PDFViewer
});
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), {
    ssr: false, // Disable server-side rendering for PDFViewer
});

export default function assignment1() {
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
        <section className='container py-5'>
            <PDFDownloadLink style={{ color: '#fff', borderRadius: '5px', backgroundColor: '#de33aa', padding: '5px 20px', textDecoration: 'none', }} document={<Assignment />} fileName="fee_acceptance.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
            <div style={styles.pdfContainer}>
                <PDFViewer style={styles.pdfViewer}>
                    <Assignment />
                </PDFViewer>
            </div>
        </section>
    )
}
