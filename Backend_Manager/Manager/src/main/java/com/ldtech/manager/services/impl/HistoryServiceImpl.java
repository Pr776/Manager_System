package com.ldtech.manager.services.impl;

import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.payload.HistoryRequest;
import com.ldtech.manager.repositories.EmployeeRepository;
import com.ldtech.manager.services.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> searchEmployeesWithRangedDate(HistoryRequest hRequest) {
        LocalDate startDate = hRequest.getStartDate();
        LocalDate endDate = hRequest.getEndDate();

        List<Employee> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<Employee> employees = employeeRepository.findEmployeesByWeekEntryDate(date);
            employeeList.addAll(employees);

        }
        return employeeList;
    }

    @Override
    public List<Employee> searchEmployeesByEmpIdWithRangedDate(String empId, HistoryRequest historyRequest) {
        LocalDate startDate = historyRequest.getStartDate();
        LocalDate endDate = historyRequest.getEndDate();

        List<Employee> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            Employee employee = employeeRepository.findByEmpIdAndWeekEntryDate(empId, date);
            System.out.println(employee);
            employeeList.add(employee);
        }

        return employeeList;
    }

    @Override
    public List<Employee> searchEmployeesByEmpNameWithRangedDate(String empName, HistoryRequest historyRequest) {
        LocalDate startDate = historyRequest.getStartDate();
        LocalDate endDate = historyRequest.getEndDate();

        List<Employee> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            Employee employee = employeeRepository.findByEmpNameAndWeekEntryDate(empName, date);

            employeeList.add(employee);
        }

        return employeeList;
    }

    @Override
    public List<Employee> searchEmployeesByStatusWithRangedDate(String status, HistoryRequest historyRequest) {
        LocalDate startDate = historyRequest.getStartDate();
        LocalDate endDate = historyRequest.getEndDate();

        List<Employee> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<Employee> employees = employeeRepository.findEmployeeByTimesheetStatusAndWeekEntryDate(status, date);

            employeeList.addAll(employees);
        }

        return employeeList;
    }
}
