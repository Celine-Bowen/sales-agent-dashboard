import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Schools from './components/Schools/Schools';
import Collections from './components/Invoices/Collections';
import Modal from './components/Modal';
import './App.css';


function App() {
   const [schools, setSchools] = useState([]);
   const [invoices, setInvoices] = useState([]);
   const [pieChartData, setPieChartData] = useState([]);
   const [barChartData, setBarChartData] = useState([]);
   const [totalRevenue, setTotalRevenue] = useState(0);
   const [bouncedCheques, setBouncedCheques] = useState(0);
   const [signUps, setSignUps] = useState(0);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedInvoice, setSelectedInvoice] = useState(null);
  


   useEffect(() => {
       fetch('http://localhost:5000/schools')
           .then(response => response.json())
           .then(data => setSchools(data));


       fetch('http://localhost:5000/invoices')
           .then(response => response.json())
           .then(data => setInvoices(data));


       fetch('http://localhost:5000/pieChartData')
           .then(response => response.json())
           .then(data => setPieChartData(data));


       fetch('http://localhost:5000/barChartData')
           .then(response => response.json())
           .then(data => setBarChartData(data));
   }, []);


   useEffect(() => {
       const updatedTotalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
       setTotalRevenue(updatedTotalRevenue);
      
       const updatedBouncedCheques = invoices.filter(invoice => invoice.status === 'Bounced').length;
       setBouncedCheques(updatedBouncedCheques);
  
       setSignUps(schools.length);
   }, [invoices, schools]);


   const handleUpdateInvoice = (id, updatedInvoiceData) => {
       // Convert the amount to an integer
       updatedInvoiceData.amount = parseInt(updatedInvoiceData.amount);
      
       fetch(`http://localhost:5000/invoices/${id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(updatedInvoiceData),
       })
         .then(response => {
           if (response.ok) {
             // If the update is successful, reload the page to reflect changes
             window.location.reload();
             console.log('Invoice updated successfully');
           } else {
             console.error('Failed to update invoice:', response.statusText);
           }
         })
         .catch(error => {
           console.error('Error updating invoice:', error);
         });
     };
          


   const handleDeleteInvoice = (id) => {
       fetch(`http://localhost:5000/invoices/${id}`, {
           method: 'DELETE'
       })
       .then(response => {
           if (response.ok) {
               setInvoices(invoices.filter(invoice => invoice.id !== id));
           }
       })
       .catch(error => console.error('Error deleting invoice:', error));
   };


   const handleCreateInvoice = (newInvoice) => {
       fetch('http://localhost:5000/invoices', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(newInvoice)
       })
       .then(response => response.json())
       .then(createdInvoice => {
           setInvoices([...invoices, createdInvoice]);
       })
       .catch(error => console.error('Error creating invoice:', error));
   };


   const handleOpenModal = (id) => {
       const invoice = invoices.find(inv => inv.id === id);
       setSelectedInvoice(invoice);
       setIsModalOpen(true);
   };


   const handleCloseModal = () => {
       setIsModalOpen(false);
       setSelectedInvoice(null);
   };


   return (
       <Router>
           <div className="App">
               <div className="sidebar">
                   <Sidebar />
               </div>
               <div className="main-content">
                   <Routes>
                       <Route path="/" element={
                           <Dashboard
                               invoices={invoices}
                               pieChartData={pieChartData}
                               barChartData={barChartData}
                               totalRevenue={totalRevenue}
                               bouncedCheques={bouncedCheques}
                               signUps={signUps}
                               onUpdateInvoice={handleUpdateInvoice}
                               onDeleteInvoice={handleDeleteInvoice}
                               onCreateInvoice={handleCreateInvoice}
                               onOpenModal={handleOpenModal}
                           />
                       } />
                       <Route path="/schools" element={<Schools schools={schools} />} />
                       <Route path="/collections" component={Collections} />
                   </Routes>
                   <Modal
                       isOpen={isModalOpen}
                       onClose={handleCloseModal}
                       invoice={selectedInvoice}
                       onUpdateInvoice={handleUpdateInvoice}
                   />
               </div>
           </div>
       </Router>
   );
}


export default App;
