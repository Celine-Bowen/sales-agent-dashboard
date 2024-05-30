import React, { useState } from 'react';
import './Collections.css';


const Collections = ({ collections, onCreateCollection }) => {
 const [newCollection, setNewCollection] = useState({
   invoiceId: '',
   collectionNumber: '',
   date: '',
   amount: '',
   status: 'Valid',
 });


 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setNewCollection({ ...newCollection, [name]: value });
 };


 const handleSubmitCollection = (e) => {
   e.preventDefault();
   onCreateCollection(newCollection);
   setNewCollection({
     invoiceId: '',
     collectionNumber: '',
     date: '',
     amount: '',
     status: 'Valid',
   });
 };


 return (
   <div className="collections">
     <h3>Collections</h3>
     <table>
       <thead>
         <tr>
           <th>Invoice Number</th>
           <th>Collection Number</th>
           <th>Date of Collection</th>
           <th>Amount</th>
           <th>Status</th>
         </tr>
       </thead>
       <tbody>
         {collections.map((collection, index) => (
           <tr key={index}>
             <td>{collection.invoiceId}</td>
             <td>{collection.collectionNumber}</td>
             <td>{collection.date}</td>
             <td>{collection.amount}</td>
             <td>{collection.status}</td>
           </tr>
         ))}
       </tbody>
     </table>
     <form onSubmit={handleSubmitCollection}>
       <input
         type="text"
         name="invoiceId"
         placeholder="Invoice ID"
         value={newCollection.invoiceId}
         onChange={handleInputChange}
         required
       />
       <input
         type="text"
         name="collectionNumber"
         placeholder="Collection Number"
         value={newCollection.collectionNumber}
         onChange={handleInputChange}
         required
       />
       <input
         type="date"
         name="date"
         placeholder="Date"
         value={newCollection.date}
         onChange={handleInputChange}
         required
       />
       <input
         type="number"
         name="amount"
         placeholder="Amount"
         value={newCollection.amount}
         onChange={handleInputChange}
         required
       />
       <select
         name="status"
         value={newCollection.status}
         onChange={handleInputChange}
       >
         <option value="Valid">Valid</option>
         <option value="Bounced">Bounced</option>
       </select>
       <button type="submit">Add Collection</button>
     </form>
   </div>
 );
};


export default Collections;
