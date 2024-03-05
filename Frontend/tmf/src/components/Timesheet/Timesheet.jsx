// import React from "react";
import TimesheetCSS from "./Timesheet.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "antd";
// import IconButton from "@material-ui/core/IconButton";
// import SearchIcon from "@mui/icons-material/Search";

function Timesheet() {
  const [timesheetInfoList, setTimesheetInfoList] = useState([]);
  const [employeeName, setEmpName] = useState("");
  const [employeeId, setEmpId] = useState("");
  // const [logDate, setLogDate] = useState("");
  const [weekStartDate, setWeekStartDate] = useState("");
  // const [startTime, setStartTime] = useState(""); // State for start time
  // const [endTime, setEndTime] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  const [logDate, setLogDate] = useState("");
  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
  const [projectData, setProjectData] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.state);
  console.log(location.state.id);

  // const [tableRows, setTableRows] = useState([{ id: 1 }]); // Initial row

  // const addRow = () => {
  //   if (tableRows.length < 4) {
  //     const newRow = { id: tableRows.length + 1 };
  //     setTableRows([...tableRows, newRow]);
  //   }
  // };

  // const deleteRow = (id) => {
  //   if (id !== 1) {
  //     // Check if it's not the first row
  //     const updatedRows = tableRows.filter((row) => row.id !== id);
  //     setTableRows(updatedRows);
  //   }
  // };

  const pagination = {
    pageSize: 2,
    showQuickJumper: true,
  };

  const columns = [
    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Project Type",
      dataIndex: "projectType",
      key: "projectType",
    },
    {
      title: "Activity",
      dataIndex: "activityType",
      key: "activityType",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      render: (text, record, index) => (
        <input
          type="text"
          value={timesheetInfoList[index].remark}
          onChange={(e) => {
            const newTimesheetInfoList = [...timesheetInfoList];
            newTimesheetInfoList[index].remark = e.target.value;
            setTimesheetInfoList(newTimesheetInfoList);
          }}
        />
      ),
    },
  ];

  const handleBack = () => {
    // Use navigate to go back to the previous page
    navigate(-1);
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // const handleSearch = () => {
  //   if (employeeName.trim() !== "") {
  //     fetch(
  //       `http://localhost:8080/api/activityAllocations/name/${employeeName}`
  //     )
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setEmpId(data.employeeId); // Set the employee ID
  //       })
  //       .catch((error) => {
  //         console.error("There was a problem fetching the data: ", error);
  //       });
  //   } else {
  //     // Handle empty employee name
  //     console.error("Employee name cannot be empty");
  //   }
  // };

  const handleSearchid = () => {
    if (
      location.state.id.trim() !== "" ||
      location.state.logDate.trim() !== ""
    ) {
      fetch(
        `http://localhost:8080/api/validate/${location.state.id}/${location.state.logDate}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setEmpName(data.employeeName); // Set the employee name
          // Assuming data contains all the required information
          setEmpId(data.employeeId);
          setLogDate(data.logDate);
          setLoginTime(data.loginTime);
          setLogoutTime(data.logoutTime);
          setApprovalStatus(data.approvalStatus);
          setProjectData(data.project); // Assuming data.project is an array of project objects
          // setStartTime(data.project[0].startTime);
          // setEndTime(data.project[0].endTime);
          // console.log(data);
          // console.log(data.project);
          // console.log(data.project[0].startTime);
          const newTimesheetInfoList = data.project.map((project) => ({
            startTime: project.startTime,
            remark: "",
          }));
          setTimesheetInfoList(newTimesheetInfoList);
        })

        .catch((error) => {
          console.error("There was a problem fetching the data: ", error);
        });
    } else {
      // Handle empty employee ID
      console.error("Employee ID cannot be empty");
    }
  };

  useEffect(() => {
    handleSearchid();
  }, []);

  const handleApprove = () => {
    const payload = {
      employeeId: location.state.id,
      logDate: location.state.logDate,
      timesheetInfoList,
      approvalStatus: "Accepted",
    };

    fetch("http://localhost:8080/api/validate/timesheet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Timesheet approved successfully");
        alert("Timesheet approved successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("There was a problem approving the timesheet: ", error);
      });
  };

  const handleReject = () => {
    const payload = {
      employeeId: location.state.id,
      logDate: location.state.logDate,
      timesheetInfoList,
      approvalStatus: "Rejected",
    };

    fetch("http://localhost:8080/api/validate/timesheet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Timesheet rejected successfully");
        alert("Timesheet rejected");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("There was a problem approving the timesheet: ", error);
      });
  };

  useEffect(() => {
    // Calculate current week's start and end dates
    const currentDate = new Date();
    // setLogDate(formatDate(currentDate));

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

    // fetchData();// Fetch data after setting the dates
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   fetch("http://localhost:8080/api/activityAllocations/projects/SK")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Data fetched from API:", data);
  //       // setProjectOptions(data); // Set project options directly from API response
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem fetching the data: ", error);
  //     });
  // };

  const handleWeekStartDateChange = (date) => {
    setWeekStartDate(date);

    // Calculate week end date (4 days later)
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 4);
    const formattedEndDate = endDate.toISOString().split("T")[0];
    setWeekEndDate(formattedEndDate);
  };

  const calculateGrossHours = () => {
    if (loginTime && logoutTime) {
      const [loginHour, loginMinute] = loginTime.split(":").map(Number);
      const [logoutHour, logoutMinute] = logoutTime.split(":").map(Number);

      const login = new Date(2000, 0, 1, loginHour, loginMinute);
      const logout = new Date(2000, 0, 1, logoutHour, logoutMinute);

      const diff = (logout - login) / (1000 * 60 * 60);
      return diff.toFixed(2);
    }
    return "";
  };

  const modifiedProjectData = projectData.map((item, index) => ({
    ...item,
    key: index.toString(),
  }));

  const calculateActivityHours = () => {
    let totalHours = 0;

    // Iterate through each project and calculate activity hours
    projectData.forEach((project) => {
      if (project.startTime && project.endTime) {
        const [startHour, startMinute] = project.startTime
          .split(":")
          .map(Number);
        const [endHour, endMinute] = project.endTime.split(":").map(Number);

        const start = new Date(2000, 0, 1, startHour, startMinute);
        const end = new Date(2000, 0, 1, endHour, endMinute);

        const diff = (end - start) / (1000 * 60 * 60);
        totalHours += diff;
      }
    });

    return totalHours.toFixed(2);
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
        <label style={{ fontSize: "15px" }}>Employee Id:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Employee Id"
          name="employeeId"
          id="employeeId"
          value={employeeId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        {/* <IconButton
          style={{ marginLeft: "10px" }}
          size="small"
          onClick={handleSearchid}
        >
          <SearchIcon />
        </IconButton> */}

        {/* <IconButton
          style={{ marginLeft: "10px" }}
          size="small"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton> */}
        <label style={{ fontSize: "15px", marginLeft: "857px" }}>
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
      <div className={TimesheetCSS["timesheet-form2"]}>
        <label style={{ fontSize: "15px" }}>Employee Name:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Employee Name"
          name="employeeName"
          id="employeeName"
          readOnly
          value={employeeName}
          onChange={(e) => setEmpName(e.target.value)}
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
          onChange={(e) => setWeekEndDate(e.target.value)}
          value={weekEndDate}
          readOnly
          style={{ paddingLeft: "4px", marginLeft: "2px" }}
        />
      </div>
      <div className={TimesheetCSS["timesheet-form3"]}>
        {/* <p>Role: Developer</p> */}
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
              <td>{logDate}</td>
              <td>{loginTime}</td>
              <td>{logoutTime}</td>
              <td>{calculateGrossHours()}</td>
              <td>{calculateActivityHours()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className={TimesheetCSS["timesheet-table2"]}
        style={{ fontSize: "15px" }}
      >
        <Table
          columns={columns}
          dataSource={modifiedProjectData}
          pagination={pagination}
          size="middle"
          style={{ width: "100%" }}
        />
      </div>
      <div className={TimesheetCSS["timesheet-approval"]}>
        <label style={{ fontSize: "15px" }}>Approval:&nbsp;</label>
        <input
          type="text"
          name="approval"
          id="approval"
          style={{ marginRight: "20px" }}
          value={approvalStatus}
          onChange={(e) => setApprovalStatus(e.target.value)}
        ></input>
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
        <button
          style={{ cursor: "pointer" }}
          className={TimesheetCSS["approve-button"]}
          onClick={handleApprove}
        >
          Approve
        </button>
        <button
          style={{ cursor: "pointer" }}
          className={TimesheetCSS["reject-button"]}
          onClick={handleReject}
        >
          Reject
        </button>
        <button
          style={{ cursor: "pointer" }}
          onClick={handleBack}
          className={TimesheetCSS["back-button"]}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Timesheet;
