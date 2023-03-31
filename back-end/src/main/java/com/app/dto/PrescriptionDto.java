package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionDto {
	private String assignedMedicine;
	private String label;
	private Integer medicineId;
	private double price;
	private Integer quantityAssigned;
	private Integer stock;
	private String value;
	
}
