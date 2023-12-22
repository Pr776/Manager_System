package com.ldtech.manager.services;

import com.ldtech.manager.entities.Employee;

import java.util.List;

public interface EmployeeService {

    Employee searchByEmployeeId(long empId);
    Employee searchByEmployeeName(String empName);
    List<Employee> searchByStatus(String status);
    List<Employee> searchByClient(String client);
    List<Employee> searchByDepartment(String department);


    // add method for demo data
    Employee saveEmployee(Employee employee);

    List<Employee> getAllEmployees();
}
