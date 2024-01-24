package com.ldtech.manager.services.impl;

import com.ldtech.manager.dtos.EmployeeDto;
import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.entities.Timesheet;
import com.ldtech.manager.entities.Week;
import com.ldtech.manager.exceptions.ResourceNotFoundException;
import com.ldtech.manager.repositories.EmployeeRepository;
import com.ldtech.manager.repositories.TimesheetRepository;
import com.ldtech.manager.repositories.WeekRepository;
import com.ldtech.manager.services.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private TimesheetRepository timesheetRepository;
    private WeekRepository weekRepository;

    @Autowired
    private ModelMapper modelMapper;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, TimesheetRepository timesheetRepository, WeekRepository weekRepository) {
        this.employeeRepository = employeeRepository;
        this.timesheetRepository = timesheetRepository;
        this.weekRepository = weekRepository;
    }

    @Override
    public EmployeeDto searchById(long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));
        EmployeeDto employeeDto = modelMapper.map(employee, EmployeeDto.class);
        return employeeDto;
    }

    @Override
    public EmployeeDto searchByEmployeeId(String empId) {

        Employee employee = null;
        try {
            employee = employeeRepository.findByEmpId(empId);

        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceNotFoundException("Employee", "empId", empId);
        }
        EmployeeDto employeeDto = modelMapper.map(employee, EmployeeDto.class);
        return employeeDto;
    }

    @Override
    public EmployeeDto searchByEmployeeName(String empName) {
        Employee employee = null;
        try {
            employee = employeeRepository.findByEmpName(empName);

        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceNotFoundException("Employee", "empName", empName);
        }
        EmployeeDto employeeDto = modelMapper.map(employee, EmployeeDto.class);
        return employeeDto;
    }

    @Override
    public List<EmployeeDto> searchByStatus(String status) {
        List<Employee> employees = null;
        try {
            employees = employeeRepository.findByTimesheetStatus(status);

            for(Employee employee : employees){
                Timesheet timesheet = timesheetRepository.findById(employee.getTimesheet().getTimesheetId()).orElse(null);
                Week week = weekRepository.findById(employee.getWeek().getWeekId()).orElse(null);
//                    weekRepository.findById(employee.getWeek().stream().map(week -> week.getWeekId());
//                 set the fetched timesheet and Week in the employee
                employee.setTimesheet(timesheet);
                employee.setWeek(week);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceNotFoundException("Employees", "Status", status);
        }

        List<EmployeeDto> employeeDtos = employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).collect(Collectors.toList());
        return employeeDtos;
    }

    @Override
    public List<EmployeeDto> searchByClient(String client) {
        List<Employee> employees = null;
        try {
            employees = employeeRepository.findByProjectClient(client);

            for(Employee employee : employees){
                Timesheet timesheet = timesheetRepository.findById(employee.getTimesheet().getTimesheetId()).orElse(null);
                Week week = weekRepository.findById(employee.getWeek().getWeekId()).orElse(null);

                employee.setTimesheet(timesheet);
                employee.setWeek(week);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceNotFoundException("Employees", "client", client);
        }

        List<EmployeeDto> employeeDtos = employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).collect(Collectors.toList());
        return employeeDtos;
    }

    @Override
    public List<EmployeeDto> searchByDepartment(String department) {
        List<Employee> employees = null;
        try {
            employees = employeeRepository.findByTimesheetDepartment(department);

            for (Employee employee : employees){
                Timesheet timesheet = timesheetRepository.findById(employee.getTimesheet().getTimesheetId()).orElse(null);
                Week week = weekRepository.findById(employee.getWeek().getWeekId()).orElse(null);

                employee.setTimesheet(timesheet);
                employee.setWeek(week);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceNotFoundException("Employees", "department", department);
        }
        List<EmployeeDto> employeeDtos = employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).collect(Collectors.toList());
        return employeeDtos;
    }

    @Override
    public EmployeeDto saveEmployee(EmployeeDto employeeDto) {
        Employee employee = modelMapper.map(employeeDto, Employee.class);

        Employee employee1 = employeeRepository.save(employee);

        EmployeeDto employeeDto1 = modelMapper.map(employee1, EmployeeDto.class);
        return employeeDto1;
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> allEmployees = employeeRepository.findAll();

        List<EmployeeDto> employees = allEmployees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).collect(Collectors.toList());
        return employees;
    }


    // Dashboard is not complete
    @Override
    public List<EmployeeDto> getDashboard() {
//        LocalDate entryDate = LocalDate.now();

//        Week week = new Week(1L, LocalDate.of(2024, 01, 01), LocalDate.of(2024, 01, 05));


//        List<Employee> employees = employeeRepository.findEmployeesByTimesheetEntryDateAndTimesheetStatus(entryDate, "Pending");
//        List<Employee> employees = employeeRepository.findEmployeesByWeekAndTimesheetStatus(week, "Pending");
//        employeeRepository.findEmployeesByWeek(week);
        List<Employee> employees = new ArrayList<>();

//        for (LocalDate date : week){
//
//        }
//
        for (Employee employee : employees){
            Timesheet timesheet = timesheetRepository.findById(employee.getTimesheet().getTimesheetId()).orElse(null);

            employee.setTimesheet(timesheet);
        }

        List<EmployeeDto> employeeDtos = employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).collect(Collectors.toList());
        return employeeDtos;
    }

    @Override
    public Employee createEmployee(Employee employee) {
       return employeeRepository.save(employee);

    }
}
