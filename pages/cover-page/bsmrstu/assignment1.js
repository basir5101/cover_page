import React from 'react'
import Assignment from '@/components/pdf/Assignment';
import dynamic from 'next/dynamic';
// Use dynamic import to conditionally load the PDFViewer component
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
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
        <div style={styles.pdfContainer}>
            <PDFViewer style={styles.pdfViewer}>
                <Assignment />
            </PDFViewer>
        </div>
    )
}
