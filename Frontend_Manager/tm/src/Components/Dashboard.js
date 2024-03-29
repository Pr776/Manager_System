// import styled from "styled-components";
// // import "recharts/dist/recharts.css";
// import { Link, useNavigate } from "react-router-dom";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";
// import {
//   FaCheckCircle,
//   FaTimesCircle,
//   FaExclamationTriangle,
// } from "react-icons/fa";

// const DashboardContainer = styled.div`
//   display: flex;
//   @media (max-width: 1080px) {
//     width: 100%;
//     left: 0;
//   }
// `;

// const SidebarContainer = styled.div`
//   background-color: #f0f2f5;
//   width: 250px;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start; /* Align items to the left */
//   padding: 20px;
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 1000; /* Ensure the sidebar is above other elements */
//   /* box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1); Add shadow for a bit of depth */
// `;

// const LogoContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const Logo = styled.img`
//   width: 200px;
//   height: 36px;
//   margin-right: 10px;
// `;

// const CompanyName = styled.h1`
//   font-size: 20px;
//   font-weight: bold;
//   color: #333;
// `;

// const MenuContainer = styled.ul`
//   list-style: none;
//   margin: 0;
//   padding: 0;
//   width: 100%;
// `;

// const MenuItem = styled.li`
//   margin-bottom: 10px;
// `;

// const MenuLink = styled.a`
//   display: flex;
//   align-items: center;
//   padding: 10px 15px;
//   border-radius: 5px;
//   text-decoration: none;
//   color: #333;

//   &:hover {
//     background-color: #e0e4e8;
//   }
// `;

// const MenuIcon = styled.i`
//   margin-right: 10px;
// `;

// const FooterContainer = styled.div`
//   display: flex;
//   flex-direction: column; /* Adjust the direction to column */
//   align-items: center;
//   margin-top: auto;
//   margin-top: 20px; /* Add some margin to the top */
// `;

// const SignOutButton = styled.button`
//   background-color: #333;
//   color: #fff;
//   padding: 10px 95px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const StatusContainer = styled.div`
//   width: 85%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: fixed;
//   top: 0;
//   left: 245px; /* Adjust the left position */
//   background-color: #f0f2f5;
//   padding: 10px;
//   /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
//   z-index: 1000;
//   box-sizing: border-box;
// `;

// const StatusBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: #fff;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   padding: 10px;
//   text-align: center;
//   width: calc(30% - 20px);
//   margin: 0 10px;
//   box-sizing: border-box;
// `;

// const StatusTitle = styled.p`
//   font-size: 16px;
//   font-weight: bold;
//   margin-bottom: 5px;
// `;

// const StatusCount = styled.span`
//   font-size: 20px;
// `;

// const TotalStatusHeader = styled.h1`
//   font-size: 16px;
//   font-weight: bold;
//   color: #333;
//   margin-top: 15px;
// `;

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow the container to wrap items to the next line */
`;

const SidebarContainer = styled.div`
  background-color: #f0f2f5;
  width: 250px;
  min-height: 100vh; /* Make sure the sidebar takes at least the full height */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 200px;
  height: 36px;
  margin-right: 10px;
  padding-left: 20px;
`;

const MenuContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const MenuItem = styled.li`
  margin-bottom: 10px;
`;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  color: #333;

  &:hover {
    background-color: #e0e4e8;
  }
`;

const MenuIcon = styled.i`
  margin-right: 10px;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-top: 20px;
`;

const SignOutButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 10px 95px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StatusContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 250px;
  background-color: #f0f2f5;
  padding: 10px;
  z-index: 1000;
  box-sizing: border-box;

  @media (max-width: 768px) {
    left: 0;
  }
`;

const StatusBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  width: calc(30% - 20px);
  margin: 0 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 0 10px 0;
  }
`;

const StatusTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatusCount = styled.span`
  font-size: 20px;
`;

const TotalStatusHeader = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 15px;
  padding-left: 150px;
`;

const DashboardContent = styled.div`
  padding: 20px;
  box-sizing: border-box;
  flex: 1; /* Allow the content to grow and take remaining space */
`;

const ResponsiveDatePicker = styled(DatePicker)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Dashboard = ({ approvedCount, rejectedCount, pendingCount }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const data = [
    { name: "Approved", value: approvedCount },
    { name: "Rejected", value: rejectedCount },
    { name: "Pending", value: pendingCount },
  ];

  const COLORS = ["#4caf50", "#f44336", "#ff9800"];

  const handleSignOut = () => {
    // Handle sign out logic here
    // For example, you might clear user authentication state
    navigate("/"); // Navigate to the Login2 component
  };
  return (
    <>
      <DashboardContainer>
        <SidebarContainer>
          <LogoContainer>
            {/* Add your logo here */}
            <Logo src="https://www.ldtech.in/images/logo.png" alt="logo" />
            {/* <CompanyName>Your Company Name</CompanyName> */}
          </LogoContainer>
          <MenuContainer>
            <MenuItem>
              <MenuLink href="/dashboard">
                <MenuIcon className="fas fa-tachometer-alt" />
                Dashboard
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/activity-allocation">
                <MenuIcon className="fas fa-calendar-check" />
                Activity Allocation
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/report">
                <MenuIcon className="fas fa-file-alt" />
                Report
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/history">
                <MenuIcon className="fas fa-history" />
                History
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href="/timesheet">
                <MenuIcon className="fas fa-file-invoice" />
                Timesheet
              </MenuLink>
            </MenuItem>
          </MenuContainer>
          <FooterContainer>
            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          </FooterContainer>
        </SidebarContainer>
        <StatusContainer>
          <StatusBox>
            <FaCheckCircle color="#4caf50" size={32} />
            <StatusTitle>Approved</StatusTitle>
            <StatusCount>{approvedCount}</StatusCount>
          </StatusBox>

          <StatusBox>
            <FaTimesCircle color="#f44336" size={32} />
            <StatusTitle>Rejected</StatusTitle>
            <StatusCount>{rejectedCount}</StatusCount>
          </StatusBox>

          <StatusBox>
            <FaExclamationTriangle color="#ff9800" size={32} />
            <StatusTitle>Pending</StatusTitle>
            <StatusCount>{pendingCount}</StatusCount>
          </StatusBox>
        </StatusContainer>
        <DashboardContent>
          <div
            style={{
              marginLeft: "250px",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            {/* <h1>Total Status: {approvedCount + rejectedCount + pendingCount}</h1> */}
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                dataKey="value"
                fontSize={18}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Approved: {approvedCount}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                |
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Rejected: {rejectedCount}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                |
              </span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Pending: {pendingCount}
              </span>
            </div>
            <TotalStatusHeader>
              Total Status:{approvedCount + rejectedCount + pendingCount}
            </TotalStatusHeader>
          </div>
        </DashboardContent>
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <ResponsiveDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
          />
        </div>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
