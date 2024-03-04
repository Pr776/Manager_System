// // import React, { useState } from "react";
// // import { Table, Button, Input, Space } from "antd";
// // import { useNavigate } from "react-router-dom";

// // const History = () => {
// //   const [searchType, setSearchType] = useState("");
// //   const [searchText, setSearchText] = useState("");
// //   const [fromDate, setFromDate] = useState(new Date());
// //   const [toDate, setToDate] = useState(new Date());
// //   const [status, setStatus] = useState("");
// //   const [filteredData, setFilteredData] = useState([]);

// //   const navigate = useNavigate();

// //   const data = [
// //     {
// //       key: "1",
// //       employeeId: "LD00013",
// //       employeeName: "Suvendu",
// //       loginDate: "2023-09-10",
// //       status: "Rejected",
// //       modifiedBy: "SK",
// //       modifiedDate: "2023-10-10",
// //     },
// //     {
// //       key: "2",
// //       employeeId: "LD00014",
// //       employeeName: "Subham",
// //       loginDate: "2023-10-10",
// //       status: "Approved",
// //       modifiedBy: "SK",
// //       modifiedDate: "2023-10-11",
// //     },
// //     {
// //       key: "3",
// //       employeeId: "LD00015",
// //       employeeName: "Suravi",
// //       loginDate: "2023-11-10",
// //       status: "Approved",
// //       modifiedBy: "SK",
// //       modifiedDate: "2023-12-10",
// //     },
// //     {
// //       key: "4",
// //       employeeId: "LD00016",
// //       employeeName: "Sujay",
// //       loginDate: "2023-12-10",
// //       status: "Pending",
// //       modifiedBy: "SK",
// //       modifiedDate: "2023-12-11",
// //     },
// //   ];

// //   const columns = [
// //     {
// //       title: "Employee Id",
// //       dataIndex: "employeeId",
// //       key: "employeeId",
// //     },
// //     {
// //       title: "Employee Name",
// //       dataIndex: "employeeName",
// //       key: "employeeName",
// //     },
// //     {
// //       title: "Login Date",
// //       dataIndex: "loginDate",
// //       key: "loginDate",
// //     },
// //     {
// //       title: "Status",
// //       dataIndex: "status",
// //       key: "status",
// //     },
// //     {
// //       title: "Modified By",
// //       dataIndex: "modifiedBy",
// //       key: "modifiedBy",
// //     },
// //     {
// //       title: "Modified Date",
// //       dataIndex: "modifiedDate",
// //       key: "modifiedDate",
// //     },
// //   ];

// //   const handleSearch = () => {
// //     // Filter the data based on search criteria
// //     const filteredData = data.filter((item) => {
// //       const empIdMatch = item.employeeId.includes(searchText);
// //       const empNameMatch = item.employeeName.includes(searchText);
// //       const dateRangeMatch =
// //         (!fromDate || item.loginDate >= fromDate) &&
// //         (!toDate || item.loginDate <= toDate);
// //       const statusMatch = status === "" || item.status === status;

// //       return (
// //         (searchType === "Emp Id" && empIdMatch) ||
// //         (searchType === "Emp Name" && empNameMatch) ||
// //         (searchType === "" && (empIdMatch || empNameMatch)) ||
// //         (dateRangeMatch && statusMatch)
// //       );
// //     });

// //     // Update the state with the filtered data
// //     setFilteredData(filteredData);
// //   };

// //   const pagination = {
// //     pageSize: 3, // Set the number of items per page
// //     // showSizeChanger: true, // Allow the user to change the page size
// //     showQuickJumper: true, // Allow the user to jump to a specific page
// //     total: filteredData.length, // Total number of items
// //   };

// //   const handleBack = () => {
// //     // Use navigate to go back to the previous page
// //     navigate(-1);
// //   };

// //   return (
// //     <div
// //       style={{
// //         margin: "20px",
// //         border: "1px solid #d9d9d9",
// //         borderRadius: "5px",
// //         padding: "20px",
// //         display: "flex",
// //         flexDirection: "column",
// //       }}
// //     >
// //       <Space direction="horizontal" style={{ marginBottom: "20px" }}>
// //         <Button onClick={() => setSearchType("Emp Id")}>
// //           Search by Emp Id
// //         </Button>
// //         <Button onClick={() => setSearchType("Emp Name")}>
// //           Search by Emp Name
// //         </Button>
// //         <Button onClick={handleSearch}>Search</Button>
// //       </Space>
// //       <Space direction="horizontal" style={{ marginBottom: "20px" }}>
// //         <input
// //           type="date"
// //           value={fromDate}
// //           onChange={(e) => setFromDate(e.target.value)}
// //           style={{ marginRight: "10px" }}
// //         />
// //         to
// //         <input
// //           type="date"
// //           value={toDate}
// //           onChange={(e) => setToDate(e.target.value)}
// //           style={{ marginLeft: "10px" }}
// //         />
// //       </Space>
// //       <Space direction="horizontal" style={{ marginBottom: "20px" }}>
// //         <select
// //           value={status}
// //           onChange={(e) => setStatus(e.target.value)}
// //           style={{ marginRight: "10px" }}
// //         >
// //           <option value="">Select Status</option>
// //           <option value="Approved">Approved</option>
// //           <option value="Rejected">Rejected</option>
// //         </select>
// //         <Input
// //           type="text"
// //           value={searchText}
// //           onChange={(e) => setSearchText(e.target.value)}
// //           placeholder={
// //             searchType === "Emp Id" ? "Enter Emp Id" : "Enter Emp Name"
// //           }
// //           style={{ marginRight: "10px", width: "200px" }}
// //         />
// //       </Space>

