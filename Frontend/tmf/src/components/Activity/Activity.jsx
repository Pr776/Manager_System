import ActivityCSS from "./Activity.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Activity() {
  const [tableRows, setTableRows] = useState([{ id: 1 }]); // Initial row
  const [weekStartDate, setWeekStartDate] = useState("");
  // const [projectType, setProjectType] = useState("");
  // const [activityType, setActivityType] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");
  const [logDate, setLogDate] = useState("");
  // const [selectedProject, setSelectedProject] = useState("");
  // const [data, setData] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [employeeName, setEmpName] = useState("");
  const [employeeId, setEmpId] = useState("");

  const [rowData, setRowData] = useState([
    {
      selectedProject: "",
      projectType: "",
      activityType: "",
      startTime: "",
      endTime: "",
    },
  ]);

  const payload = {
    employeeId: employeeId,
    allocateData: tableRows.map((row, index) => ({
      projectName: rowData[index].selectedProject,
      projectType: rowData[index].projectType,
      activityType: rowData[index].activityType,
      activityStartTime: rowData[index].startTime,
      activityEndTime: rowData[index].endTime,
    })),
    activityAllocationDate: logDate,
  };

  function saveActivity() {
    fetch(`http://localhost:8080/api/activityAllocations/allocate`, {
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
        // setData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
    alert("Data Saved Successfully");
  }
  const handleSearch = () => {
    if (employeeName.trim() !== "") {
      fetch(
        `http://localhost:8080/api/activityAllocations/name/${employeeName}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setEmpId(data.employeeId); // Set the employee ID
        })
        .catch((error) => {
          console.error("There was a problem fetching the data: ", error);
        });
    } else {
      // Handle empty employee name
      console.error("Employee name cannot be empty");
    }
  };

  const handleSearchid = () => {
    if (employeeId.trim() !== "") {
      fetch(`http://localhost:8080/api/activityAllocations/id/${employeeId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setEmpName(data.employeeName); // Set the employee ID
        })
        .catch((error) => {
          console.error("There was a problem fetching the data: ", error);
        });
    } else {
      // Handle empty employee name
      console.error("Employee name cannot be empty");
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    // Calculate current week's start and end dates
    const currentDate = new Date();
    setLogDate(formatDate(currentDate));

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8080/api/activityAllocations/projects/SK")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched from API:", data);
        setProjectOptions(data); // Set project options directly from API response
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
      });
  };

  const handleWeekStartDateChange = (date) => {
    setWeekStartDate(date);

    // Calculate week end date (4 days later)
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 4);
    const formattedEndDate = endDate.toISOString().split("T")[0];
    setWeekEndDate(formattedEndDate);
  };

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

  const addRow = () => {
    if (tableRows.length < 4) {
      const newRow = { id: tableRows.length + 1 };
      setTableRows([...tableRows, newRow]);
      // Add new empty row data
      setRowData([
        ...rowData,
        {
          selectedProject: "",
          projectType: "",
          activityType: "",
          startTime: "",
          endTime: "",
        },
      ]);
    }
  };

  // Function to delete a row
  const deleteRow = (id) => {
    if (id !== 1) {
      // Check if it's not the first row
      const updatedRows = tableRows.filter((row) => row.id !== id);
      setTableRows(updatedRows);
      // Remove corresponding row data
      setRowData(rowData.filter((row, index) => tableRows[index].id !== id));
    }
  };

  // Function to handle changes in dropdowns for each row
  const handleRowChange = (index, key, value) => {
    const updatedData = [...rowData];
    updatedData[index][key] = value;
    setRowData(updatedData);
  };
  const navigate = useNavigate();

  const handleBack = () => {
    // Use navigate to go back to the previous page
    navigate(-1);
  };

  const resetPage = () => {
    // Reset all the state variables to their initial values
    setTableRows([{ id: 1 }]);
    setWeekStartDate("");
    setWeekEndDate("");
    setLogDate("");
    setEmpName("");
    setEmpId("");
    setRowData([
      {
        selectedProject: "",
        projectType: "",
        activityType: "",
        startTime: "",
        endTime: "",
      },
    ]);
  };

  console.log("Payload:", payload);

  return (
    <div className={ActivityCSS["activity-container"]}>
      <div className={ActivityCSS["activity-logo"]}>
        <img
          src="https://ldtech.in/wp-content/uploads/2024/01/logo.png"
          alt="logo"
          // className={ActivityCSS["activity-logo"]}
        />
        <h3
          style={{
            marginLeft: "40px",
            marginBottom: "-22.92px",
            marginTop: "-16.92px",
            color: "darkred",
            fontFamily: "monospace",
          }}
        >
          Activity
        </h3>
      </div>
      <div className={ActivityCSS["activity-form"]}>
        <label style={{ fontSize: "15px" }}>Employee Name:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Employee Name"
          name="employeeName"
          id="employeeName"
          value={employeeName}
          onChange={(e) => setEmpName(e.target.value)}
        />
        {/* <button style={{ marginLeft: "10px" }}>Search</button> */}

        <IconButton
          style={{ marginLeft: "10px" }}
          size="small"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
        <label
          style={{ fontSize: "15px", marginLeft: "800px", paddingTop: "7px" }}
        >
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
      <div className={ActivityCSS["activity-form2"]}>
        <label style={{ fontSize: "15px" }}>Employee Id:&nbsp;</label>
        <input
          type="text"
          placeholder="Enter Employee Id"
          name="employeeId"
          id="employeeId"
          value={employeeId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <IconButton
          style={{ marginLeft: "10px" }}
          size="small"
          onClick={handleSearchid}
        >
          <SearchIcon />
        </IconButton>
        <label
          style={{ fontSize: "15px", marginLeft: "800px", paddingLeft: "30px" }}
        >
          Week End Date:&nbsp;
        </label>
        <input
          type="date"
          name="weekenddate"
          id="weekenddate"
          value={weekEndDate}
          readOnly
          style={{ marginLeft: "4px" }}
        />
        {/* <input
          type="text"
          value={weekEndDate ? weekEndDate.toLocaleDateString() : ""}
          readOnly
        /> */}
      </div>
      <div className={ActivityCSS["activity-form3"]}>
        {/* <p>Role: Developer</p> */}
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="date"
                  name="logDate"
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                />
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
                <td>
                  <select
                    value={rowData[index].selectedProject}
                    onChange={(e) =>
                      handleRowChange(index, "selectedProject", e.target.value)
                    }
                  >
                    <option>Select Here</option>
                    {projectOptions.map((projectName, index) => (
                      <option key={index} value={projectName}>
                        {projectName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={rowData[index].projectType}
                    onChange={(e) =>
                      handleRowChange(index, "projectType", e.target.value)
                    }
                  >
                    <option>Select Here</option>
                    <option value="Developement">Developement</option>
                    <option value="Support">Support</option>
                    <option value="Testing">Testing</option>
                  </select>
                </td>
                <td>
                  <select
                    value={rowData[index].activityType}
                    onChange={(e) =>
                      handleRowChange(index, "activityType", e.target.value)
                    }
                  >
                    <option>Select Here</option>
                    <option value="Fluid">Fluid</option>
                    <option value="Fiori">Fiori</option>
                  </select>
                </td>
                <td>
                  <input
                    type="time"
                    value={rowData[index].startTime}
                    onChange={(e) =>
                      handleRowChange(index, "startTime", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={rowData[index].endTime}
                    onChange={(e) =>
                      handleRowChange(index, "endTime", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input type="textarea" />
                </td>
                <td>
                  <input type="textarea" />
                </td>
                <td>
                  {tableRows.length < 4 || index === 0 ? (
                    <button onClick={addRow}>Add</button>
                  ) : null}
                  {index !== 0 && (
                    <button onClick={() => deleteRow(row.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className={ActivityCSS["activity-approval"]}>
        <label style={{ fontSize: "15px" }}>Approval:&nbsp;</label>
        <input type="text" name="approval" id="approval"></input>
      </div> */}
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
          onClick={saveActivity}
          className={ActivityCSS["save-button"]}
        >
          Save
        </button>
        <button
          style={{ cursor: "pointer" }}
          onClick={resetPage}
          className={ActivityCSS["cancel-button"]}
        >
          Cancel
        </button>
        <button
          style={{ cursor: "pointer" }}
          onClick={handleBack}
          className={ActivityCSS["back-button"]}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Activity;
