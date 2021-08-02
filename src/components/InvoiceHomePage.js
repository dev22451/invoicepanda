import React from 'react'
import { useHistory } from "react-router"
import { FcAddDatabase } from "react-icons/fc";
import { PlusOutlined } from '@ant-design/icons';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
const InvoiceHomePage = () => {
    let history = useHistory();

    const handleInvoiceForm = () => {
        history.push("/addinvoice");
    }

    const handleInvoiceReview = () => {
        history.push("/viewinvoice")
    }
    return (
        <div className="invoicepage">
            <h1 className="InvoiceHeading">Invoice Data</h1>
            <div className="buttonstyle">
                <div className="col-md-8  offset-md-2 mt-5 ">
                    <div className="d-flex justify-content-between align-items-center mb-2 mt-5 ">

                        <button type="button" className="btn-lg  buttonsize" onClick={handleInvoiceForm}><p><AddCircleTwoToneIcon /></p>Add Invoive</button>

                        <button type="button" className="btn-lg buttonsize" onClick={handleInvoiceReview}><p><VisibilityTwoToneIcon /></p>view Invoice</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default InvoiceHomePage