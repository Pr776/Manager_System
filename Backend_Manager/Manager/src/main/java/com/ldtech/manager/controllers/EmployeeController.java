package com.ldtech.manager.controllers;

import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.entities.Timesheet;
import com.ldtech.manager.entities.Week;
import com.ldtech.manager.services.EmployeeService;
import com.ldtech.manager.services.TimesheetService;
import com.ldtech.manager.services.WeekService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private EmployeeService employeeService;
    private WeekService weekService;
    private TimesheetService timesheetService;

    public EmployeeController(EmployeeService employeeService, WeekService weekService, TimesheetService timesheetService) {
        this.employeeService = employeeService;
        this.weekService = weekService;
        this.timesheetService = timesheetService;
    }

    // CREATE METHOD FOR DEMO PURPOSE
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        // Save the Week entity first to ensure it has an ID generated
        Week week = employee.getWeek();
        Week week1 = weekService.saveWeek(week);

        Timesheet timesheet = employee.getTimesheet();
        Timesheet timesheet1 = timesheetService.saveTimesheet(timesheet);

        employee.setTimesheet(timesheet1);
        employee.setWeek(week1);
        Employee employee1 = employeeService.saveEmployee(employee);

        return ResponseEntity.status(HttpStatus.CREATED).body(employee1);
    }

    // get employee by id
    @GetMapping("/{empId}")
    public ResponseEntity<Employee> searchByEmpId(@PathVariable("empId") long empId){
        Employee employee = employeeService.searchByEmployeeId(empId);
        return ResponseEntity.ok(employee);
    }

    // get employee by name
    @GetMapping("/name/{empName}")
    public ResponseEntity<Employee> searchByEmployeeName(@PathVariable String empName){
        Employee employee = employeeService.searchByEmployeeName(empName);
        return ResponseEntity.ok(employee);
    }

    // get all employees
    @GetMapping()
    public ResponseEntity<List<Employee>> getAllEmployess(){
        List<Employee> allEmployees = employeeService.getAllEmployees();
        return ResponseEntity.ok(allEmployees);
    }

//     get employees by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Employee>> searchByStatus(@PathVariable String status){
        List<Employee> employees = employeeService.searchByStatus(status);
        return ResponseEntity.ok(employees);
    }

    // get employees by client
    @GetMapping("/client/{client}")
    public ResponseEntity<List<Employee>> searchByClient(@PathVariable String client){
        List<Employee> employees = employeeService.searchByClient(client);
        return ResponseEntity.ok(employees);
    }

    //get employees by department
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Employee>> searchByDepartment(@PathVariable String department){
        List<Employee> employees = employeeService.searchByDepartment(department);
        return ResponseEntity.ok(employees);
    }

}
