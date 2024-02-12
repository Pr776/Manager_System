import React from "react";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Forgot from "./components/Forgot/Forgot";
import Home from "./components/Home/Home";
import History2 from "./components/History/History2";
import Activity from "./components/Activity/Activity";
import Report from "./components/Report/Report";
import Rough from "./components/Rough/Rough";
import Timesheet from "./components/Timesheet/Timesheet";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  // const approvedCount = 50;
  // const rejectedCount = 20;
  // const pendingCount = 25;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History2 />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/report" element={<Report />} />
        <Route path="/rough" element={<Rough />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
