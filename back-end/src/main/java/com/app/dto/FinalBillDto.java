package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.app.models.BloodGroup;
import com.app.models.Department;
import com.app.models.Prescription;
import com.app.models.TreatmentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FinalBillDto {
	
	private Integer appointmentId;
	private LocalDate billingDate;
	private String firstName;
	private String lastName;
	private String email;
	private int age;
	private String mobNo;
	private String DoctorName;
	@Enumerated(EnumType.STRING)
	private Department department;
	private List<Prescription> prescriptionList;
	private double totalMedicinePrice;
	private double treatementFees;
	private double totalPrice;
}
