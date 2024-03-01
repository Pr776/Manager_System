import ActivityCSS from "./Activity.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Activity() {
  const [tableRows, setTableRows] = useState([{ id: 1 }]); // Initial row
  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  const [logDate, setLogDate] = useState("");
  const [data, setData] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);

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
          name="empid"
          id="empid"
        />
        {/* <button style={{ marginLeft: "10px" }}>Search</button> */}

        <IconButton style={{ marginLeft: "10px" }} size="small">
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
          name="empname"
          id="empname"
        />
        <IconButton style={{ marginLeft: "10px" }} size="small">
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
                {/* Replace below placeholders with your actual data */}
                <td>
                  {/* Dropdown for Project */}
                  <select>
                    {projectOptions.map((projectName, index) => (
                      <option key={index} value={projectName}>
                        {projectName}
                      </option>
                    ))}
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
