import React from "react";
import "./TimeSheet.css"; // Import your CSS file for styling

function TimeSheet() {
  return (
    <>
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
        <div className="middle">
          <div
            className="table-container"
            style={{
              fontSize: "small",
              // width: "100%",
              // border: "1px solid black",
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
                  <td>10:16:23</td>
                  <td>9:30</td>
                  <td>18:30</td>
                  <td>9hr</td>
                  <td>8hr</td>
                </tr>
              </tbody>
            </table>
            <p></p>
            <p></p>
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
                  <td>PSFT</td>
                  <td>Support</td>
                  <td>Fluid</td>
                  <td>9:30</td>
                  <td>12:30</td>
                  <td>Study fluid</td>
                  <td>Worked not properly</td>
                </tr>
                <tr>
                  <td>PSFT</td>
                  <td>Support</td>
                  <td>Fluid</td>
                  <td>9:30</td>
                  <td>12:30</td>
                  <td>Study fluid</td>
                  <td>Worked not properly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="approval">
        Approval Status: <input type="text" />
      </div>
      <div className="buttons">
        <button>Approve</button>
        <button>Reject</button>
        <button>Pending</button>
      </div>
    </>
  );
}

export default TimeSheet;
