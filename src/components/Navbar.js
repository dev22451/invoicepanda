import  React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useHistory } from "react-router"
import { FcAddDatabase } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    let history = useHistory();

    const handleInvoiceForm = () => {
        history.push("/invoiceform");
    }

    const handleInvoiceReview = () => {
        history.push("/navbar")
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <h1 className="invoiceheading">Invoice Data</h1>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="col-md-6  offset-md-3 mt-5 buttonstyle ">
                    <div className="d-flex justify-content-between align-items-center mb-2 ">
                        <button type="button" className="btn-lg" onClick={handleInvoiceForm}><p><FcAddDatabase /></p>Add Invoive</button>
                        <button type="button" className="btn-lg" onClick={handleInvoiceReview}><p><FcViewDetails /></p>view Invoice</button>
                    </div>
                </div>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;