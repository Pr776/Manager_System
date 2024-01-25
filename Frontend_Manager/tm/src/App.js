import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import Login2 from "./Components/Login2";
import ForgotPassword from "./Components/ForgotPassword";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";

function App() {
  const approvedCount = 50;
  const rejectedCount = 20;
  const pendingCount = 15;
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
      </Routes>
    </div>
  );
}

export default App;
