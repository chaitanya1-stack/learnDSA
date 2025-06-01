import React from 'react';
import './VerticalProgressBar.css';

const VerticalProgressBar = ({ value }) => {
  const percentage = Math.round(value);
  return (
    <div className="vertical-progress-container">
      <div
        className="vertical-progress-bar"
        style={{ height: `${percentage}%` }}
      >
        {percentage}%
        
      </div>
    </div>
  );
};

export default VerticalProgressBar;
