import React from "react";
import DashboardCSS from "./Dashboard.module.css";
import { Table } from "antd";
import { useState } from "react";
import DatePicker from "react-datepicker";

function Dashboard() {
  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");

  const handleWeekStartDateChange = (date) => {
    setWeekStartDate(date);

    // Calculate week end date (4 days later)
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 4);
    const formattedEndDate = endDate.toISOString().split("T")[0];
    setWeekEndDate(formattedEndDate);
  };

  const pagination = {
    pageSize: 5,
    showQuickJumper: true,
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Emp ID",
      dataIndex: "empId",
      key: "empId",
    },
    {
      title: "Emp Name",
      dataIndex: "empName",
      key: "empName",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Activity Hours",
      dataIndex: "activityHours",
      key: "activityHours",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const data = [
    {
      key: "1",
      date: "2023-06-01",
      empId: "LD00001",
      empName: "Suvendu",
      project: "Project A",
      department: "IT",
      client: "Client A",
      activityHours: "5",
      status: "Pending",
    },
    {
      key: "2",
      date: "2023-06-02",
      empId: "LD00002",
      empName: "Subham",
      project: "Project B",
      department: "HR",
      client: "Client B",
      activityHours: "3",
      status: "Approved",
    },
    {
      key: "3",
      date: "2023-06-03",
      empId: "LD00003",
      empName: "Sourav",
      project: "Project C",
      department: "Finance",
      client: "Client C",
      activityHours: "7",
      status: "Rejected",
    },
    {
      key: "4",
      date: "2023-06-04",
      empId: "LD00004",
      empName: "Sourav",
      project: "Project C",
      department: "Finance",
      client: "Client C",
      activityHours: "7",
      status: "Rejected",
    },
    {
      key: "5",
      date: "2023-06-05",
      empId: "LD00005",
      empName: "Sourav",
      project: "Project C",
      department: "Finance",
      client: "Client C",
      activityHours: "7",
      status: "Rejected",
    },
    {
      key: "6",
      date: "2023-06-06",
      empId: "LD00006",
      empName: "Sourav",
      project: "Project C",
      department: "Finance",
      client: "Client C",
      activityHours: "7",
      status: "Rejected",
    },
  ]; // Add your data here

  return (
    <div className={DashboardCSS["dashboard-container"]}>
      <div className={DashboardCSS["dashboard-logo"]}>
        <img
          src="https://www.ldtech.in/images/logo.png"
          alt="logo"
          // className={ActivityCSS["activity-logo"]}
        />
      </div>
      <div className={DashboardCSS["dashboard-home-button"]}>
        <button
          onClick={() => {
            window.location.href = "/home";
          }}
          style={{
            marginRight: "10px",
            borderRadius: "5px",
            padding: "5px",
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          Home
        </button>
      </div>
      <div className={DashboardCSS["dashboard-form"]}>
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
        <input
          type="date"
          name="weekstartdate"
          id="weekstartdate"
          onChange={(e) => handleWeekStartDateChange(e.target.value)}
        />
      </div>
      <div className={DashboardCSS["dashboard-form2"]}>
        <label style={{ fontSize: "15px" }}>Employee Id:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Employee Id"
          name="empid"
          id="empid"
        />
        <label style={{ fontSize: "15px", marginLeft: "800px" }}>
          Week End Date:&nbsp;
        </label>
        {/* <input type="date" name="weekenddate" id="weekenddate" /> */}
        <input
          type="date"
          name="weekEndDate"
          id="weekEndDate"
          value={weekEndDate}
          readOnly
        />
      </div>
      <div className={DashboardCSS["dashboard-form3"]}>
        <label style={{ fontSize: "15px" }}>Search by status:&nbsp;</label>
        <select>
          <option value="">Select Status</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
        <label style={{ fontSize: "15px", marginLeft: "800px" }}>
          Search by Department:&nbsp;
        </label>
        <select>
          <option value="">Select Type</option>
          <option value="IT">IT</option>
          <option value="NON-IT">NON-IT</option>
        </select>
      </div>
      <div className={DashboardCSS["dashboard-form4"]}>
        <label style={{ fontSize: "15px" }}>Search by client:&nbsp;</label>
        <input type="text" placeholder="Enter Client Name" />
      </div>
      <div
        className={DashboardCSS["dashboard-table"]}
        style={{ fontSize: "25px" }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          style={{
            fontSize: "25px",
            position: "relative",
            bottom: "25px",
            left: "250px",
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
