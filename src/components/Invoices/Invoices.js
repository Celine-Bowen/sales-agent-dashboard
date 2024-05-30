import React, { useState, useEffect } from 'react';
import Collections from './Collections';
import './Invoices.css';


const Invoices = () => {
   const [invoices, setInvoices] = useState([]);
   const [newInvoice, setNewInvoice] = useState({
       schoolId: '',
       invoiceItem: '',
       dueDate: '',
       amount: 0
   });
   const [selectedInvoice, setSelectedInvoice] = useState(null);


   useEffect(() => {
       fetch('http://localhost:5000/invoices')
           .then(response => response.json())
           .then(data => setInvoices(data));
   }, []);


   const addInvoice = () => {
       const invoiceNumber = `INV-${Math.random().toString(36).substr(2, 9)}`;
       const creationDate = new Date().toISOString().split('T')[0];
       const daysUntilDue = Math.floor((new Date(newInvoice.dueDate) - new Date(creationDate)) / (1000 * 60 * 60 * 24));


       const invoice = {
           id: invoices.length + 1,
           schoolId: parseInt(newInvoice.schoolId),
           invoiceNumber,
           invoiceItem: newInvoice.invoiceItem,
           creationDate,
           dueDate: newInvoice.dueDate,
           amount: newInvoice.amount,
           paidAmount: 0,
           balance: newInvoice.amount,
           status: 'Pending',
           daysUntilDue
       };


       fetch('http://localhost:5000/invoices', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(invoice)
       })
       .then(response => response.json())
       .then(data => setInvoices([...invoices, data]));


       setNewInvoice({
           schoolId: '',
           invoiceItem: '',
           dueDate: '',
           amount: 0
       });
   };


   const updateInvoice = (id, updatedInvoice) => {
       fetch(`http://localhost:5000/invoices/${id}`, {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(updatedInvoice)
       })
       .then(response => response.json())
       .then(data => {
           setInvoices(invoices.map(invoice => (invoice.id === id ? data : invoice)));
       });
   };


   const deleteInvoice = (id) => {
       fetch(`http://localhost:5000/invoices/${id}`, {
           method: 'DELETE'
       })
       .then(() => {
           setInvoices(invoices.filter(invoice => invoice.id !== id));
       });
   };


   return (
       <div className="invoices">
           <h1>Invoices</h1>
           <div className="new-invoice">
               <input
                   type="text"
                   placeholder="School ID"
                   value={newInvoice.schoolId}
                   onChange={(e) => setNewInvoice({ ...newInvoice, schoolId: e.target.value })}
               />
               <input
                   type="text"
                   placeholder="Invoice Item"
                   value={newInvoice.invoiceItem}
                   onChange={(e) => setNewInvoice({ ...newInvoice, invoiceItem: e.target.value })}
               />
               <input
                   type="date"
                   placeholder="Due Date"
                   value={newInvoice.dueDate}
                   onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
               />
               <input
                   type="number"
                   placeholder="Amount"
                   value={newInvoice.amount}
                   onChange={(e) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) })}
               />
               <button onClick={addInvoice}>Add Invoice</button>
           </div>
           <ul>
               {invoices.map(invoice => (
                   <li key={invoice.id}>
                       <div>
                           <span>Invoice Number: {invoice.invoiceNumber}</span>
                           <span>Item: {invoice.invoiceItem}</span>
                           <span>Due Date: {invoice.dueDate}</span>
                           <span>Amount: ${invoice.amount}</span>
                           <span>Paid: ${invoice.paidAmount}</span>
                           <span>Balance: ${invoice.balance}</span>
                           <span>Status: {invoice.status}</span>
                       </div>
                       <button onClick={() => setSelectedInvoice(invoice)}>View Collections</button>
                       <button onClick={() => updateInvoice(invoice.id, { ...invoice, status: 'Updated' })}>Update</button>
                       <button onClick={() => deleteInvoice(invoice.id)}>Delete</button>
                   </li>
               ))}
           </ul>
           {selectedInvoice && <Collections invoiceId={selectedInvoice.id} />}
       </div>
   );
};


export default Invoices;


