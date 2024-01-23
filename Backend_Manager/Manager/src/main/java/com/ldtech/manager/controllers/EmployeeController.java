package com.ldtech.manager.controllers;

import com.ldtech.manager.dtos.EmployeeDto;
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
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        // Save the Week entity first to ensure it has an ID generated
        Week week = employeeDto.getWeek();
        Week week1 = weekService.saveWeek(week);

        Timesheet timesheet = employeeDto.getTimesheet();
        Timesheet timesheet1 = timesheetService.saveTimesheet(timesheet);

        employeeDto.setTimesheet(timesheet1);
        employeeDto.setWeek(week1);
        EmployeeDto employeeDto1 = employeeService.saveEmployee(employeeDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(employeeDto1);
    }

    // get all employees
    @GetMapping()
    public ResponseEntity<List<EmployeeDto>> getAllEmployess(){
        List<EmployeeDto> allEmployees = employeeService.getAllEmployees();
        return ResponseEntity.ok(allEmployees);
    }


    // get employee by id
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> searchById(@PathVariable("id") long id){
        EmployeeDto employeeDto = employeeService.searchById(id);
        return ResponseEntity.ok(employeeDto);
    }

    // get employee by empId
    @GetMapping("/empId/{empId}")
    public ResponseEntity<EmployeeDto> searchByEmpId(@PathVariable("empId") String empId){
        EmployeeDto employeeDto = employeeService.searchByEmployeeId(empId);
        return ResponseEntity.ok(employeeDto);
    }

    // get employee by name
    @GetMapping("/name/{empName}")
    public ResponseEntity<EmployeeDto> searchByEmployeeName(@PathVariable String empName){
        EmployeeDto employee = employeeService.searchByEmployeeName(empName);
        return ResponseEntity.ok(employee);
    }



//     get employees by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<EmployeeDto>> searchByStatus(@PathVariable String status){
        List<EmployeeDto> employees = employeeService.searchByStatus(status);
        return ResponseEntity.ok(employees);
    }

    // get employees by client
    @GetMapping("/client/{client}")
    public ResponseEntity<List<EmployeeDto>> searchByClient(@PathVariable String client){
        List<EmployeeDto> employees = employeeService.searchByClient(client);
        return ResponseEntity.ok(employees);
    }

    //get employees by department
    @GetMapping("/department/{department}")
    public ResponseEntity<List<EmployeeDto>> searchByDepartment(@PathVariable String department){
        List<EmployeeDto> employees = employeeService.searchByDepartment(department);
        return ResponseEntity.ok(employees);
    }

    // Manager Dashboard api
    @GetMapping("/dashboard")
    public ResponseEntity<List<EmployeeDto>> getManagerDashboard(){
        List<EmployeeDto> employeeList = employeeService.getDashboard();
        return ResponseEntity.ok(employeeList);
    }

}