// //       <Table
// //         dataSource={filteredData.length > 0 ? filteredData : data}
// //         columns={columns}
// //         pagination={pagination}
// //       />

// //       <Button style={{ marginTop: "20px" }} onClick={handleBack}>
// //         Back
// //       </Button>
// //     </div>
// //   );
// // };

// // export default History;

// import React, { useState } from "react";
// import { Table, Button, Input, Space, DatePicker } from "antd";
// import { useNavigate } from "react-router-dom";
// import "./History2.css";

// const History2 = () => {
//   const [searchType, setSearchType] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [status, setStatus] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   const navigate = useNavigate();

//   const data = [
//     {
//       key: "1",
//       employeeId: "LD00013",
//       employeeName: "Suvendu",
//       loginDate: "2023-09-10",
//       status: "Rejected",
//       modifiedBy: "SK",
//       modifiedDate: "2023-10-10",
//     },
//     {
//       key: "2",
//       employeeId: "LD00014",
//       employeeName: "Subham",
//       loginDate: "2023-10-10",
//       status: "Approved",
//       modifiedBy: "SK",
//       modifiedDate: "2023-10-11",
//     },
//     {
//       key: "3",
//       employeeId: "LD00015",
//       employeeName: "Suravi",
//       loginDate: "2023-11-10",
//       status: "Approved",
//       modifiedBy: "SK",
//       modifiedDate: "2023-12-10",
//     },
//     {
//       key: "4",
//       employeeId: "LD00016",
//       employeeName: "Sujay",
//       loginDate: "2023-12-10",
//       status: "Pending",
//       modifiedBy: "SK",
//       modifiedDate: "2023-12-11",
//     },
//     {
//       key: "5",
//       employeeId: "LD00017",
//       employeeName: "Sujit",
//       loginDate: "2023-12-10",
//       status: "Approved",
//       modifiedBy: "SK",
//       modifiedDate: "2023-12-11",
//     },
//   ];

//   const columns = [
//     {
//       title: "Employee Id",
//       dataIndex: "employeeId",
//       key: "employeeId",
//     },
//     {
//       title: "Employee Name",
//       dataIndex: "employeeName",
//       key: "employeeName",
//     },
//     {
//       title: "Login Date",
//       dataIndex: "loginDate",
//       key: "loginDate",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//     },
//     {
//       title: "Modified By",
//       dataIndex: "modifiedBy",
//       key: "modifiedBy",
//     },
//     {
//       title: "Modified Date",
//       dataIndex: "modifiedDate",
//       key: "modifiedDate",
//     },
//   ];

//   const handleSearch = () => {
//     // Filter the data based on search criteria
//     const filteredData = data.filter((item) => {
//       const empIdMatch = item.employeeId.includes(searchText);
//       const empNameMatch = item.employeeName.includes(searchText);
//       const dateRangeMatch =
//         (!dateRange[0] || item.loginDate >= dateRange[0]) &&
//         (!dateRange[1] || item.loginDate <= dateRange[1]);
//       const statusMatch = status === "" || item.status === status;

//       return (
//         (searchType === "Emp Id" && empIdMatch) ||
//         (searchType === "Emp Name" && empNameMatch) ||
//         (searchType === "" && (empIdMatch || empNameMatch)) ||
//         (dateRangeMatch && statusMatch)
//       );
//     });

//     // Update the state with the filtered data
//     setFilteredData(filteredData);
//   };

//   const pagination = {
//     pageSize: 3,
//     showQuickJumper: true,
//     total: filteredData.length,
//   };

//   const handleBack = () => {
//     // Use navigate to go back to the previous page
//     navigate(-1);
//   };

//   return (
//     <div className="history-container">
//       <div className="logo-container">
//         <img
//           src="https://ldtech.in/wp-content/uploads/2024/01/logo.png"
//           alt="Logo"
//           className="logo"
//         />
//         {/* <h3 className="history">History</h3> */}
//       </div>
//       <Space className="button-space">
//         <Button onClick={() => setSearchType("Emp Id")}>
//           Search by Emp Id
//         </Button>
//         <Button onClick={() => setSearchType("Emp Name")}>
//           Search by Emp Name
//         </Button>
//         <Button onClick={handleSearch} style={{ marginRight: "8px" }}>
//           Search
//         </Button>
//       </Space>
//       <Space className="input-space">
//         <DatePicker.RangePicker
//           value={dateRange}
//           onChange={(dates) => setDateRange(dates)}
//           className="date-picker"
//         />
//         <div style={{ position: "relative" }}>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="status-dropdown"
//             id="status"
//             name="status"
//           >
//             <option value="">Select Status</option>
//             <option value="Approved">Approved</option>
//             <option value="Rejected">Rejected</option>
//             <option value="Pending">Pending</option>
//           </select>
//         </div>
//         <Input
//           type="text"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           placeholder={
//             searchType === "Emp Id" ? "Enter Emp Id" : "Enter Emp Name"
//           }
//           className="search-input"
//         />
//       </Space>

//       <Table
//         dataSource={filteredData.length > 0 ? filteredData : data}
//         columns={columns}
//         pagination={pagination}
//       />

//       <Button className="back-button" onClick={handleBack}>
//         Back
//       </Button>
//     </div>
//   );
// };
// export default History2;

import { useEffect } from "react";
// import DashboardCSS from "./Dashboard.module.css";
import DashboardCSS from "./History2.module.css";
import { Table } from "antd";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@mui/icons-material/Search";

// import DatePicker from "react-datepicker";

function History2() {
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
          History
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
            paddingLeft: "100px",
          }}
        />
      </div>
    </div>
  );
}

export default History2;
