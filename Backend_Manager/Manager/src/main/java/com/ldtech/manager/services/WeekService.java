package com.ldtech.manager.services;

import com.ldtech.manager.entities.Week;

import java.util.List;

public interface WeekService {
    Week saveWeek(Week week);

    List<Week> getAllWeeks();

    Week getWeekById(long weekId);

    void deleteWeek(long weekId);

}
