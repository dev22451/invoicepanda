import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InvoiceForm from './InvoiceForm';
import InvoiceHomePage from './InvoiceHomePage';
import ViewTable from './ViewTable'
import ViewInvoice from './ViewInvoice';
// import { PDFViewer } from '@react-pdf/renderer';

function Address() {
    return (
        <div className="invoicemainclass">
            <Router>

                <Switch>
                    <Route exact path="/">
                        <InvoiceHomePage />
                    </Route>
                    <Route exact path="/addinvoice">
                        {/* <ViewTable /> */}
                        <InvoiceForm />
                    </Route>
                    <Route exact path="/viewinvoice">
                        <ViewInvoice />
                    </Route>
                    <Route exact path="/viewtable/:id">
                        <ViewTable />
                    </Route>
                </Switch>
            </Router>
        </div >
    );
}

export default Address;