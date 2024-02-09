package com.ldtech.manager.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryRequest {
    private LocalDate startDate;
    private LocalDate endDate;
}
