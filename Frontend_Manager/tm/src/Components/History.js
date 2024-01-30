import React, { useState } from "react";
import { Table, Button, Input, Space } from "antd";

const History = () => {
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const data = [
    {
      key: "1",
      employeeId: "LD00013",
      employeeName: "Suvendu",
      loginDate: "2023-09-10",
      status: "Rejected",
      modifiedBy: "SK",
      modifiedDate: "2023-10-10",
    },
    {
      key: "2",
      employeeId: "LD00014",
      employeeName: "Subham",
      loginDate: "2023-10-10",
      status: "Approved",
      modifiedBy: "SK",
      modifiedDate: "2023-10-11",
    },
    {
      key: "3",
      employeeId: "LD00015",
      employeeName: "Suravi",
      loginDate: "2023-11-10",
      status: "Approved",
      modifiedBy: "SK",
      modifiedDate: "2023-12-10",
    },
    {
      key: "4",
      employeeId: "LD00016",
      employeeName: "Sujay",
      loginDate: "2023-12-10",
      status: "Pending",
      modifiedBy: "SK",
      modifiedDate: "2023-12-11",
    },
  ];

  const columns = [
    {
      title: "Employee Id",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Login Date",
      dataIndex: "loginDate",
      key: "loginDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
    },
  ];

  const handleSearch = () => {
    // Filter the data based on search criteria
    const filteredData = data.filter((item) => {
      const empIdMatch = item.employeeId.includes(searchText);
      const empNameMatch = item.employeeName.includes(searchText);
      const dateRangeMatch =
        (!fromDate || item.loginDate >= fromDate) &&
        (!toDate || item.loginDate <= toDate);
      const statusMatch = status === "" || item.status === status;

      return (
        (searchType === "Emp Id" && empIdMatch) ||
        (searchType === "Emp Name" && empNameMatch) ||
        (searchType === "" && (empIdMatch || empNameMatch)) ||
        (dateRangeMatch && statusMatch)
      );
    });

    // Update the state with the filtered data
    setFilteredData(filteredData);
  };

  const pagination = {
    pageSize: 3, // Set the number of items per page
    // showSizeChanger: true, // Allow the user to change the page size
    // showQuickJumper: true, // Allow the user to jump to a specific page
    total: filteredData.length, // Total number of items
  };

  return (
    <div
      style={{
        margin: "20px",
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Space direction="horizontal" style={{ marginBottom: "20px" }}>
        <Button onClick={() => setSearchType("Emp Id")}>
          Search by Emp Id
        </Button>
        <Button onClick={() => setSearchType("Emp Name")}>
          Search by Emp Name
        </Button>
        <Button onClick={handleSearch}>Search</Button>
      </Space>
      <Space direction="horizontal" style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        to
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </Space>
      <Space direction="horizontal" style={{ marginBottom: "20px" }}>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Status</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={
            searchType === "Emp Id" ? "Enter Emp Id" : "Enter Emp Name"
          }
          style={{ marginRight: "10px", width: "200px" }}
        />
      </Space>

      <Table
        dataSource={filteredData.length > 0 ? filteredData : data}
        columns={columns}
        pagination={pagination}
      />

      <Button style={{ marginTop: "20px" }}>Back</Button>
    </div>
  );
};

export default History;
