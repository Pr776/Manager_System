package com.ldtech.manager.services;

import com.ldtech.manager.entities.Employee;

import java.util.List;

public interface EmployeeService {

    Employee searchById(long id);
    Employee searchByEmployeeId(String empId);
    Employee searchByEmployeeName(String empName);
    List<Employee> searchByStatus(String status);
    List<Employee> searchByClient(String client);
    List<Employee> searchByDepartment(String department);


    // add method for demo data
    Employee saveEmployee(Employee employee);

    List<Employee> getAllEmployees();


    // Manager dashboard with curent week data and status pending
    List<Employee> getDashboard();


}
