package com.ldtech.manager.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "weeks")
public class Week {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dateId;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate entryDate;

//    @Temporal(TemporalType.DATE)
//    @JsonFormat(pattern = "yyyy-MM-dd")
//    private LocalDate startDate;
//
//    @Temporal(TemporalType.DATE)
//    @JsonFormat(pattern = "yyyy-MM-dd")
//    private LocalDate endDate;

//    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinTable(
//            name = "employees_weeks",
//            joinColumns = @JoinColumn(name = "week_id", referencedColumnName = "week_id"),
//            inverseJoinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id")
//    )

//    @OneToMany()
//    private List<Employee> employees;

//    public boolean containsDate(LocalDate date){
//        return !date.isBefore(startDate) && !date.isAfter(endDate);
//    }
}
