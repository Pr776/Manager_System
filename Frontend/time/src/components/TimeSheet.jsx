import React, { useState } from "react";
import "./TimeSheet.css";
// import { useNavigate } from "react-router-dom";
//import Image from '../../assets/logo.png';
 
const Row = ({ id, removeRow }) => (
  <div className="row row-cols-8 row-cols-lg-8 g-2 row3 full3">
    <div className="col">
              <select id="dropdown1" name="dropdown1">
                <option value="PSFT">PSFT</option>
                <option value="SAP">SAP</option>
              </select>
            </div>
            <div className="col">
              <select id="dropdown2" name="dropdown2">
                <option value="Support">Support</option>
                <option value="Testing">Testing</option>
                <option value="Upgrade">Upgrade</option>
              </select>
            </div>
            <div className="col">
              <select id="dropdown3" name="dropdown3">
                <option value="Fluid">Fluid</option>
                <option value="Testing">Testing</option>
                <option value="Flori">Flori</option>
              </select>
            </div>
    <div className="col">
      <input className="inp" type="text" />
    </div>
    <div className="col">
      <input className="inp" type="text" />
    </div>
    <div className="col">
      <input className="inp" type="text" />
    </div>
    <div className="col">
      <input className="inp" type="text" />
    </div>
    <div>
    <button className="remove-row-btn" onClick={() => removeRow(id)}>
      -
    </button>
    </div>
  </div>
);
 
const TimeSheet = () => {
  // const navigate = useNavigate();
  const [rows, setRows] = useState([{ id: 1 }]);
 
  // const homee = () => {
  //   navigate("/homed");
  // };
 
  const addRow = () => {
    const newRow = { id: rows.length + 1 };
    setRows([...rows, newRow]);
  };
 
  const removeRow = (rowId) => {
    const updatedRows = rows.filter((row) => row.id !== rowId);
    setRows(updatedRows);
  };
 
  return (
    <div className="main_div container w-75">
      <img src="https://www.ldtech.in/images/logo.png" alt="logo" />
      <div>
        <p className="pe">Activity Allocation</p>
        <p className="ena">Employee Name: Soumya Behera</p>
        <p className="ena">Employee ID: L0012</p>
        <p className="ena">Role: Developer</p>
        <p className="ena">Reporting Manager: SK</p>
      </div>
      <div className="l1">
        <button className="ho">
          <p className="anc" onClick={homee}>
            HOME
          </p>
        </button>
        <div className="hod mb-1">
          <p>Alotted Date: </p>
          <div>
            <input type="date" className="form-control" />
          </div>
        </div>
      </div>
      <div className="full">
        <div className="row row-cols-7 row-cols-lg-7 g-2 row1 full1">
          <p className="text-center">Log Date</p>
          <p className="text-center">Log In</p>
          <p className="text-center">Log Out</p>
          <p className="text-center">Gross Hours</p>
          <p className="text-center">Activity Hours</p>
          <p></p>
          <p></p>
          <div className="col">
            <input className="inp" type="text" />
          </div>
          <div className="col">
            <input className="inp" type="text" />
          </div>
          <div className="col">
            <input className="inp" type="text" />
          </div>
          <div className="col">
            <input className="inp" type="text" />
          </div>
          <div className="col">
            <input className="inp" type="text" />
          </div>
        </div>
 
        <div className="row row-cols-8 row-cols-lg-8 g-2 row2 full2">
          <p className="text-center">Project:</p>
          <p className="text-center">Project Type:</p>
          <p className="text-center">Activity:</p>
          <p className="text-center">Start Time:</p>
          <p className="text-center">End Time:</p>
          <p className="text-center">Description:</p>
          <p className="text-center">Remark:</p>
        </div>
        <div>
          {rows.map((row) => (
            <Row key={row.id} id={row.id} removeRow={removeRow} />
          ))}
          <div className="add-row-btn-div">
          <button className="add-row-btn" onClick={addRow}>
            +
          </button>
        </div>
        </div>
       
      </div>
    </div>
  );
};
 
export default TimeSheet;