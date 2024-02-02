import React, { useState } from 'react';
// import logo from "./images/logo.png";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

const HistoryPage = () => {
  const [empId, setEmpId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [status, setStatus] = useState('');
  const [toDate, setToDate] = useState('');
  const [empName, setEmpName] = useState('');

  const handleSearch = () => {
    console.log('Search with parameters:', { empId, fromDate,status,toDate, empName });
  };

  //navigate to go back
//   const handleBack =  ({ history }) => {
//     history.goBack();  
//   };

  return (
    <form>
    <div className="container" >
       <img src="https://www.ldtech.in/images/logo.png" alt="Logo" className="logo" /> 
      <h3>History</h3>
      
      <div className='lebel'>
     
      <label>Search by Emp ID:</label>
      <input type="text" value={empId} onChange={(e) => setEmpId(e.target.value)}  />
     

      <label>From Date:</label>
      <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

      <label>Search by Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="pending">Pending</option>
      </select>

      <label>Search by Emp <br></br>Name:   </label>
      <input type ="text" value={empName} onChange={(e) => setEmpName(e.target.value)} id="a2" />
      
      <label>To Date:</label>
      <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}  /> 
      </div>
      <button onClick={handleSearch}>Search</button> 

      {/* Display your search results or history data here */}
    

    <table class="table">
  <thead>
    <tr>
      <th scope="col">Employee Id:</th>
      <th scope="col">Employee Name:</th>
      <th scope="col">Login Date:</th>
      <th scope="col">Status:</th>
      <th scope="col">Modified By:</th>
      <th scope="col">Modified Date:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>LD00013</td>
      <td>Suvendu</td>
      <td>10-09-2023</td>
      <td>Approved</td>
      <td>sk</td>
      <td>10-10-2023</td>
    </tr>
    <tr>
      <td>LD00013</td>
      <td>Suvendu</td>
      <td>10-09-2023</td>
      <td>Approved</td>
      <td>sk</td>
      <td>10-10-2023</td>
    </tr>
    <tr>
      <td>LD00013</td>
      <td>Suvendu</td>
      <td>10-09-2023</td>
      <td>Approved</td>
      <td>sk</td>
      <td>10-10-2023</td>
    </tr>
    <tr>
      <td>LD00013</td>
      <td>Suvendu</td>
      <td>10-09-2023</td>
      <td>Approved</td>
      <td>sk</td>
      <td>10-10-2023</td>
    </tr>
  </tbody>
</table>
    
    <div className='back-button'>
    <button type="button">Back</button>
    </div></div>
    </form>

    
    
  );
};


export default HistoryPage;