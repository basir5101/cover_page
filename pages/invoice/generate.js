import Layout from '@/components/layout/CommonLayout'
import Invoice from '@/components/pdf/Invoice';
import dynamic from 'next/dynamic';
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
    ssr: false, // Disable server-side rendering for PDFViewer
});
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), {
    ssr: false, // Disable server-side rendering for PDFViewer
});
import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form"

export default function Generate() {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [invoiceData, setInvoiceData] = useState({});

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        setInvoiceData({
            ...data, image: selectedImage
        });
    }

    console.log(watch("example"))


    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setSelectedImage(URL.createObjectURL(selectedFile));
        } else {
            setSelectedImage(null);
        }
    };
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
        <Layout>
            <section className="container">
                <div className="headline-container mb-3">
                    <h1 className="headline py-1 my-3">Generate invoice</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-7">
                            <div>
                                <button style={{ minHeight: '180px', minWidth: '240px' }} className="btn border" onClick={handleButtonClick}>

                                    {selectedImage ? (
                                        <div className="mt-3">
                                            <img src={selectedImage} alt="Selected" style={{ width: 'auto', height: '240px' }} />
                                        </div>
                                    ) : "Upload logo"}

                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="mt-2">
                                <textarea {...register("invoice_from")} className='form-control w-75' name="invoice_from" placeholder="Who is this invoice from? (required)" cols="30" rows="3"></textarea>
                            </div>
                            <div className="row">
                                <div className="mt-2 col">
                                    <textarea {...register("bill_to")} className='form-control ' name="bill_to" placeholder="Bill to" cols="30" rows="2"></textarea>
                                </div>
                                <div className="col mt-2">
                                    <textarea className='form-control' {...register("ship_to")} name="ship_to" placeholder="Ship to" cols="30" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div>
                                <input className='form-control' style={{ fontSize: '3rem' }} defaultValue={'INVOICE'} {...register("title")} />
                                {errors.title && <span>title is required</span>}
                            </div>
                            <div className='d-flex mt-2 text-right'>
                                <div className="bg-light btn border">#</div>
                                <div className='w-100'>
                                    <input className='form-control' placeholder={'invoice number'} {...register("invoice_number")} />
                                </div>
                            </div>
                            {errors.invoice_number && <span className='text-danger fw-bold'> invoice number is required</span>}

                            <div className='d-flex mt-2 text-right'>
                                <div className="bg-light btn border">Date</div>
                                <div className='w-100'>
                                    <input className='form-control' type='date' placeholder={'invoice number'} {...register("invoice_date")} />
                                </div>
                            </div>
                            {errors.invoice_date && <span className='text-danger fw-bold'> this field is required</span>}

                            <div className='d-flex mt-2 text-right'>
                                <div className="bg-light btn border">#</div>
                                <div className='w-100'>
                                    <input className='form-control' placeholder={'invoice number'} {...register("payment_terms")} />
                                </div>
                            </div>
                            {errors.payment_terms && <span className='text-danger fw-bold'> this field is required</span>}

                            <div className='d-flex mt-2 text-right'>
                                <div className="bg-light btn border" style={{ width: '120px' }}>Due Date</div>
                                <div className='w-100'>
                                    <input className='form-control' type='date' placeholder={'invoice number'} {...register("due_date")} />
                                </div>
                            </div>
                            {errors.due_date && <span className='text-danger fw-bold'> this field is required</span>}

                            <div className='d-flex mt-2 text-right'>
                                <div className='w-100'>
                                    <input className='form-control' type='text' placeholder={'PO number'} {...register("po_number")} />
                                </div>
                            </div>
                            {errors.po_number && <span className='text-danger fw-bold'> this field is required</span>}

                        </div>
                    </div>

                    <table className="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th className='bg-dark text-white' scope="col">item</th>
                                <th className='bg-dark text-white' scope="col">quantity</th>
                                <th className='bg-dark text-white' scope="col">rate</th>
                                <th className='bg-dark text-white' scope="col">amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <input type="text" placeholder='item' className="form-control" />
                                </th>
                                <td> <input type="number" placeholder='quantity' className="form-control" />  </td>
                                <td><input type="number" placeholder='amount' className="form-control" /></td>
                                <td className=' d-flex align-items-center justify-content-center'>$0</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="mt-2">
                                <textarea className='form-control w-75' name="notes" placeholder="any relevant information not already covered" cols="30" rows="3"></textarea>
                            </div>
                            <div className="mt-2">
                                <textarea className='form-control w-75' name="terms" placeholder="terms and conditions" cols="30" rows="3"></textarea>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className='d-flex mt-2 text-right'>
                                <div className='w-100'>
                                    <input className='form-control' type='number' placeholder={'subtotal'} {...register("sub_total")} />
                                </div>
                            </div>
                            {errors.sub_total && <span className='text-danger fw-bold'> this field is required</span>}

                            <div className='d-flex mt-2 text-right'>
                                <div className='w-100'>
                                    <input className='form-control' type='number' placeholder={'total'} {...register("total")} />
                                </div>
                            </div>
                            {errors.total && <span className='text-danger fw-bold'> this field is required</span>}

                            <div className='d-flex mt-2 text-right'>
                                <div className='w-100'>
                                    <input className='form-control' type='number' placeholder={'amount paid'} {...register("amount_paid")} />
                                </div>
                            </div>
                            {errors.amount_paid && <span className='text-danger fw-bold'> this field is required</span>}

                            <div className='d-flex mt-2 text-right'>
                                <div className='w-100'>
                                    <input className='form-control' type='number' placeholder={'balance due'} {...register("balance_due")} />
                                </div>
                            </div>
                            {errors.balance_due && <span className='text-danger fw-bold'> this field is required</span>}
                        </div>
                    </div>
                    <input type="submit" value={'generate'} className='btn btn-success px-5 mt-3' />
                </form>
            </section>
            {
                invoiceData && <div style={styles.pdfContainer}>
                    {/* <PDFDownloadLink style={{ color: '#fff', borderRadius: '5px', backgroundColor: '#28a745', padding: '7px 25px', textDecoration: 'none', }} document={<Invoice data={invoiceData} />} fileName={`${'cover'}.pdf`}>
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                    </PDFDownloadLink> */}
                    <PDFViewer style={styles.pdfViewer}>
                        <Invoice data={invoiceData} />
                    </PDFViewer>
                </div>
            }
        </Layout>
    )
}
