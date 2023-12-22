package com.ldtech.manager.services;

import com.ldtech.manager.entities.Timesheet;

import java.util.List;

public interface TimesheetService {
    Timesheet saveTimesheet(Timesheet timesheet);

    List<Timesheet> getallTimeSheet();

    Timesheet getTimeSheetbyId(long timesheetId);

    List<Timesheet> searchByStatus(String status);
}
