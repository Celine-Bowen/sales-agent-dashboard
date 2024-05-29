import React, { useState } from 'react';
import SchoolList from './SchoolList';
import SchoolDetails from './SchoolDetails';

const Schools = ({ schools }) => {
    const [selectedSchool, setSelectedSchool] = useState(null);

    return (
        <div>
            <SchoolList schools={schools} onSelectSchool={setSelectedSchool} />
            {selectedSchool && <SchoolDetails school={selectedSchool} />}
        </div>
    );
};

export default Schools;
