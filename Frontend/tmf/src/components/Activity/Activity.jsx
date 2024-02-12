import React from "react";
import ActivityCSS from "./Activity.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Activity() {
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
    <div className={ActivityCSS["activity-container"]}>
      <div className={ActivityCSS["activity-logo"]}>
        <img
          src="https://www.ldtech.in/images/logo.png"
          alt="logo"
          // className={ActivityCSS["activity-logo"]}
        />
      </div>
      <div className={ActivityCSS["activity-form"]}>
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
      <div className={ActivityCSS["activity-form2"]}>
        <label style={{ fontSize: "15px" }}>Employee Id:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Employee Id"
          name="empname"
          id="empname"
        />
        <label style={{ fontSize: "15px", marginLeft: "800px" }}>
          Week End Date:&nbsp;
        </label>
        <input type="date" name="weekenddate" id="weekenddate" />
      </div>
      <div className={ActivityCSS["activity-form3"]}>
        <p>Role: Developer</p>
        <p>Reporting Manager: SK</p>
      </div>
      <div
        className={ActivityCSS["activity-table1"]}
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
              <td>
                <input type="time" />
              </td>
              <td>
                <input type="time" />
              </td>
              <td>
                <input type="time" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className={ActivityCSS["activity-table2"]}
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr key={row.id}>
                {/* Replace below placeholders with your actual data */}
                <td>
                  {/* Dropdown for Project */}
                  <select>
                    <option value="PSFT">PSFT</option>
                    <option value="SAP">SAP</option>
                  </select>
                </td>
                <td>
                  {/* Dropdown for Project Type */}
                  <select>
                    <option value="Support">Support</option>
                    <option value="Testing">Testing</option>
                    <option value="Upgrade">Upgrade</option>
                  </select>
                </td>
                <td>
                  {/* Dropdown for Activity Type */}
                  <select>
                    <option value="Fluid">Fluid</option>
                    <option value="Testing">Testing</option>
                    <option value="Fiori">Fiori</option>
                  </select>
                </td>
                <td>
                  <input type="time" />
                </td>
                <td>
                  <input type="time" />
                </td>
                <td>
                  <input type="textarea" />
                </td>
                <td>
                  <input type="textarea" />
                </td>
                <td>
                  {/* Addition button */}
                  {tableRows.length < 4 || index === 0 ? (
                    <button onClick={addRow}>Add</button>
                  ) : null}
                  {/* Subtraction button */}
                  {index !== 0 && ( // Render delete button conditionally
                    <button onClick={() => deleteRow(row.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={ActivityCSS["activity-approval"]}>
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
          Save
        </button>
        <button style={{ backgroundColor: "darkgray", cursor: "pointer" }}>
          Cancel
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

export default Activity;
