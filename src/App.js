import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Schools from './components/Schools/Schools';
import './App.css';

function App() {
    const [schools, setSchools] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

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

    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const bouncedCheques = invoices.filter(invoice => invoice.status === 'Bounced').length;
    const signUps = schools.length;

    return (
        <Router>
            <div className="App">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard invoices={invoices} pieChartData={pieChartData} barChartData={barChartData} totalRevenue={totalRevenue} bouncedCheques={bouncedCheques} signUps={signUps} />} />
                        <Route path="/schools" element={<Schools schools={schools} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
