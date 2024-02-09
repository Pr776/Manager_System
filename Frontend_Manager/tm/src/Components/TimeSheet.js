import React from "react";
import "./TimeSheet.css"; // Import your CSS file for styling
import { blue } from "@mui/material/colors";
import { useState } from "react";

function TimeSheet() {
  const [projectRows, setProjectRows] = useState([
    {
      project: "PSFT",
      projectType: "Support",
      activity: "Fluid",
      startTime: "9:30",
      endTime: "12:30",
      description: "Study fluid",
      remark: "Worked not properly",
    },
  ]);

  const addRow = () => {
    const newRow = {
      project: "",
      projectType: "",
      activity: "",
      startTime: "",
      endTime: "",
      description: "",
      remark: "",
    };
    setProjectRows([...projectRows, newRow]);
  };

  const deleteRow = (index) => {
    const updatedRows = [...projectRows];
    updatedRows.splice(index, 1);
    setProjectRows(updatedRows);
  };
  return (
    <div>
       <img
            src="https://www.ldtech.in/images/logo.png"
            alt="logo"
            className="logo-ts"
          />
      <div className="timesheet-container">
        <div className="header-container">
         
          <p style={{ color: "red", fontSize: "20px", paddingLeft: "28px" }}>
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
        {/* <div className="middle"> */}
          <div
            className="table-container"
            style={{
              fontSize: "small",
              // width: "100%",
              // border: "1px solid black",
            }}
          >
            <div>
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
                    <td>10:16:23</td>
                    <td>9:30</td>
                    <td>18:30</td>
                    <td>9hr</td>
                    <td>8hr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
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
                  {projectRows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.project}</td>
                      <td>{row.projectType}</td>
                      <td>{row.activity}</td>
                      <td>{row.startTime}</td>
                      <td>{row.endTime}</td>
                      <td>{row.description}</td>
                      <td>{row.remark}</td>
                      <td>
                        <button
                          onClick={() => deleteRow(index)}
                          style={{ marginRight: "8px" }}
                        >
                          -
                        </button>
                        <button onClick={addRow}>+</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          {/* </div> */}
        </div>
      </div>
      <div className="approval">
        Approval Status: <input type="text" />
      </div>
      <div className="buttons">
        <div style={{ paddingRight: "10px" }}>
          <button>Approve</button>
        </div>
        <div style={{ paddingRight: "10px" }}>
          {" "}
          <button>Reject</button>
        </div>
        <div>
          <button>Back</button>
        </div>
      </div>
    </div>
  );
}

export default TimeSheet;
