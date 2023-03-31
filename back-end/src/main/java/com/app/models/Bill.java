package com.app.models;


import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Bills")
public class Bill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer billId;
	
	@CreationTimestamp
	private LocalDate billingDate;
	
	private double totalMedicinePrice;
	private double treatementFees;
	
	private double totalPrice;
	
	@OneToOne
	@JoinColumn(name = "appointment_id")
	@NotNull
	private Appointment appointment;

	@Override
	public String toString() {
		return "FinalBill [billId=" + billId + ", billing_date=" + billingDate + ", totalMedicinePrice="
				+ totalMedicinePrice + ", treatementFees=" + treatementFees + "]";
	}
	
	
	

	public Bill(LocalDate billingDate, double totalMedicinePrice, double treatementFees, double totalPrice,
			@NotNull Appointment appointment) {
		super();
		this.billingDate = billingDate;
		this.totalMedicinePrice = totalMedicinePrice;
		this.treatementFees = treatementFees;
		this.appointment = appointment;
		this.totalPrice=totalPrice;
	}




	public Bill(LocalDate billingDate, double totalMedicinePrice, double treatementFees, double totalPrice) {
		super();
		this.billingDate = billingDate;
		this.totalMedicinePrice = totalMedicinePrice;
		this.treatementFees = treatementFees;
		this.totalPrice = totalPrice;
	}
	
	
	
	
	
}
