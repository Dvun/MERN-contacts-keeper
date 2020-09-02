import React from 'react';

const Spinner = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10rem'}}>
            <div className="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;