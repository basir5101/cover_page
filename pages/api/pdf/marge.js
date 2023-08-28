const { PDFDocument } = require('pdf-lib');
const formidable = require('formidable');
const fs = require('fs');

export default async function handler(req, res) {
    try {
        const form = new formidable.IncomingForm();
        console.log('hi')
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                res.status(500).end();
                return;
            }

            const pdfFiles = files.pdfFiles;

            const mergedPdf = await PDFDocument.create();

            for (const pdfFile of pdfFiles) {
                const pdfBytes = fs.readFileSync(pdfFile.path); // Use the path to the temporary file
                const pdfDoc = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedPdfBytes = await mergedPdf.save();
            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).send(mergedPdfBytes);
        });
    } catch (error) {
        console.error('Error merging PDFs:', error);
        res.status(500).send({
            status: 'Internal Server Error',
            error: error
        });
    }
}
