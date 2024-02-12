import Login2 from "./Components/Login2";
import ForgotPassword from "./Components/ForgotPassword";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import History from "./Components/History";
import TimeSheet from "./Components/TimeSheet";
import Report2 from "./Components/Report2";

function App() {
  const approvedCount = 50;
  const rejectedCount = 20;
  const pendingCount = 25;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login2 />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              approvedCount={approvedCount}
              rejectedCount={rejectedCount}
              pendingCount={pendingCount}
            />
          }
        />
        <Route path="/history" element={<History />} />
        <Route path="/timesheet" element={<TimeSheet />} />
        <Route path="/report2" element={<Report2 />} />
      </Routes>
    </div>
  );
}

export default App;
