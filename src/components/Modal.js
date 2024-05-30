import React, { useState, useEffect } from 'react';
import './Modal.css';


const Modal = ({ isOpen, onClose, invoice, onUpdateInvoice }) => {
 const [updatedInvoice, setUpdatedInvoice] = useState({});


 useEffect(() => {
   setUpdatedInvoice({ ...invoice });
 }, [invoice]);


 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setUpdatedInvoice({ ...updatedInvoice, [name]: value });
 };


 const handleSubmit = (e) => {
   e.preventDefault();
   onUpdateInvoice(updatedInvoice.id, updatedInvoice);
   onClose();
 };


 return (
   <>
     {isOpen && (
       <div className="modal">
         <div className="modal-content">
           <span className="close" onClick={onClose}>&times;</span>
           <h2>Edit Invoice</h2>
           <form onSubmit={handleSubmit}>
             <div className="form-group">
               <label>Invoice Number</label>
               <input
                 type="text"
                 name="invoiceNumber"
                 value={updatedInvoice.invoiceNumber || ''}
                 onChange={handleInputChange}
                 required
               />
             </div>
             <div className="form-group">
               <label>Product Name</label>
               <input
                 type="text"
                 name="invoiceItem"
                 value={updatedInvoice.invoiceItem || ''}
                 onChange={handleInputChange}
                 required
               />
             </div>
             <div className="form-group">
               <label>Due Date</label>
               <input
                 type="date"
                 name="dueDate"
                 value={updatedInvoice.dueDate || ''}
                 onChange={handleInputChange}
                 required
               />
             </div>
             <div className="form-group">
               <label>Amount</label>
               <input
                 type="number"
                 name="amount"
                 value={updatedInvoice.amount || ''}
                 onChange={handleInputChange}
                 required
               />
             </div>
             <button type="submit">Update</button>
           </form>
         </div>
       </div>
     )}
   </>
 );
};


export default Modal;
