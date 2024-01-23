import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import Login2 from "./Components/Login2";
import ForgotPassword from "./Components/ForgotPassword";
import { Routes,Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login2 />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
