package com.ldtech.manager.services.impl;

import com.ldtech.manager.entities.Timesheet;
import com.ldtech.manager.exceptions.ResourceNotFoundException;
import com.ldtech.manager.repositories.TimesheetRepository;
import com.ldtech.manager.services.TimesheetService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimesheetServiceImpl implements TimesheetService {

    private TimesheetRepository timesheetRepository;

    public TimesheetServiceImpl(TimesheetRepository timesheetRepository) {
        this.timesheetRepository = timesheetRepository;
    }

    @Override
    public Timesheet saveTimesheet(Timesheet timesheet) {
        Timesheet timesheet1 = timesheetRepository.save(timesheet);
        return timesheet1;
    }

    @Override
    public List<Timesheet> getallTimeSheet() {
        List<Timesheet> timesheetList = timesheetRepository.findAll();
        return timesheetList;
    }

    @Override
    public Timesheet getTimeSheetbyId(long timesheetId) {
        Timesheet timesheet = timesheetRepository.findById(timesheetId).orElseThrow(() -> new ResourceNotFoundException("Timesheet", "timesheetId", timesheetId));
        return timesheet;
    }

    @Override
    public List<Timesheet> searchByStatus(String status) {
        List<Timesheet> allByStatus = timesheetRepository.findAllByStatus(status);
        return allByStatus;
    }
}
