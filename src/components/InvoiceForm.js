import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style.css"
import Products from './Products'
import { db } from './firebase'
const InvoiceForm = () => {
    return (
        <div >
            <Products />
        </div>
    )
}
export default InvoiceForm