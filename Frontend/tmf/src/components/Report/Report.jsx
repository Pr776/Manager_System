//
import React from "react";
import ReportCSS from "./Report.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";

function Report() {
  const [empId, setEmpId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [empName, setEmpName] = useState("");
  const [toDate, setToDate] = useState("");
  const handleDownload = () => {
    const payload = {
      startDate: fromDate,
      endDate: toDate,
    };

    if (empId !== "") {
      fetch(`http://localhost:8080/api/report/download/id/${empId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          saveAs(blob, "employee.xls");
        })
        .catch((error) => console.error(error));
    } else if (empName !== "") {
      fetch(`http://localhost:8080/api/report/download/name/${empName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          saveAs(blob, "employee.xls");
        })
        .catch((error) => console.error(error));
    } else {
      fetch("http://localhost:8080/api/report/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          saveAs(blob, "employee.xls");
        })
        .catch((error) => console.error(error));
    }
  };

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
  const navigate = useNavigate();

  const handleBack = () => {
    // Use navigate to go back to the previous page
    navigate(-1);
  };

  const handleReset = () => {
    setEmpId("");
    setEmpName("");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    setFromDate(formattedDate);
    setToDate(formattedDate);
  };

  return (
    <div className={ReportCSS["report-container"]}>
      <div className={ReportCSS["report-logo"]}>
        <img
          src="https://ldtech.in/wp-content/uploads/2024/01/logo.png"
          alt="logo"
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
          Report
        </h3>
      </div>
      <div className={ReportCSS["report-form"]}>
        <label style={{ fontSize: "15px" }}>Search By Employee Id:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Employee Id"
          name="empid"
          id="empid"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <label style={{ fontSize: "15px", marginLeft: "800px" }}>
          From Date:&nbsp;
        </label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => handleFromDateChange(e.target.value)}
          name="fromdate"
          id="fromdate"
        />
      </div>
      <div className={ReportCSS["report-form2"]}>
        <label style={{ fontSize: "15px" }}>
          Search By Employee Name:&nbsp;
        </label>
        <input
          type="text"
          placeholder="Enter Employee Name"
          name="empname"
          id="empname"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
        />
        <label style={{ fontSize: "15px", marginLeft: "771px" }}>
          To Date:&nbsp;
        </label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          name="todate"
          id="todate"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          bottom: "-275px",
        }}
      >
        <button
          style={{
            backgroundColor: "burlywood",
            width: "100px", // Adjust the width to make it bigger
            height: "100px", // Adjust the height to make it bigger
            borderRadius: "50%", // Make it circular
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={handleDownload}
        >
          <FaDownload style={{ fontSize: "24px" }} />{" "}
          {/* Adjust the icon size */}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          marginTop: "600px",
          gap: "20px",
          border: "none",
          borderRadius: "5px",
        }}
      >
        <button style={{ backgroundColor: "darkgray" }} onClick={handleBack}>
          Back
        </button>

        <button style={{ backgroundColor: "darkgray" }} onClick={handleReset}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Report;
