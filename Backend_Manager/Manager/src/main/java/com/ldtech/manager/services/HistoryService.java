package com.ldtech.manager.services;

import com.ldtech.manager.entities.Employee;
import com.ldtech.manager.payload.HistoryRequest;

import java.util.List;

public interface HistoryService {
    List<Employee> searchEmployeesWithRangedDate(HistoryRequest hRequest);

    List<Employee> searchEmployeesByEmpIdWithRangedDate(String empId, HistoryRequest historyRequest);

    List<Employee> searchEmployeesByEmpNameWithRangedDate(String empName, HistoryRequest historyRequest);

    List<Employee> searchEmployeesByStatusWithRangedDate(String status, HistoryRequest historyRequest);
}
