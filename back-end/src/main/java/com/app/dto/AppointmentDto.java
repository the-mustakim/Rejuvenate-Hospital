package com.app.dto;

import java.time.LocalDate;

import com.app.models.BillStatus;
import com.app.models.TreatmentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {

 	private LocalDate appointmentTakenDate;
	private LocalDate appointmentDate;
	private String problemDescription;
	private TreatmentStatus treatmentStatus;
	private BillStatus billStatus;
	
	private Integer patientId;
	private Integer doctorId;
	private Integer appointmentSlotId;
	
	
}
