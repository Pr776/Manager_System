package com.ldtech.manager.services;

import com.ldtech.manager.dtos.EmployeeDto;

import java.util.List;

public interface EmployeeService {


    // add method for demo data
    EmployeeDto saveEmployee(EmployeeDto employeeDto);

    // get all employees
    List<EmployeeDto> getAllEmployees();

    // get employees by id
    EmployeeDto searchById(long id);

    // get employees by empId
    EmployeeDto searchByEmployeeId(String empId);

    // get employees by empName
    EmployeeDto searchByEmployeeName(String empName);

    // get emloyees by status
    List<EmployeeDto> searchByStatus(String status);

    // get employees by client
    List<EmployeeDto> searchByClient(String client);

    // get employees by departments
    List<EmployeeDto> searchByDepartment(String department);






    // Manager dashboard with curent week data and status pending
    List<EmployeeDto> getDashboard();


}
