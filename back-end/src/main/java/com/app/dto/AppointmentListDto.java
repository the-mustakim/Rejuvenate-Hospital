package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.app.models.Address;
import com.app.models.BillStatus;
import com.app.models.BloodGroup;
import com.app.models.Gender;
import com.app.models.Role;
import com.app.models.TreatmentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentListDto {
	
	private Integer appointmentId;
	   
	private LocalDate appointmentTakenDate;
	
	private LocalDate appointmentDate;
	
	private LocalTime startTime;
	
	private LocalTime endTime;
	
	@Enumerated(EnumType.STRING)
	private TreatmentStatus treatmentStatus;
	
	private double totaltreatementFees;
	
	private BloodGroup bloodGroup;
	
	private String firstName;
	
	private String lastName;
	
	private int age;
	
	private String mobNo;
	
	private String DoctorName;
	
	@Enumerated(EnumType.STRING)
	private BillStatus billStatus;
	
	
}
