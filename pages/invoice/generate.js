import Layout from '@/components/layout/CommonLayout'
import Invoice from '@/components/pdf/Invoice';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
    ssr: false, // Disable server-side rendering for PDFViewer
});
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), {
    ssr: false, // Disable server-side rendering for PDFViewer
});
import React, { useRef, useState } from 'react'
import { X } from 'react-feather';
import { useForm } from "react-hook-form"

export default function Generate() {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [invoiceData, setInvoiceData] = useState("");
    const [tax, setTax] = useState(0);
    const [editing, setEditing] = useState(true)
    const [items, setItems] = useState([
        {
            name: 'item',
            quantity: 1,
            rate: 0
        }
    ])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        setInvoiceData({
            ...data, image: selectedImage, items: items, tax: tax
        });
        setEditing(false)
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

    const handleItems = (e, index) => {
        const { name, value } = e.target;
        let newItems = [...items];
        newItems[index][name] = value;
        setItems(newItems);
    }

    const handleAddItem = (e) => {
        const newItems = [...items];
        newItems.push({
            name: 'item',
            quantity: 1,
            rate: 0
        });
        setItems(newItems)
    }
    const handleRemoveItem = (e, index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    }
    return (
        <Layout>
            <section className="container">
                <div className="headline-container mb-3">
                    <h1 className="headline py-1 my-3">Generate invoice</h1>
                </div>
                {
                    editing && <form onSubmit={handleSubmit(onSubmit)} className='col-11 m-auto'>
                        <div className="row">
                            <div className="col-md-7">
                                <div className='position-relative'>
                                    <button style={{ height: '180px', width: '180px', overflow: 'hidden' }} className="btn border" onClick={handleButtonClick}>

                                        {selectedImage ? (
                                            <div className="mt-3">
                                                <img src={selectedImage} alt="Selected" style={{ width: 'auto', height: '180px' }} />
                                            </div>
                                        ) : "Upload logo"}

                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    {
                                        selectedImage && <button onClick={(e) => setSelectedImage(null)} className="btn btn-danger position-absolute"> <X /> </button>
                                    }
                                </div>

                                <div className="mt-2">
                                    <input className='form-control' placeholder='Your Company' {...register("user_company")} />
                                    {errors.user_company && <span>this field is required</span>}
                                </div>
                                <div className="mt-2">
                                    <input className='form-control' placeholder='Your Name' {...register("user_name")} />
                                    {errors.user_name && <span>this field is required</span>}
                                </div>
                                <div className="mt-2">
                                    <input className='form-control' placeholder={`Company's Address`} {...register("company_address")} />
                                    {errors.company_address && <span>this field is required</span>}
                                </div>
                                <div className="mt-2">
                                    <input className='form-control' placeholder={`City, State Zip`} {...register("city_state")} />
                                    {errors.city_state && <span>this field is required</span>}
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div>
                                    <input className='form-control text-end' style={{ fontSize: '3rem' }} defaultValue={'INVOICE'} {...register("title")} />
                                    {errors.title && <span>title is required</span>}
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-md-7">
                                <div className="mt-2">
                                    <input className='form-control fw-bold' defaultValue='Bill To: ' {...register("bill_to_tile")} />
                                    {errors.bill_to_tile && <span>this field is required</span>}
                                </div>
                                <div className="mt-2">
                                    <input className='form-control' placeholder='Your Client Company' {...register("client_company")} />
                                    {errors.client_company && <span>this field is required</span>}
                                </div>
                                <div className="mt-2">
                                    <input className='form-control' placeholder={`Client's Address`} {...register("client_address")} />
                                    {errors.client_address && <span>this field is required</span>}
                                </div>
                                <div className="mt-2">
                                    <input className='form-control' placeholder={`City, State Zip`} {...register("client_city_state")} />
                                    {errors.client_city_state && <span>this field is required</span>}
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className='d-flex mt-2'>
                                    <div className='w-25'>
                                        <input className='form-control border-0 fw-bold' defaultValue={'invoice#'} {...register("invoice_number_title")} />
                                        {errors.invoice_number_title && <span>this field is required</span>}
                                    </div>
                                    <div className='w-75'>
                                        <input className='form-control' placeholder={'INV-00344'} {...register("invoice_number")} />
                                        {errors.invoice_number && <span>this field is required</span>}
                                    </div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div className='w-25'>
                                        <input className='form-control border-0 fw-bold' defaultValue={'Invoice Date: '} {...register("invoice_date_title")} />
                                        {errors.invoice_date_title && <span>this field is required</span>}
                                    </div>
                                    <div className='w-75'>
                                        <input className='form-control' type='date' placeholder={'invoice Date'} {...register("invoice_date")} />
                                        {errors.invoice_date && <span>this field is required</span>}
                                    </div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div className='w-25'>
                                        <input className='form-control border-0 fw-bold' defaultValue={'Due Date: '} {...register("due_date_tile")} />
                                        {errors.due_date_tile && <span>this field is required</span>}
                                    </div>
                                    <div className='w-75'>
                                        <input className='form-control' type='date' placeholder={'due date'} {...register("due_date")} />
                                        {errors.due_date && <span>this field is required</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table table-bordered mt-5">
                            <thead>
                                <tr>
                                    <th className='bg-dark text-white' scope="col">
                                        <div>
                                            <input className='border-0 form-control bg-dark text-white fw-bold' type='text' value={'item description'} {...register("item_name_title")} />
                                            {errors.item_name_title && <span>this field is required</span>}
                                        </div>
                                    </th>
                                    <th className='bg-dark text-white' scope="col">
                                        <div>
                                            <input className='border-0 form-control bg-dark text-white fw-bold' type='text' value={'quantity'} {...register("quantity_title")} />
                                            {errors.quantity_title && <span>this field is required</span>}
                                        </div>
                                    </th>
                                    <th className='bg-dark text-white' scope="col">
                                        <div>
                                            <input className='border-0 form-control bg-dark text-white fw-bold' type='text' value={'rate'} {...register("rate_title")} />
                                            {errors.rate_title && <span>this field is required</span>}
                                        </div>
                                    </th>
                                    <th className='bg-dark text-white' scope="col">
                                        <div>
                                            <input className='border-0 form-control bg-dark text-white fw-bold' type='text' value={'amount'} {...register("amount")} />
                                            {errors.amount && <span>this field is required</span>}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">
                                                <input name='item' onChange={(e) => handleItems(e, index)} className='form-control border-0' type='text' value={item.name} />
                                            </th>
                                            <td>
                                                <input name='quantity' onChange={(e) => handleItems(e, index)} className='form-control  border-0' type='number' placeholder={item.quantity} />
                                            </td>
                                            <td>
                                                <input name='rate' onChange={(e) => handleItems(e, index)} className='form-control  border-0' type='number' placeholder={item.rate} />
                                            </td>
                                            <td className='position-relative'>
                                                <div className="ms-2"> {item.quantity * item.rate} </div>
                                                {index > 0 && <button onClick={(e) => handleRemoveItem(e, index)} className="position-absolute top-0 end-0 btn btn-danger"> <X /> </button>}
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <button onClick={handleAddItem} className="btn mt-3 btn-success">+add item</button>
                        <div className="row">
                            <div className="col-md-7">
                            </div>
                            <div className="col-md-4">
                                <div className='d-flex mt-2'>
                                    <div className='w-50'>
                                        <input className='form-control border-0' value={'Sub Total'} {...register("sub_total_title")} />
                                        {errors.sub_total_title && <span>this field is required</span>}
                                    </div>
                                    <div className='w-75 text-end me-3'>
                                        {
                                            items.map(item => item.quantity * item.rate).reduce((total, subtotal) => total + subtotal, 0)
                                        }
                                    </div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div className='w-50'>
                                        <input className='form-control border-0' value={'Tax (%)'} {...register("tax_title")} />
                                        {errors.tax_title && <span>this field is required</span>}
                                    </div>
                                    <div className='w-75 text-end me-1'>
                                        <input className='form-control text-center' type='number' onChange={(e) => setTax(e.target.value)} defaultValue={tax} />
                                    </div>
                                    <div className='w-75 text-end me-3'>
                                        = {
                                            ((items.map(item => item.quantity * item.rate).reduce((total, subtotal) => total + subtotal, 0) * tax) / 100).toFixed(2)
                                        }
                                    </div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div className='w-25'>
                                        <input className='form-control border-0' defaultValue={'Total'} {...register("total_title")} />
                                        {errors.total_title && <span>this field is required</span>}
                                    </div>
                                    <div className='w-75 text-end '>
                                        <div className="d-flex">
                                            <div className='w-75 text-end me-1'>
                                                <input className='form-control text-center' defaultValue={'BDT'}  {...register("currency")} />
                                                {errors.currency && <span>this field is required</span>}

                                            </div>
                                            <div className='text-end w-100 me-3'>
                                                {
                                                    Number(((items.map(item => item.quantity * item.rate).reduce((total, subtotal) => total + subtotal, 0) * tax) / 100).toFixed(2)) + items.map(item => item.quantity * item.rate).reduce((total, subtotal) => total + subtotal, 0)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-7">
                                <div className='mt-2'>
                                    <div className="fw-bold">Notes: </div>
                                    <textarea className='form-control w-75' name="notes" placeholder="any relevant information not already covered" cols="30" rows="3"  {...register("notes")} ></textarea>
                                    {errors.notes && <span>this field is required</span>}
                                </div>
                                <div className='mt-2'>
                                    <div className="fw-bold">Terms and Conditions: </div>
                                    <textarea className='form-control w-75' name="notes" placeholder="any relevant information not already covered" cols="30" rows="3"  {...register("terms")} ></textarea>
                                    {errors.terms && <span>this field is required</span>}
                                </div>
                            </div>
                        </div>
                        <input type="submit" value={'generate'} className='btn btn-success px-5 mt-3' />
                    </form>
                }
                {
                    !editing &&
                    <>
                        <div className='text-center'>
                            <Image height={500} width={500} src={'/images/done.svg'} alt='free invoice generator' />
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <PDFDownloadLink style={{ color: '#fff', borderRadius: '5px', backgroundColor: '#28a745', padding: '7px 25px', textDecoration: 'none', }} document={<Invoice data={invoiceData} />} fileName={`${invoiceData?.invoice_number || 'invoice'}.pdf`}>
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                            </PDFDownloadLink>
                            <button className='btn btn-primary ms-2 px-5' onClick={() => (setEditing(true))}>Edit Again</button>
                            {/* <div style={styles.pdfContainer}>
                        <PDFViewer style={styles.pdfViewer}>
                            <Invoice data={invoiceData} />
                        </PDFViewer>
                    </div> */}
                        </div>
                    </>
                }
            </section>

        </Layout >
    )
}
