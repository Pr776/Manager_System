import React from "react";
import "./TimeSheet.css"; // Import your CSS file for styling

function TimeSheet() {
  return (
    <div className="timesheet-container">
      <img
        src="https://www.ldtech.in/images/logo.png"
        alt="logo"
        className="logo-ts"
      />
      <div className="header-container">
        <p style={{ color: "red", paddingLeft: "38px", fontSize: "20px" }}>
          Employee TimeSheet Details:{" "}
        </p>
        <div className="emp-details">
          <p> Employee Id: LD00012 </p>
          <p> Employee Name: Soumya Behera</p>
          <p>Reporting Manager: SK</p>
        </div>
        <div className="date-emp">
          Week Start Date:{" "}
          <input
            type="date"
            name="date"
            id="date"
            className="date"
            placeholder="Date"
            style={{ marginBottom: "10px" }}
          />
          <br></br>
          Week End Date:{" "}
          <input
            type="date"
            name="date"
            id="date"
            className="date"
            placeholder="Date"
          />
        </div>
      </div>
    </div>
  );
}

export default TimeSheet;
