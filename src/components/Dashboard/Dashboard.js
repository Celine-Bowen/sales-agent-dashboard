import React from 'react';
import './Dashboard.css';
import { PieChart, Pie, Cell, Tooltip} from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F'];


const Dashboard = ({ invoices, pieChartData, barChartData, totalRevenue, bouncedCheques, signUps }) => {
    return (
        <div className="dashboard">
            <div className="top-cards">
                <div className="card">
                    <h3>Collections</h3>
                    <p>{invoices.length}</p>
                </div>
                <div className="card">
                    <h3>Sign-ups</h3>
                    <p>{signUps}</p>
                </div>
                <div className="card">
                    <h3>Total Revenue</h3>
                    <p>Ksh. {totalRevenue}</p>
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
                        <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div className="chart">
                    <div className="chart-container">
                    <h3>Signups Overview</h3>
                    <BarChart width={600} height={400} data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="schoolType" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="analytics" fill="#8884d8" />
                        <Bar dataKey="finance" fill="#82ca9d" />
                        <Bar dataKey="timetable" fill="#ffc658" />
                    </BarChart>
                    </div>
                </div>
            </div>
            <div className="upcoming-invoices">
                <h3>Upcoming Invoices</h3>
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

export default Dashboard;
