import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <NavLink to="/" activeclassname="active">Dashboard</NavLink>
            <NavLink to="/schools" activeclassname="active">Schools</NavLink>
        </div>
    );
};

export default Sidebar;
