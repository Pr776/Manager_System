package com.ldtech.manager.services.impl;

import com.ldtech.manager.dtos.EmployeeDto;
import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.entities.Project;
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

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
                Week week = weekRepository.findById(employee.getWeek().getDateId()).orElse(null);
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
            employees = employeeRepository.findByProjects_Client(client);

            for(Employee employee : employees){
                Timesheet timesheet = timesheetRepository.findById(employee.getTimesheet().getTimesheetId()).orElse(null);
                Week week = weekRepository.findById(employee.getWeek().getDateId()).orElse(null);

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
                Week week = weekRepository.findById(employee.getWeek().getDateId()).orElse(null);

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
        LocalDate currentDate = LocalDate.now();
// Find the start and end dates of the current week
        LocalDate startDate = currentDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endDate = startDate.plusDays(4);

        List<Employee> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<Employee> employees = employeeRepository.findEmployeesByWeekEntryDate(date);
            employeeList.addAll(employees);

        }


//        List<Employee> employees = employeeRepository.findEmployeesByTimesheetEntryDateAndTimesheetStatus(entryDate, "Pending");
//        List<Employee> employees = employeeRepository.findEmployeesByWeekAndTimesheetStatus(week, "Pending");
//        employeeRepository.findEmployeesByWeek(week);

//        for (LocalDate date : week){
//
//        }
//
        for (Employee employee : employeeList){
            Timesheet timesheet = timesheetRepository.findById(employee.getTimesheet().getTimesheetId()).orElse(null);
            employee.setTimesheet(timesheet);
        }

        System.out.println(employeeList);
        List<Employee> listEmployee = new ArrayList<>();
        for (Employee employee : employeeList){
            System.out.println(employee);

           if("Pending".equals(employee.getTimesheet().getStatus())){
              listEmployee.add(employee);
           }
        }
        System.out.println(listEmployee);

        List<EmployeeDto> employeeDtos = listEmployee.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).collect(Collectors.toList());
        return employeeDtos;
    }

    @Override
    public Employee createEmployee(Employee employee) {
       return employeeRepository.save(employee);

    }

    @Override
    public Employee updateEmployeeByEmpId(String empId, String status, Employee employee) {
        // getting the employee
        Employee savedEmployee = employeeRepository.findByEmpId(empId);

        // updating the employee
        savedEmployee.setWeek(employee.getWeek());
        savedEmployee.setTimesheet(employee.getTimesheet());
        savedEmployee.setProjects(employee.getProjects());

        // saving in the database
        Employee updatedEmployee = employeeRepository.save(savedEmployee);

        return updatedEmployee;

    }

    @Override
    public Employee searchAndSaveAcitivity(String empId, Employee employee) {
        // getting the employee
        Employee employee1 = employeeRepository.findByEmpId(empId);

        // setting up the employee details
        employee1.setWeek(employee.getWeek());
        employee1.setTimesheet(employee.getTimesheet());
        employee1.setProjects(employee.getProjects());

        // saving the employee
        Employee saved = employeeRepository.save(employee1);

        return saved;
    }

    @Override
    public List<EmployeeDto> searchByEmployeeIdInTimesheet(String empId) {
        List<Employee> employees = employeeRepository.findEmployeesByEmpId(empId);

        List<EmployeeDto> employeeDtos = employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).collect(Collectors.toList());
        return employeeDtos;
    }
//---------------------------------------------------------------------------------
    @Override
    public Set<Project> getProjectsByEmployeeId(String empId) {
        Employee employee = employeeRepository.findByEmpId(empId);
        Optional<Employee> employeeOptional = employeeRepository.findById(employee.getId());
        if (employeeOptional.isPresent()) {
//            return employeeOptional.get().getProjects();
            return  null;
        } else {
            return null;
        }
    }
}
