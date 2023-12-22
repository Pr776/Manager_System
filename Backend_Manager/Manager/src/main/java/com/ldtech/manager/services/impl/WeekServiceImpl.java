package com.ldtech.manager.services.impl;

import com.ldtech.manager.entities.Week;
import com.ldtech.manager.exceptions.ResourceNotFoundException;
import com.ldtech.manager.repositories.WeekRepository;
import com.ldtech.manager.services.WeekService;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;

@Service
public class WeekServiceImpl implements WeekService {

    private WeekRepository weekRepository;

    public WeekServiceImpl(WeekRepository weekRepository) {
        this.weekRepository = weekRepository;
    }

    @Override
    public Week saveWeek(Week week) {
        Week week1 = weekRepository.save(week);
        return week1;
    }

    @Override
    public List<Week> getAllWeeks() {
        List<Week> allWeek = weekRepository.findAll();
        return allWeek;

    }

    @Override
    public Week getWeekById(long weekId) {
        Week week = weekRepository.findById(weekId).orElseThrow(() -> new ResourceNotFoundException("Date", "weekId", weekId));
        return week;
    }

    @Override
    public void deleteWeek(long weekId) {
        weekRepository.deleteById(weekId);
    }


}
