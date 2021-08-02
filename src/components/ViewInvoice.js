import React, { useEffect, useState } from 'react'
import { db } from "./firebase"
import { useHistory } from "react-router"
import VisibilityIcon from '@material-ui/icons/Visibility';
import ViewTable from './ViewTable';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const fetch = require("node-fetch");


const ViewInvoice = (s) => {
    const [invoiceDataList, setInvoiceDataList] = useState([])
    let history = useHistory();


    const handleInvoiceForm = (id) => {

        history.push(`/viewtable/${id}`)
        // return (
        //     < ViewTable id={id} />
        // )
        console.log(id)
    }
    useEffect(() => {
        // const db = firebase.firestore();
        return db.collection('contacts').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
            // <------
            setInvoiceDataList(postData);
        });
    }, []);

    return (
        <div>
            <h4 className="text-center my-4"> List of  Invoice</h4>
            <table class="table table-striped table-hover ">
                <thead>
                    <tr>
                        <th>Invoice Id </th>
                        <th ><span className="totalview">Total Price </span></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        invoiceDataList && invoiceDataList.map((s, index) => {
                            return (
                                <tr key={index} >
                                    {/* <div className="row" onClick={handleInvoiceForm}> */}
                                    <td id={s.id}>{s.id}</td>
                                    <td><span className="totalview">{s.invoiceData.TotalIncludingTax}</span></td>
                                    {/* </div> */}
                                    <td><span className="viewtable" onClick={() => handleInvoiceForm(s.id)} > <VisibilityIcon /></span></td>
                                </tr>

                            )
                        })
                    }
                </tbody>
            </table>
        </div >

    )
}

export default ViewInvoice