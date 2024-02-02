// Timesheet.js

import React, { useState } from 'react';
import './Timesheet.css';

const Timesheet = () => {
  const [employeeDetails, setEmployeeDetails] = useState({
    employeeName: 'Suvendu',
    role: 'Developer',
    reportingManager: 'SK',
  });

  // ... (Other state variables)

  const [rows, setRows] = useState([0]); // Maintain an array to keep track of rows

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, prevRows.length]);
  };

  const handleSubtractRow = () => {
    if (rows.length > 1) {
      setRows((prevRows) => prevRows.slice(0, -1));
    }
  };

  return (
    <div className="timesheet">
      <div className="company-logo">
        {/* Add company logo here */}
      </div>
      <div className="employee-details">
        {/* Employee details as before */}
      </div>
      <div className="dates">
        {/* Dates section as before */}
      </div>
      <table className="timesheet-table">
        {/* Table header as before */}
        <tbody>
          {rows.map((rowIndex) => (
            <tr key={rowIndex}>
              {/* Render table rows dynamically based on rows array */}
              {/* Use appropriate state variables for each cell */}
              <td>{/* Project Name input */}</td>
              <td>{/* Project Type input */}</td>
              <td>{/* Log In input */}</td>
              <td>{/* Log Out input */}</td>
              <td>{/* Activity input */}</td>
              <td>{/* Gross Hours input */}</td>
              <td>{/* Start Time input */}</td>
              <td>{/* End Time input */}</td>
              <td>{/* Activity Hours input */}</td>
              <td>{/* Description input */}</td>
              <td>{/* Remark input */}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="add-subtract-table">
        {/* Add/subtract buttons */}
        <tbody>
          <tr>
            <td>
              <button onClick={handleAddRow}>Add Row</button>
            </td>
            <td>
              <button onClick={handleSubtractRow}>Subtract Row</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Timesheet;
