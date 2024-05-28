import React from 'react';
import './TopCards.css';

const TopCards = ({ collections, signups, revenue, bouncedCheques }) => {
    return (
        <div className="top-cards">
            <div className="card">Collections: {collections}</div>
            <div className="card">Sign-ups: {signups}</div>
            <div className="card">Total Revenue: {revenue}</div>
            <div className="card">Bounced Cheques: {bouncedCheques}</div>
        </div>
    );
};

export default TopCards;
