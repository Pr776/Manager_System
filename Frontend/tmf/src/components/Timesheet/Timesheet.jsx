import React from "react";
import TimesheetCSS from "./Timesheet.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Timesheet() {
  const [tableRows, setTableRows] = useState([{ id: 1 }]); // Initial row

  const addRow = () => {
    if (tableRows.length < 4) {
      const newRow = { id: tableRows.length + 1 };
      setTableRows([...tableRows, newRow]);
    }
  };

  const deleteRow = (id) => {
    if (id !== 1) {
      // Check if it's not the first row
      const updatedRows = tableRows.filter((row) => row.id !== id);
      setTableRows(updatedRows);
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    // Use navigate to go back to the previous page
    navigate(-1);
  };

  return (
    <div className={TimesheetCSS["timesheet-container"]}>
      <div className={TimesheetCSS["timesheet-logo"]}>
        <img
          src="https://ldtech.in/wp-content/uploads/2024/01/logo.png"
          alt="logo"
          // className={ActivityCSS["activity-logo"]}
        />
        <h3
          style={{
            marginLeft: "36px",
            marginBottom: "-22.92px",
            marginTop: "-16.92px",
            color: "darkred",
            fontFamily: "monospace",
          }}
        >
          Timesheet
        </h3>
      </div>
      <div className={TimesheetCSS["timesheet-form"]}>
        <label style={{ fontSize: "15px" }}>Employee Name:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Employee Name"
          name="empid"
          id="empid"
        />
        <label style={{ fontSize: "15px", marginLeft: "800px" }}>
          Week Start Date:&nbsp;
        </label>
        <input type="date" name="weekstartdate" id="weekstartdate" />
      </div>
      <div className={TimesheetCSS["timesheet-form2"]}>
        <label style={{ fontSize: "15px" }}>Employee Id:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Employee Id"
          name="empname"
          id="empname"
        />
        <label
          style={{ fontSize: "15px", marginLeft: "800px", paddingLeft: "29px" }}
        >
          Week End Date:&nbsp;
        </label>
        <input
          type="date"
          name="weekenddate"
          id="weekenddate"
          style={{ paddingLeft: "4px", marginLeft: "2px" }}
        />
      </div>
      <div className={TimesheetCSS["timesheet-form3"]}>
        <p>Role: Developer</p>
        <p>Reporting Manager: SK</p>
      </div>
      <div
        className={TimesheetCSS["timesheet-table1"]}
        style={{
          fontSize: "15px",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Log Date</th>
              <th>Log In</th>
              <th>Log Out</th>
              <th>Gross Hours</th>
              <th>Activity Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className={TimesheetCSS["timesheet-table2"]}
        style={{ fontSize: "15px" }}
      >
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Project Type</th>
              <th>Activity</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Description</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={TimesheetCSS["timesheet-approval"]}>
        <label style={{ fontSize: "15px" }}>Approval:&nbsp;</label>
        <input type="text" name="approval" id="approval"></input>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "720px",
          border: "none",
          borderRadius: "5px",
          gap: "10px",
        }}
      >
        <button style={{ backgroundColor: "darkgray", cursor: "pointer" }}>
          Approve
        </button>
        <button style={{ backgroundColor: "darkgray", cursor: "pointer" }}>
          Reject
        </button>
        <button
          style={{ backgroundColor: "cyan", cursor: "pointer" }}
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Timesheet;
