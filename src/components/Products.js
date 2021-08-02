import React, { useState } from "react"
import { db } from "./firebase"
import { NewReleases } from "@material-ui/icons";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const fetch = require("node-fetch");


const officedata = {
    officeName: '',
    officeAddress: '',
    phoneNo: '',
    officeEmail: ''
}
const Billto = {
    officeName: '',
    officeAddress: '',
    phoneNo: '',
    officeEmail: ''
}
const productItem = {
    productName: '',
    productQuantity: '',
    productPrice: '',
    discount: '',
    discountAmt: 0,
    totalPrice: 0
}

// const Invoicecal = {
//     InvoiceDate: ''
// }

// const PayeeAccount = {
//     PayeeAccount: ''
// }

// const PaymentMethod = {
//     PaymentMethod: ''
// }

// const invoiceAmount = {
//     invoiceAmount: ''
// }
const Inicialdata = {
    // OfficeDetails: { ...officedata },
    // Billto: { ...Billto },
    // InvoiceId: 1,
    // InvoiceDate: { ...Invoicecal },
    products: [
        { ...productItem }
    ],
    // taxType: 'cgst',
    // taxPercentage: '18%',
    taxAmount: 0,
    // invoiceAmount: { ...invoiceAmount },
    // PaymentMethod: { ...PaymentMethod },
    // PayeeAccount: { ...PayeeAccount },
    TotalIncludingTax: 0
}

