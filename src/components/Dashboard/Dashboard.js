import React, { useState } from "react";
import "./Dashboard.css";
import { PieChart, Pie, Cell, Tooltip, Legend as PieLegend } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend as BarLegend } from "recharts";
import Modal from "../Modal";
import Collections from "../Invoices/Collections";


const COLORS = ["#0088FE", "#00C49F"];


const Dashboard = ({
 schools = [], // Default to empty array if schools is undefined
 invoices,
 pieChartData,
 barChartData,
 totalRevenue,
 bouncedCheques,
 signUps,
 onUpdateInvoice,
 onDeleteInvoice,
 onCreateInvoice,
 collections = [],
 onCreateCollection,
}) => {
 const [selectedSchoolId, setSelectedSchoolId] = useState(schools[0]?.id || ""); // Handle empty schools array


 const handleSchoolChange = (e) => {
   setSelectedSchoolId(e.target.value);
 };


 const [newInvoice, setNewInvoice] = useState({
   schoolId: "",
   invoiceItem: "",
   dueDate: "",
   amount: "",
   invoiceNumber: "",
 });
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedInvoice, setSelectedInvoice] = useState(null);


 const handleOpenModal = (invoice) => {
   setSelectedInvoice(invoice);
   setIsModalOpen(true);
 };


 const handleCloseModal = () => {
   setSelectedInvoice(null);
   setIsModalOpen(false);
 };


 const handleInputChange = (e) => {
   const { name, value } = e.target;
   const newValue = name === "amount" ? parseFloat(value) : value;
   setNewInvoice({ ...newInvoice, [name]: newValue });
 };


 const handleCreateInvoice = (e) => {
   e.preventDefault();
   onCreateInvoice(newInvoice);
   setNewInvoice({
     schoolId: "",
     invoiceItem: "",
     dueDate: "",
     amount: "",
     invoiceNumber: "",
   });
 };


 return (
   <div className="dashboard">
     {/* Render modal */}
     {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal} invoice={selectedInvoice} onUpdateInvoice={onUpdateInvoice} /> */}
     <div className="school-selector">
       {/* <label htmlFor="school-select">Select School:</label> */}
       {/* <select id="school-select" onChange={handleSchoolChange} value={selectedSchoolId}>
         {schools.map((school) => (
           <option key={school.id} value={school.id}>
            
           </option>
         ))}
       </select> */}
     </div>
     <div className="top-cards">
       <div className="card">
         <h3>Collections/Invoices</h3>
         <p>{invoices.length}</p>
       </div>
       <div className="card">
         <h3>Sign-ups/Schools</h3>
         <p>{signUps}</p>
       </div>
       <div className="card">
         <h3>Total Revenue</h3>
         <p>Ksh.{totalRevenue}</p>
       </div>
       <div className="card">
         <h3>Bounced Cheques</h3>
         <p>{bouncedCheques}</p>
       </div>
     </div>
     <div className="charts">
       <div className="chart">
         <h3>Signup Targets</h3>
         <PieChart width={400} height={400}>
           <Pie
             data={pieChartData}
             dataKey="value"
             nameKey="name"
             cx="50%"
             cy="50%"
             outerRadius={100}
             fill="#8884d8"
           >
             {pieChartData.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
             ))}
           </Pie>
           <Tooltip />
           <PieLegend />
         </PieChart>
       </div>
       <div className="chart">
         <h3>Signups Overview</h3>
         <BarChart width={600} height={300} data={barChartData}>
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="schoolType" />
           <YAxis />
           <Tooltip />
           <BarLegend />
           <Bar dataKey="analytics" fill="#8884d8" />
           <Bar dataKey="finance" fill="#82ca9d" />
           <Bar dataKey="timetable" fill="#ffc658" />
         </BarChart>
       </div>
     </div>
     <div className="upcoming-invoices">
       <h3>Upcoming Invoices</h3>
       <ul>
         {invoices.map((invoice, index) => (
           <li key={index} className="invoice-item">
             <div className="invoice-info">
               <span className="invoice-number">{invoice.invoiceNumber}</span>
               <span className="invoice-item-name">{invoice.invoiceItem}</span>
               <span className="invoice-amount">{invoice.amount}</span>
               <span className="invoice-due-date">{invoice.dueDate}</span>
               <button className="update-button" onClick={() => handleOpenModal(invoice)}>
                 Update
               </button>
               <button className="delete-button" onClick={() => onDeleteInvoice(invoice.id)}>
                 Delete
               </button>
             </div>
           </li>
         ))}
       </ul>
       <Modal
         isOpen={isModalOpen}
         onClose={handleCloseModal}
         invoice={selectedInvoice}
         onUpdateInvoice={onUpdateInvoice}
       />
     </div>


     <div className="create-invoice">
       <h3>Create New Invoice</h3>
       <form onSubmit={handleCreateInvoice} className="invoice-form">
         <div className="form-group">
           <label htmlFor="invoiceNumber">Invoice Number</label>
           <input
             type="text"
             id="invoiceNumber"
             name="invoiceNumber"
             placeholder="Invoice Number"
             value={newInvoice.invoiceNumber}
             onChange={handleInputChange}
             required
           />
         </div>
         <div className="form-group">
           <label htmlFor="invoiceItem">Product Name</label>
           <input
             type="text"
             id="invoiceItem"
             name="invoiceItem"
             placeholder="Product Name"
             value={newInvoice.invoiceItem}
             onChange={handleInputChange}
             required
           />
         </div>
         <div className="form-group">
           <label htmlFor="dueDate">Due Date</label>
           <input
             type="date"
             id="dueDate"
             name="dueDate"
             placeholder="Due Date"
             value={newInvoice.dueDate}
             onChange={handleInputChange}
             required
           />
         </div>
         <div className="form-group">
           <label htmlFor="amount">Amount</label>
           <input
             type="number"
             id="amount"
             name="amount"
             placeholder="Amount"
             value={newInvoice.amount}
             onChange={handleInputChange}
             required
           />
         </div>
         <button type="submit" className="submit-btn">
           Post
         </button>
       </form>
     </div>


     {/* <Collections
       collections={collections.filter((collection) => collection.schoolId === selectedSchoolId)}
       onCreateCollection={(newCollection) =>
         onCreateCollection({ ...newCollection, schoolId: selectedSchoolId })
       }
     /> */}
   </div>
 );
};


export default Dashboard;
