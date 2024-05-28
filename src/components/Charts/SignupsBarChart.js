import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SignupsBarChart = ({ data }) => (
    <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="schoolType" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="analytics" fill="#8884d8" />
        <Bar dataKey="finance" fill="#82ca9d" />
        <Bar dataKey="timetable" fill="#ffc658" />
    </BarChart>
);

export default SignupsBarChart;
