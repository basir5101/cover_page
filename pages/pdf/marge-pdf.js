import Layout from '@/components/layout/CommonLayout';
import axios from 'axios';
import React, { useState } from 'react';

export default function MargePdf() {
    const [files, setFiles] = useState([]);

    const handlePdf = (e) => {
        const newFiles = [...files];
        newFiles.push(e.target.files[0]); // Store the File object
        setFiles(newFiles);
    };

    const handleMarge = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            files.forEach(file => formData.append('pdfFiles', file)); // Append each File to the form data

            const result = await axios.post('http://localhost:3000/api/pdf/marge', formData);
            console.log(result);
        } catch (error) {
            console.error('Error merging PDFs:', error);
        }
    };

    return (
        <Layout>
            <input className='form-control' type="file" onChange={handlePdf} name="upload_pdf" id="marge_pdf" />
            <button onClick={handleMarge} className="btn btn-success mt-3 px-5">Merge PDFs</button>
        </Layout>
    );
}
