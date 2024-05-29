import React from 'react';
import './SchoolList.css';

const SchoolList = ({ schools, onSelectSchool }) => (
    <div className="school-list">
        <h2>Schools</h2>
        <ul>
            {schools.map((school, index) => (
                <li key={index} onClick={() => onSelectSchool(school)}>
                    {school.name}
                </li>
            ))}
        </ul>
    </div>
);

export default SchoolList;
