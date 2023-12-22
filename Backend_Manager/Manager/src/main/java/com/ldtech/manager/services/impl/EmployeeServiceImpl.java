package com.ldtech.manager.services.impl;

import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.entities.Timesheet;
import com.ldtech.manager.entities.Week;
import com.ldtech.manager.exceptions.ResourceNotFoundException;
import com.ldtech.manager.repositories.EmployeeRepository;
import com.ldtech.manager.repositories.TimesheetRepository;
import com.ldtech.manager.repositories.WeekRepository;
import com.ldtech.manager.services.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private TimesheetRepository timesheetRepository;
    private WeekRepository weekRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, TimesheetRepository timesheetRepository, WeekRepository weekRepository) {
        this.employeeRepository = employeeRepository;
        this.timesheetRepository = timesheetRepository;
        this.weekRepository = weekRepository;
    }

    @Override
    public Employee searchByEmployeeId(long empId) {
        Employee employee = employeeRepository.findById(empId).orElseThrow(() -> new ResourceNotFoundException("Employee", "empId", empId));
        return employee;
    }

    @Override
    public Employee searchByEmployeeName(String empName) {
        Employee byName = employeeRepository.findByEmpName(empName);
        return byName;
    }

    @Override
    public List<Employee> searchByStatus(String status) {
        List<Employee> employees = employeeRepository.findByTimesheetStatus(status);

        for(Employee employee : employees){
            Timesheet timesheet = timesheetRepository.findById(employee.getTimesheet().getTimesheetId()).orElse(null);
            Week week = weekRepository.findById(employee.getWeek().getWeekId()).orElse(null);

            // set the fetched timesheet and Week in the employee
            employee.setTimesheet(timesheet);
            employee.setWeek(week);
        }
        return employees;
    }

    @Override
    public List<Employee> searchByClient(String client) {
        List<Employee> employees = employeeRepository.findByTimesheetClient(client);

        for(Employee employee : employees){
            Timesheet timesheet = timesheetRepository.findById(employee.getTimesheet().getTimesheetId()).orElse(null);
            Week week = weekRepository.findById(employee.getWeek().getWeekId()).orElse(null);

            employee.setTimesheet(timesheet);
            employee.setWeek(week);
        }
        return employees;
    }

    @Override
    public List<Employee> searchByDepartment(String department) {
        List<Employee> employees = employeeRepository.findByTimesheetDepartment(department);

        for (Employee employee : employees){
            Timesheet timesheet = timesheetRepository.findById(employee.getTimesheet().getTimesheetId()).orElse(null);
            Week week = weekRepository.findById(employee.getWeek().getWeekId()).orElse(null);

            employee.setTimesheet(timesheet);
            employee.setWeek(week);
        }
        return employees;
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        Employee employee1 = employeeRepository.save(employee);
        return employee1;
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<Employee> allEmployees = employeeRepository.findAll();
        return allEmployees;
    }
}
