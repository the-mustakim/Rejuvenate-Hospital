package com.app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddBillDto {
	private LocalDate billingDate;
	private double totalMedicinePrice;
	private double treatementFees;
	private double totalPrice;
	private Integer appointmentId;
	
	
	public AddBillDto(LocalDate billingDate, double totalMedicinePrice, double treatementFees, double totalPrice) {
		super();
		this.billingDate = billingDate;
		this.totalMedicinePrice = totalMedicinePrice;
		this.treatementFees = treatementFees;
		this.totalPrice = totalPrice;
	}
	
	
}


