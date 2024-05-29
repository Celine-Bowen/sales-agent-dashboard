import React from 'react';
// import './UpcomingInvoices.css';cd


const UpcomingInvoices = ({ invoices }) => {
    return (
        <div className="upcoming-invoices">
            <h2>Upcoming Invoices</h2>
            <table>
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.school}</td>
                            <td>{invoice.amount}</td>
                            <td>{invoice.dueDate}</td>
                            <td><button>Collect Payment</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UpcomingInvoices;
