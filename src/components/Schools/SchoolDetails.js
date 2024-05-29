import React, { useEffect, useState } from 'react';
import './SchoolDetails.css';

const SchoolDetails = ({ school }) => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        if (school) {
            fetch(`http://localhost:5000/invoices?schoolId=${school.id}`)
                .then(response => response.json())
                .then(data => setInvoices(data));
        }
    }, [school]);

    return (
        <div className="school-details">
            <h2>{school.name}</h2>
            <div className="detail-item">
                <label>Type:</label>
                <span>{school.type}</span>
            </div>
            <div className="detail-item">
                <label>Product:</label>
                <span>{school.product}</span>
            </div>
            <div className="detail-item">
                <label>County:</label>
                <span>{school.county}</span>
            </div>
            <div className="detail-item">
                <label>Registration Date:</label>
                <span>{school.registrationDate}</span>
            </div>
            <div className="detail-item">
                <label>Contact:</label>
                <span>{school.contact}</span>
            </div>
            <div className="detail-item">
                <label>Balance:</label>
                <span>{school.balance}</span>
            </div>
            <div className="invoices">
                <h3>Invoices</h3>
                <ul>
                    {invoices.map((invoice, index) => (
                        <li key={index}>
                            <div className="invoice-info">
                                <span>{invoice.invoiceNumber}</span>
                                <span>{invoice.invoiceItem}</span>
                                <span>{invoice.amount}</span>
                                <span>{invoice.dueDate}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SchoolDetails;
