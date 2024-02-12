import React, { useState, useEffect } from "react";
// import logo from "./images/logo.png";
import "./Report2.css";

const Report2 = () => {
  const [empId, setEmpId] = useState("");
  const [fromDate, setFromDate] = useState("");
  //   const [status, setStatus] = useState("");
  const [toDate, setToDate] = useState("");
  const [empName, setEmpName] = useState("");

  const handleFromDateChange = (date) => {
    setFromDate(date);

    // Calculate end of the month for toDate
    const endOfMonth = new Date(date);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0); // Set to the last day of the month
    const formattedEndOfMonth = endOfMonth.toISOString().split("T")[0];
    setToDate(formattedEndOfMonth);
  };

  // Set default values for fromDate and toDate
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    setFromDate(formattedDate);
    setToDate(formattedDate);
  }, []);

  const handleBack = () => {
    // Your handleBack logic here
  };

  return (
    <form>
      <div className="report">
        <img
          src="https://www.ldtech.in/images/logo.png"
          alt="Logo"
          className="logo-report"
        />
        <h3>Download Report</h3>

        <div className="search-group">
          <label>Emp ID:</label>
          <input
            type="text"
            value={empId}
            placeholder="Search with emp id"
            onChange={(e) => setEmpId(e.target.value)}
          />

          <label style={{ marginLeft: "750px" }}>From Date:</label>
          <input type="date" value={toDate} onChange={handleFromDateChange} />
        </div>

        <div className="search-group">
          <label>Emp Name:</label>
          <input
            type="text"
            value={empName}
            placeholder="Search with emp name"
            onChange={(e) => setEmpName(e.target.value)}
          />

          <label style={{ marginLeft: "750px" }}>To Date:</label>
          <input type="date" value={toDate} onChange={handleFromDateChange} />
        </div>

        <div className="buttons">
          <button type="button" className="primary" onClick={handleBack}>
            Back
          </button>
          <button type="button" className="cancel" onClick={handleBack}>
            Download
          </button>
          <button type="button" className="cancel" onClick={handleBack}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Report2;
