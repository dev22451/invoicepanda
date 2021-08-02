import React, { useEffect, useState } from 'react'
import { db } from "./firebase"
import PhoneIcon from '@material-ui/icons/Phone';
import PlaceIcon from '@material-ui/icons/Place';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useRouteMatch } from 'react-router';
import { Contacts } from '@material-ui/icons';


const fetch = require("node-fetch");

function ViewTable() {
    const {
        params: { id },
    } = useRouteMatch('/viewtable/:id');

    console.log(id)


    const [invoiceDataList, setInvoiceDataList] = useState([])
    const invoiceData = () => {
        db
            .collection("contacts")
            .doc(id)
            .get()
            .then((docRef) => {
                setInvoiceDataList([docRef.data()])
            })
            // { console.log(docRef.data()) }
            .catch((error) => { })
    }
    useEffect(() => {
        invoiceData()
    }, [])
    console.log([invoiceDataList])
    return (
        <div>
            <div className="row mt-2 ">
                <div className="bg-whitesmoke p-4 col-6">
                    <h4>Office Details</h4>
                    <hr />
                    {

                        invoiceDataList && invoiceDataList.map((s, index) => {
                            return (
                                <p key={index}>
                                    <AccountCircleIcon /> {s.OfficeDetails.officeName}<br />
                                    <PlaceIcon /> {s.OfficeDetails.officeAddress}<br />
                                    <PhoneIcon /> {s.OfficeDetails.phoneNo}<br />
                                    <EmailTwoToneIcon /> {s.OfficeDetails.officeEmail}


                                </p>
                            )
                        }
                        )}
                </div>
                <div className="bg-whitesmoke p-4 col-6">
                    <h4>Bill To</h4>
                    <hr />
                    {
                        invoiceDataList && invoiceDataList.map((s, index) => {
                            return (
                                <p key={index}>
                                    <AccountCircleIcon /> {s.Billto.officeName}<br />
                                    <PlaceIcon /> {s.Billto.officeAddress}<br />
                                    <PhoneIcon /> {s.Billto.phoneNo}<br />
                                    <EmailTwoToneIcon /> {s.Billto.officeEmail}
                                </p>
                            )
                        }
                        )}
                </div>
            </div>
            <br />

            <div className="row">
                <div className="bg-whitesmoke p-4 col-12">
                    <h4>Item Details</h4>
                    <hr />
                    <table className="table table-sm ">
                        <thead className="table-dark">
                            <tr>
                                <th>Product Name</th>
                                <th>Product Quantity</th>
                                <th>Product price</th>
                                <th>Discount</th>
                                <th>Discount Amount</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(invoiceDataList.invoiceData)} */}
                            {
                                invoiceDataList.map((s, index) => {
                                    return (
                                        s.invoiceData.products.map((a) => {
                                            return (
                                                console.log(a.productName),
                                                <tr key={index}>
                                                    <td>{a.productName}</td>
                                                    <td>{a.productQuantity}</td>
                                                    <td>{a.productPrice}</td>
                                                    <td>{a.discount}</td>
                                                    <td>{a.discountAmt}</td>
                                                    <td>{a.totalPrice}</td>
                                                </tr>
                                            )
                                        }
                                        )

                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col bg-whitesmoke p-4 col">
                    {

                        invoiceDataList && invoiceDataList.map((s, index) => {
                            return (
                                <span key={index}>
                                    <p>Tax Amount :  {s.invoiceData.taxAmount}</p>
                                    <p>Total Including Tax :  {s.invoiceData.TotalIncludingTax}</p>
                                </span>
                            )
                        })}
                </div>
            </div>
            <br />

            <div className="row">
                <div className="bg-whitesmoke p-4 col">
                    <h4>Pay Details</h4>
                    <hr />
                    {
                        invoiceDataList && invoiceDataList.map((s, index) => {
                            return (
                                <p key={index}>
                                    Payment Method : {s.payment.PaymentMethod}<br />
                                    Payment Account : {s.payment.PaymentAccount}<br />
                                    Pay Name :{s.payment.PayName}<br />
                                    Pay Number : {s.payment.PayNumber}
                                </p>
                            )
                        }
                        )}

                </div>
            </div>
        </div >
    )
}

export default ViewTable
