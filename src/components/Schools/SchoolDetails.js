import React, { useEffect, useState } from "react";
import "./SchoolDetails.css";


const SchoolDetails = ({ school }) => {
 const [invoices, setInvoices] = useState([]);
 const [collections, setCollections] = useState([]);
 const [newCollection, setNewCollection] = useState({
   // invoice: "",
   invoiceNumber: "",
   collectionNumber: "",
   date: "",
   amount: "",
   status: "Valid", // Default status
 });


 useEffect(() => {
   if (school) {
     fetch(`http://localhost:5000/invoices?schoolId=${school.id}`)
       .then((response) => response.json())
       .then((data) => setInvoices(data));


     fetch(`http://localhost:5000/collections?schoolId=${school.id}`)
       .then((response) => response.json())
       .then((data) => setCollections(data));
   }
 }, [school]);


 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setNewCollection({ ...newCollection, [name]: value });
 };


 const handleSubmitCollection = (e) => {
   e.preventDefault();
   // Attach the school ID to the new collection data
   const newCollectionData = { ...newCollection, schoolId: school.id };
   // Send new collection data to the backend
   fetch("http://localhost:5000/collections", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newCollectionData),
   })
     .then((response) => response.json())
     .then((data) => {
       // Update state with the newly created collection
       setCollections([...collections, data]);
       // Reset the form fields
       setNewCollection({
         invoiceNumber: "",
         collectionNumber: "",
         date: "",
         amount: "",
         status: "Valid", // Default status
       });
     })
     .catch((error) => console.error("Error adding collection:", error));
 };


 return (
   <div className="school-details">
     <h2>{school.name}</h2>
     {/* School details display */}
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
               <td>{collection.invoiceNumber}</td>
               <td>{collection.collectionNumber}</td>
               <td>{collection.date}</td>
               <td>{collection.amount}</td>
               <td>{collection.status}</td>
             </tr>
           ))}
         </tbody>
       </table>
       {/* Form to add new collection */}
       <form className="form-container" onSubmit={handleSubmitCollection}>
         <div className="form-group">
           <label className="form-label" htmlFor="invoiceNumber">
             Invoice Number:
           </label>
           <input
             type="text"
             id="invoiceNumber"
             name="invoiceNumber"
             className="input-field"
             placeholder="Invoice Number"
             value={newCollection.invoiceNumber}
             onChange={handleInputChange}
             required
           />
         </div>
         <div className="form-group">
           <label className="form-label" htmlFor="collectionNumber">
             Collection Number:
           </label>
           <input
             type="text"
             id="collectionNumber"
             name="collectionNumber"
             className="input-field"
             placeholder="Collection Number"
             value={newCollection.collectionNumber}
             onChange={handleInputChange}
             required
           />
         </div>
         <div className="form-group">
           <label className="form-label" htmlFor="date">
             Date:
           </label>
           <input
             type="date"
             id="date"
             name="date"
             className="input-field"
             placeholder="Date"
             value={newCollection.date}
             onChange={handleInputChange}
             required
           />
         </div>
         <div className="form-group">
           <label className="form-label" htmlFor="amount">
             Amount:
           </label>
           <input
             type="number"
             id="amount"
             name="amount"
             className="input-field"
             placeholder="Amount"
             value={newCollection.amount}
             onChange={handleInputChange}
             required
           />
         </div>
         <div className="form-group">
           <label className="form-label" htmlFor="status">
             Status:
           </label>
           <select
             id="status"
             name="status"
             className="select-field"
             value={newCollection.status}
             onChange={handleInputChange}
           >
             <option value="Valid">Valid</option>
             <option value="Bounced">Bounced</option>
           </select>
         </div>
         <button type="submit" className="submit-btn">
           Add Collection
         </button>
       </form>
     </div>
   </div>
 );
};


export default SchoolDetails;


