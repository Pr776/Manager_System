package com.ldtech.manager.services;

import com.ldtech.manager.dtos.EmployeeDto;
import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.entities.Project;

import java.util.List;
import java.util.Set;

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


    Employee createEmployee(Employee employee);

    Employee updateEmployeeByEmpId(String empId, String status, Employee employee);

    Employee searchAndSaveAcitivity(String empId, Employee employee);

    List<EmployeeDto> searchByEmployeeIdInTimesheet(String empId);

    //
    Set<Project> getProjectsByEmployeeId(String empId);
}
