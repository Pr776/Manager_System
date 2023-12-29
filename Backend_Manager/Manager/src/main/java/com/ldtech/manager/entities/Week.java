package com.ldtech.manager.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "weeks")
public class Week {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long weekId;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;


    public boolean containsDate(LocalDate date){
        return !date.isBefore(startDate) && !date.isAfter(endDate);
    }
}