const Products = () => {

    const [productsdiscountprice, setProductsdiscountprice] = useState('')
    const [productstotal, setProductstotal] = useState('')
    const [paymentmethod, setPaymentmethod] = useState('')
    const [payename, setPayename] = useState('')
    const [payeaccount, setPayeaccount] = useState('')
    const [payenumber, setPayenumber] = useState('')


    const [invoiceData, setInvoiceData] = useState({ ...Inicialdata })
    const [values, setValues] = useState({})

    // const handleOfficeDeatilsChange = (event) => {
    //     setValues(prevValues => ({
    //         ...prevValues,
    //         // we use the name to tell Formik which key of `values` to update
    //         [event.target.name]: event.target.value
    //     }))
    // }

    // db.collection("contacts")
    //     .get()
    //     .then(snap => {
    //         snap.forEach(doc => {
    //             // console.log(doc.data());
    //             // console.log(doc.id);
    //         });
    //     });

    // const handlesubmit = (e) => {
    //     e.preventDefault();
    // db.collection('contacts').add({
    //     Inicialdata
    // })
    //     .then(() => {
    //         alert("message has been submmitted")
    //     })
    //     .catch((error) => {
    //         alert('error .message');
    //     })
    // setInvoiceData('')
    // }

    const addNewProdct = () => {
        //add new item in array of object max 5


        const newData = { ...invoiceData }
        newData.products.push({ ...productItem })
        // console.log(newData)
        //setstate
        setInvoiceData(newData)

    }

    const removeProduct = (index) => {
        // remove an index from array of object javascript
        const newData = { ...invoiceData }
        if (index !== 0) {
            newData.products.splice(index, 1)
            setInvoiceData(newData)
        }
    }

    // const handleChange = (e, index) => {
    //     // console.log({ e }, e.target.name, e.target.value)
    //     const newData = { ...invoiceData };
    //     newData[e.target.name] = e.target.value;
    //     // console.log({ newData })

    //     setInvoiceData(newData)
    // }

    // const handleOfficeDeatilsChange = (e) => {
    //     const newData = { ...invoiceData };
    //     newData.OfficeDetails[e.target.name] = e.target.value;
    //     console.log({ newData })

    //     setInvoiceData(newData)
    // }

    // const handlePayeeAccountChange = (e) => {
    //     const newData = { ...invoiceData };
    //     newData.PayeeAccount[e.target.name] = e.target.value;
    //     // console.log({ newData })

    //     setInvoiceData(newData)
    // }

    // const handleBillToChange = (e, index) => {
    //     const newData = { ...invoiceData };
    //     newData.Billto[e.target.name] = e.target.value;
    //     // console.log({ newData })

    //     setInvoiceData(newData)

    // }


    // const handlePayementMethodChange = (e) => {
    //     // console.log({ e }, e.target.name, e.target.value)
    //     const newData = { ...invoiceData };
    //     newData.PaymentMethod[e.target.name] = e.target.value;
    //     // console.log({ newData })

    //     setInvoiceData(newData)

    // }

    const handleChangeDetailsItem = (index, e) => {
        const newData = { ...invoiceData };
        newData.products[index] = {
            ...newData.products[index],
            [e.target.name]: e.target.value
        }
        let productPrice = 0
        let discountAmount = 0


        if (e.target.name === "discount" || e.target.name === "productQuantity" || e.target.name === "productPrice") {

            discountAmount =
                ((newData.products[index].productQuantity * newData.products[index].productPrice) * (newData.products[index].discount / 100))

            productPrice =
                (newData.products[index].productQuantity * newData.products[index].productPrice) - discountAmount


            newData.products[index].discountAmt = discountAmount.toString()
            newData.products[index].totalPrice = productPrice.toString()
        }
        setInvoiceData(newData)

    }

    // const handleInvoiceDateChange = (e) => {
    //     // console.log({ e }, e.target.name, e.target.value)
    //     const newData = { ...invoiceData };
    //     newData.InvoiceDate[e.target.name] = e.target.value;
    //     // console.log({ newData })

    //     setInvoiceData(newData)
    // }

    const handleTotalIncludingTaxChange = () => {
        const newData = { ...invoiceData };

        let totaltaxprice = 0
        let taxAmountPrice = 0
        let TotalIncludingPrice = 0
        //map products form new data and add total amount in  variable 
        {
            newData.products.map((totalPrice) => {
                totaltaxprice = parseFloat(totalPrice.totalPrice) + parseFloat(totaltaxprice)
                taxAmountPrice = (totaltaxprice * 18) / 100
                TotalIncludingPrice = totaltaxprice + taxAmountPrice

            })
            // setInvoiceData(newData.TotalIncludingTax = TotalIncludingPrice)
            // console.log(TotalIncludingPrice)
            return TotalIncludingPrice

        }

        // console.log(totalIncludingPrice)
        //save total amount that is tax amount  +  sum of total price(variable amount)in new data
        setInvoiceData(newData)
    }

    const handleTotalTaxChange = () => {
        const newData = { ...invoiceData }
        let tax = 0
        let totaltaxAmount = 0
        //map products form new data and add total amount in  variable 
        {
            newData.products.map((totalPrice) => {
                totaltaxAmount = (parseFloat(totalPrice.totalPrice) + parseFloat(totaltaxAmount))
                tax = (totaltaxAmount * 18) / 100
            })

            // setInvoiceData([{ taxAmount: tax }])
            // console.log(tax)
            return tax
        }

    }
    console.log(invoiceData)


    const formik = useFormik({
        initialValues: {
            officeName: '',
            officeAddress: '',
            phoneNo: '',
            officeEmail: '',
            BofficeName: '',
            BofficeAddress: '',
            BphoneNo: '',
            BofficeEmail: '',
            PaymentMethod: '',
            PaymentAccount: '',
            PayName: '',
            PayNumber: '',

        },
        validationSchema: Yup.object({
            officeName: Yup.string()
                .max(50, 'Must be 15 characters or less')
                .required('Enter your office name'),
            officeAddress: Yup.string()
                .max(500, 'Must be 500 characters or less')
                .required('Enter your office address'),
            officeEmail: Yup.string()
                .email('Invalid email address')
                .required('Enter a valid email address'),
            phoneNo: Yup.string()
                .max(10, 'Must be 10 characters or less')
                .required('Enter a valid phone number'),
            BofficeName: Yup.string()
                .max(50, 'Must be 15 characters or less')
                .required('Enter your office name'),
            BofficeAddress: Yup.string()
                .max(500, 'Must be 500 characters or less')
                .required('Enter your office address'),
            BofficeEmail: Yup.string()
                .email('Invalid email address')
                .required('Enter a valid email address'),
            BphoneNo: Yup.string()
                .max(10, 'Must be 10 characters or less')
                .required('Enter a valid phone number'),
            PaymentMethod: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Enter your payment method'),
            PaymentAccount: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Enter your payment account'),
            PayName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Enter your Pay Name'),
            PayNumber: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Enter your Pay Number'),

        }),
        onSubmit: values => {

            let data = {
                Billto: {
                    officeName: values.BofficeName,
                    officeAddress: values.BofficeAddress,
                    phoneNo: values.BphoneNo,
                    officeEmail: values.BofficeEmail
                },
                OfficeDetails: {
                    officeName: values.officeName,
                    officeAddress: values.officeAddress,
                    phoneNo: values.phoneNo,
                    officeEmail: values.officeEmail
                },
                payment: {
                    PaymentMethod: values.PaymentMethod,
                    PaymentAccount: values.PaymentAccount,
                    PayName: values.PayName,
                    PayNumber: values.PayNumber
                },
            }
            alert(JSON.stringify(values, null, 2));
            console.log(data)
            db.collection('contacts').add({
                Billto: {
                    officeName: values.BofficeName,
                    officeAddress: values.BofficeAddress,
                    phoneNo: values.BphoneNo,
                    officeEmail: values.BofficeEmail
                },
                OfficeDetails: {
                    officeName: values.officeName,
                    officeAddress: values.officeAddress,
                    phoneNo: values.phoneNo,
                    officeEmail: values.officeEmail
                },

                payment: {
                    PaymentMethod: values.PaymentMethod,
                    PaymentAccount: values.PaymentAccount,
                    PayName: values.PayName,
                    PayNumber: values.PayNumber
                },
                invoiceData
            })
                .then(() => {
                    alert("message has been submmitted")
                })
                .catch((error) => {
                    alert('error .message');
                })

            console.log(setInvoiceData)
        },
    });
    return (
        <div className="row  bg-whitesmoke formcss">
            <div >
                <form className="from" onSubmit={formik.handleSubmit}>
                    <div>
                        <h1 className="text-center my-4"> Invoice</h1>
                    </div>

                    <div className=" g-5 mt-2">
                        <div className="col-md-12">
                            {/* <div className="d-flex"> */}
                            <div className="head">
                                <div className="bg-white p-4 officeDetails">
                                    <h4 className="office">Office Details Bill From</h4>
                                    <hr className="new1" />
                                    <div className="form-group row">
                                        {/* <div className="col-sm-6"> */}
                                        <div className="col">
                                            <label for="company-name" className="col-sm col-form-label text-muted">Company Name</label>
                                            <input type="text" className="form-control form-control-sm 
                                            border-top" id="company-name"
                                                // placeholder="Company Name"
                                                name="officeName"
                                                // value={formik.values.officeName}
                                                // onChange={formik.handleOfficeDeatilsChange}
                                                {...formik.getFieldProps('officeName')}
                                            />
                                            {formik.touched.officeName && formik.errors.officeName ? (
                                                <div className="error">*{formik.errors.officeName}</div>
                                            ) : null}
                                        </div>

                                        {/* <div className="form-group row"> */}
                                        {/* <div className="col-sm-6"> */}


                                        {/* <div className="col-sm-6"> */}
                                        <div className="col">
                                            <label for="phone" className="col-sm col-form-label text-muted">Phone Number</label>
                                            <input type="text" className="form-control form-control-sm" id="phone" autoComplete="off"
                                                // placeholder="Phone Number"
                                                name="phoneNo"
                                                // value={formik.values.phoneNo}
                                                // onChange={formik.handleOfficeDeatilsChange}
                                                {...formik.getFieldProps('phoneNo')}
                                            />
                                            {formik.touched.phoneNo && formik.errors.phoneNo ? (
                                                <div className="error">*{formik.errors.phoneNo}</div>
                                            ) : null}
                                        </div>

                                        {/* <div className="form-group row"> */}
                                        {/* <div className="col-sm-6"> */}
                                        <div className="col">
                                            <label for="email" className="col-sm col-form-label text-muted"> Email</label>
                                            <input type="email" className="form-control form-control-sm" id="email" autoComplete="off"
                                                // placeholder="Email"
                                                name="officeEmail"
                                                // value={formik.values.officeEmail}
                                                // onChange={formik.handleOfficeDeatilsChange}
                                                {...formik.getFieldProps('officeEmail')}
                                            // onChange={(e) => setComemail(e.target.value)}

                                            />
                                            {formik.touched.officeEmail && formik.errors.officeEmail ? (
                                                <div className="error">*{formik.errors.officeEmail}</div>
                                            ) : null}
                                        </div>

                                        <div className="col">
                                            <label for="company-address" className="col-sm col-form-label text-muted">Company Address</label>
                                            <textarea className="form-control form-control-sm" id="company-address"
                                                // placeholder="Company Address"
                                                name="officeAddress"
                                                // value={formik.values.officeAddress}
                                                // onChange={formik.handleOfficeDeatilsChange}
                                                {...formik.getFieldProps('officeAddress')}
                                            />
                                            {formik.touched.officeAddress && formik.errors.officeAddress ? (
                                                <div className="error">*{formik.errors.officeAddress}</div>
                                            ) : null}

                                        </div><br />
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="col-md-12 bg-whitesmoke p-4  productdata">
                        <h4 className="products">Item</h4>
                        <hr className="new1" />
                        {/** use map in prodct of invoice */}
                        {invoiceData.products.length && invoiceData.products.map((instance, index) => {
                            // console.log({ instance }, { index })
                            const removeProductItem = () => removeProduct(index)
                            const handleProductsDetailsChange = (e) => handleChangeDetailsItem(index, e)

                            return (
                                <div className="row Addproduct">
                                    <div className="col">
                                        {/* <label for="products-name" className="label-form mb-1 text-muted control">Products Name</label> */}
                                        <input type="text" className="form-control form-control-sm" id="products-name"
                                            placeholder="Products Name"
                                            name="productName"
                                            value={instance.productName}
                                            onChange={handleProductsDetailsChange}
                                        // onChange={(e) => setProductsname(e.target.value)}
                                        />

                                    </div>
                                    <div className="col">
                                        {/* <label for="products-quantity" className="label-form mb-1 text-muted control">Products Quantity</label> */}
                                        <input type="number" className="form-control form-control-sm" id="products-quantity"
                                            placeholder="Products Quantity" min="0" max="5"
                                            name="productQuantity"
                                            value={instance.productQuantity}
                                            onChange={handleProductsDetailsChange}
                                        />

                                    </div>
                                    {/* </div> */}
                                    {/* <div className="row"> */}
                                    <div className="col">
                                        {/* <label for="products-price" className="label-form mb-1 text-muted control">Products Price</label> */}
                                        <input type="phone" className="form-control form-control-sm" id="products-price"
                                            placeholder="Products price"
                                            name="productPrice"
                                            value={instance.productPrice}
                                            onChange={handleProductsDetailsChange}
                                        />

                                    </div>
                                    <div className="col">
                                        <input type="phone" className="form-control form-control-sm" id="discount"
                                            placeholder="Discount %"
                                            name="discount"
                                            value={instance.discount}
                                            onChange={handleProductsDetailsChange}
                                        />
                                    </div>

                                    <div className="col">
                                        {/* <label for="discount-amount" className="label-form mb-1 text-muted control">Discount Amount</label> */}
                                        <input type="phone" className="form-control form-control-sm" id="discount-amount"
                                            placeholder="Discount Amount"
                                            name="discountAmt"
                                            value={instance.discountAmt}
                                            onChange={handleProductsDetailsChange}
                                            disabled

                                        />
                                    </div>
                                    <div className="col">
                                        {/* <label for="total-price" className="label-form mb-1 text-muted control">Total Price</label> */}
                                        <input type="phone" className="form-control form-control-sm" id="total-price"
                                            placeholder="Total price"
                                            name="totalPrice"
                                            value={instance.totalPrice}
                                            onChange={handleProductsDetailsChange}
                                            disabled

                                        />
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-danger btn-sm" onClick={removeProductItem}>Remove</button>
                                    </div>
                                </div>
                            )
                        })}
                        <hr className="new1" />
                        <div className="addstyle">
                            <button type="button" className="btn btn-success btn-sm addbutton" onClick={addNewProdct}>Add</button>
                        </div>


                        <div className="taxdata">
                            <div className="form-group row">
                                <label for="tax" className="col-sm col-form-label ml-2">Tax</label>
                                <div className="col-sm-2">
                                    <input type="text" className="form-control form-control-sm mt-1" id="tax"
                                        name="taxAmount"
                                        value={invoiceData.taxAmount = handleTotalTaxChange()}
                                        onChange={handleTotalTaxChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="totaltax">
                            <div className="form-group row ">
                                <label for="totaltax" className="col-sm col-form-label ml-2 totalfont">Total Including Tax</label>
                                <div className="col-sm-2">
                                    <input type="text" className="form-control form-control-sm mt-1" id="totaltax"
                                        name="TotalIncludingTax"
                                        value={invoiceData.TotalIncludingTax = handleTotalIncludingTaxChange()}
                                        onChange={handleTotalIncludingTaxChange}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="col-md-12">
                        <div className="bg-whitesmoke p-4 Billto">
                            <h4 className="bill">Bill To</h4>
                            <hr className="mb-2" />
                            <div className="form-group row">
                                <div className="col">
                                    <label for="Bcompany-name" className="col-sm col-form-label text-muted">Company Name</label>
                                    {/* <div className="col-sm-6"> */}
                                    <input type="text" className="form-control form-control-sm" id="Bcompany-name"
                                        name="officeName"
                                        // value={formik.values.officeName}
                                        // onChange={formik.handleBillToChange}
                                        {...formik.getFieldProps('BofficeName')}
                                    />
                                    {formik.touched.BofficeName && formik.errors.BofficeName ? (
                                        <div className="error">*{formik.errors.BofficeName}</div>
                                    ) : null}
                                </div>
                                <br />

                                <div className="col">
                                    <label for="Bphone" className="col-sm col-form-label text-muted">Phone Number</label>
                                    {/* <div className="col-sm-6"> */}
                                    <input type="phone" className="form-control form-control-sm" id="Bphone"
                                        autoComplete="off"
                                        name="phoneNo"
                                        // value={formik.values.phoneNo}
                                        // onChange={formik.handleBillToChange}
                                        // onChange={(e) => setComphone(e.target.value)}
                                        {...formik.getFieldProps('BphoneNo')}
                                    />
                                    {formik.touched.BphoneNo && formik.errors.BphoneNo ? (
                                        <div className="error">*{formik.errors.BphoneNo}</div>
                                    ) : null}
                                </div>
                                <br />
                                {/* <div className="form-group row"> */}
                                <div className="col">
                                    <label for="Bemail" className="col-sm col-form-label text-muted">Email</label>
                                    {/* <div className="col-sm-6"> */}
                                    <input type="email" className="form-control form-control-sm" id="Bemail"
                                        autoComplete="off"
                                        name="officeEmail"
                                        // value={formik.values.officeEmail}
                                        // onChange={formik.handleBillToChange}
                                        {...formik.getFieldProps('BofficeEmail')}
                                    />
                                    {formik.touched.BofficeEmail && formik.errors.BofficeEmail ? (
                                        <div className="error">*{formik.errors.BofficeEmail}</div>
                                    ) : null}
                                </div>
                                <div className="col">
                                    <label for="Bcompany-address" className="col-sm col-form-label text-muted">Company Address</label>
                                    {/* <div className="col-sm-6"> */}

                                    <textarea className="form-control form-control-sm" id="Bcompany-address"
                                        name="officeAddress"
                                        // value={formik.values.officeAddress}
                                        // onChange={formik.handleBillToChange}
                                        // onChange={(e) => setComadd(e.target.value)}
                                        {...formik.getFieldProps('BofficeAddress')}
                                    />
                                    {formik.touched.BofficeAddress && formik.errors.BofficeAddress ? (
                                        <div className="error">*{formik.errors.BofficeAddress}</div>
                                    ) : null}
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    {/* <div className="table-responsive mt-5">
                            
                            <table className="table table-sm  table-hover  caption-top">
                                <thead>

                                    <tr>
                                        <th className="first" >Invoice#</th>
                                        <th className="second">Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <td><span>HPPL21001</span></td>
                                    <td><input type="date"
                                        name="InvoiceDate"
                                        value={invoiceData.InvoiceDate.InvoiceDate}
                                        onChange={handleInvoiceDateChange} /></td>
                                </tbody>
                            </table>

                        </div> */}





                    <div className="col-md-12 bg-whitesmoke p-4 paymentdetails ">
                        <h4 className="bill">Payment Details</h4>
                        <hr className="new1" />
                        <div className="form-group row ">
                            <div className="col">
                                <label for="method" className="col-sm col-form-label text-muted">Method</label>
                                {/* <div className="col-sm-6"> */}
                                <input type="text" className="form-control form-control-sm" id="method"
                                    name="PaymentMethod"
                                    // value={formik.values.PaymentMethod}
                                    // onChange={formik.handlePayementMethodChange}
                                    {...formik.getFieldProps('PaymentMethod')}
                                />
                                {formik.touched.PaymentMethod && formik.errors.PaymentMethod ? (
                                    <div className="error">*{formik.errors.PaymentMethod}</div>
                                ) : null}
                            </div>

                            <div className="col">
                                <label for="payeeacount" className="col-sm col-form-label text-muted">Payee Account</label>
                                {/* <div className="col-sm-6"> */}

                                <input type="text" className="form-control form-control-sm" id="payeacount"
                                    name="PayeeAccount"
                                    // value={formik.values.PayeeAccount}
                                    // onChange={handlePayeeAccountChange}
                                    // onChange={(e) => setPayeaccount(e.target.value)}
                                    {...formik.getFieldProps('PaymentAccount')}
                                />
                                {formik.touched.PaymentAccount && formik.errors.PaymentAccount ? (
                                    <div className="error">*{formik.errors.PaymentAccount}</div>
                                ) : null}
                                {/* </div> */}
                            </div>
                            <div className="col">
                                <label for="payname" className="col-sm col-form-label text-muted">Payee Name</label>
                                {/* <div className="col-sm-6"> */}

                                <input type="text" className="form-control form-control-sm" id="payname"
                                    //  name="PaymentMethod"
                                    //  value={invoiceData.PaymentMethod.PaymentMethod}
                                    //  onChange={handlePayementMethodChange}
                                    // onChange={(e) => setPayename(e.target.value)} 
                                    {...formik.getFieldProps('PayName')}
                                />
                                {formik.touched.PayName && formik.errors.PayName ? (
                                    <div className="error">*{formik.errors.PayName}</div>
                                ) : null}
                                {/* </div> */}
                            </div>
                            <div className="col">
                                <label for="paynumber" className="col-sm col-form-label text-muted">Payee Number</label>
                                {/* <div className="col-sm-6"> */}
                                <input type="phone" className="form-control form-control-sm" id="paynumber"
                                    name="payenumber"
                                    // value={payenumber}

                                    {...formik.getFieldProps('PayNumber')}
                                />
                                {formik.touched.PayNumber && formik.errors.PayNumber ? (
                                    <div className="error">*{formik.errors.PayNumber}</div>
                                ) : null}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="d-flex justify-content-between align-items-center mb-2 ">

                        <button className="btn btn-primary" type="button" >Cancel</button>
                        <button className="btn btn-primary" type="submit">Submit</button>

                    </div>
                </form>

            </div>
            {/* <div>
                <Pdf targetRef={ref} filename="code-example.pdf">
                    {({ toPdf }) => <button onClick={toPdf}>Download Pdf</button>}
                </Pdf>

            </div> */}
        </div >

    )
}
export default Products