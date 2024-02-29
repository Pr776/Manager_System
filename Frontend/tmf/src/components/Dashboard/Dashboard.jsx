import React, { useEffect } from "react";
import DashboardCSS from "./Dashboard.module.css";
import { Table } from "antd";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@mui/icons-material/Search";

// import DatePicker from "react-datepicker";

function Dashboard() {
  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  // const [employeeNameFilter, setEmployeeNameFilter] = useState("");
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    employeeName: "",
    employeeId: "",
    approvalStatus: "",
    client: "",
    department: "",
  });

  useEffect(() => {
    // Calculate current week's start and end dates
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff =
      currentDate.getDate() -
      currentDayOfWeek +
      (currentDayOfWeek === 0 ? -6 : 1); // Adjust when current day is Sunday
    const monday = new Date(currentDate.setDate(diff));
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    // Set the start and end dates in the state
    setWeekStartDate(formatDate(monday));
    setWeekEndDate(formatDate(friday));

    fetchData(); // Fetch data after setting the dates
  }, []);

  // Helper function to format date as "YYYY-MM-DD"
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // useEffect(() => {
  //   // Function to fetch data from API
  //   const fetchData = async () => {
  //     try {
  //       // Perform API call here and set data state
  //       // Example:
  //       const response = await fetch("http://localhost:8080/api/dashboard");
  //       const jsonData = await response.json();
  //       console.log("jsonData", jsonData);
  //       setData(jsonData);
  //       // For demonstration purpose, I'm setting dummy data here
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8080/api/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from API:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
  };

  const payload = {
    startDate: weekStartDate,
    endDate: weekEndDate,
  };

  console.log(filters.employeeName);
  function handlenameSearch() {
    fetch(`http://localhost:8080/api/dashboard/name/${filters.employeeName}`, {
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
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from API:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
  }

  function handleidSearch() {
    fetch(`http://localhost:8080/api/dashboard/id/${filters.employeeId}`, {
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
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from API:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
  }

  function handleclientSearch() {
    fetch(`http://localhost:8080/api/dashboard/client/${filters.client}`, {
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
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from API:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

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
      dataIndex: "logDate",
      key: "logDate",
    },
    {
      title: "Emp ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Emp Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
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
    // {
    //   title: "Activity Hours",
    //   dataIndex: "activityHours",
    //   key: "activityHours",
    // },
    {
      title: "Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     date: "2023-06-01",
  //     empId: "LD00001",
  //     empName: "Suvendu",
  //     project: "Project A",
  //     department: "IT",
  //     client: "Client A",
  //     activityHours: "5",
  //     status: "Pending",
  //   },
  //   {
  //     key: "2",
  //     date: "2023-06-02",
  //     empId: "LD00002",
  //     empName: "Subham",
  //     project: "Project B",
  //     department: "HR",
  //     client: "Client B",
  //     activityHours: "3",
  //     status: "Approved",
  //   },
  //   {
  //     key: "3",
  //     date: "2023-06-03",
  //     empId: "LD00003",
  //     empName: "Sourav",
  //     project: "Project C",
  //     department: "Finance",
  //     client: "Client C",
  //     activityHours: "7",
  //     status: "Rejected",
  //   },
  //   {
  //     key: "4",
  //     date: "2023-06-04",
  //     empId: "LD00004",
  //     empName: "Sourav",
  //     project: "Project C",
  //     department: "Finance",
  //     client: "Client C",
  //     activityHours: "7",
  //     status: "Rejected",
  //   },
  //   {
  //     key: "5",
  //     date: "2023-06-05",
  //     empId: "LD00005",
  //     empName: "Sourav",
  //     project: "Project C",
  //     department: "Finance",
  //     client: "Client C",
  //     activityHours: "7",
  //     status: "Rejected",
  //   },
  //   {
  //     key: "6",
  //     date: "2023-06-06",
  //     empId: "LD00006",
  //     empName: "Sourav",
  //     project: "Project C",
  //     department: "Finance",
  //     client: "Client C",
  //     activityHours: "7",
  //     status: "Rejected",
  //   },
  // ];

  const filteredData = data.filter((item) => {
    return (
      (!item.employeeName ||
        item.employeeName
          .toLowerCase()
          .includes(filters.employeeName.toLowerCase())) &&
      (!item.employeeId ||
        item.employeeId
          .toLowerCase()
          .includes(filters.employeeId.toLowerCase())) &&
      (filters.approvalStatus === "" ||
        item.approvalStatus === filters.approvalStatus) &&
      (!item.client ||
        item.client.toLowerCase().includes(filters.client.toLowerCase())) &&
      (filters.department === "" || item.department === filters.department)
    );
  });

  return (
    <div className={DashboardCSS["dashboard-container"]}>
      <div className={DashboardCSS["dashboard-logo"]}>
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
          Dashboard
        </h3>
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
          name="employeeName"
          value={filters.employeeName}
          onChange={handleFilterChange}
        />
        {/* <button style={{ marginLeft: "10px" }}>Search</button> */}

        <IconButton
          style={{ marginLeft: "10px" }}
          size="small"
          onClick={handlenameSearch}
        >
          <SearchIcon />
        </IconButton>
        <label style={{ fontSize: "15px", marginLeft: "800px" }}>
          Week Start Date:&nbsp;
        </label>
        <input
          type="date"
          name="weekstartdate"
          id="weekstartdate"
          value={weekStartDate}
          onChange={(e) => handleWeekStartDateChange(e.target.value)}
        />
      </div>
      <div className={DashboardCSS["dashboard-form2"]}>
        <label style={{ fontSize: "15px" }}>Employee Id:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Employee Id"
          name="employeeId"
          id="empid"
          value={filters.employeeId}
          onChange={handleFilterChange}
        />
        <IconButton
          style={{ marginLeft: "10px" }}
          size="small"
          onClick={handleidSearch}
        >
          <SearchIcon />
        </IconButton>
        <label
          style={{ fontSize: "15px", marginLeft: "800px", paddingLeft: "29px" }}
        >
          Week End Date:&nbsp;
        </label>
        {/* <input type="date" name="weekenddate" id="weekenddate" /> */}
        <input
          type="date"
          name="weekEndDate"
          id="weekEndDate"
          value={weekEndDate}
          readOnly
          style={{ paddingLeft: "4px", marginLeft: "2px" }}
        />
      </div>
      <div className={DashboardCSS["dashboard-form3"]}>
        <label style={{ fontSize: "15px" }}>Search by status:&nbsp;</label>
        <select
          value={filters.approvalStatus}
          onChange={handleFilterChange}
          name="approvalStatus"
        >
          <option value="">Select Status</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
        <label
          style={{ fontSize: "15px", marginLeft: "800px", paddingLeft: "70px" }}
        >
          Search by Department:&nbsp;
        </label>
        <select
          value={filters.department}
          onChange={handleFilterChange}
          name="department"
        >
          <option value="">Select Type</option>
          <option value="IT">IT</option>
          <option value="NON-IT">NON-IT</option>
        </select>
      </div>
      <div className={DashboardCSS["dashboard-form4"]}>
        <label style={{ fontSize: "15px" }}>Search by client:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Client Name"
          value={filters.client}
          onChange={handleFilterChange}
          name="client"
        />
        <IconButton
          style={{ marginLeft: "10px" }}
          size="small"
          onClick={handleclientSearch}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <div
        className={DashboardCSS["dashboard-table"]}
        style={{ fontSize: "25px" }}
      >
        <Table
          columns={columns}
          // dataSource={data}
          dataSource={filteredData}
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
