package com.app.models;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="prescriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Prescription {

	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer prescriptionId;
	
	private String assignedMedicine;
	
	private int quantityAssigned;
	
	private double price;
	
	@ManyToOne
	@JoinColumn(name = "appointment_id")
	@NotNull
	private Appointment appointment;
	
	
	@ManyToOne
	@JoinColumn(name = "medicine_id")
	@NotNull
	private Medicine medicine;
	
	
	@Override
	public String toString() {
		return "Prescription [prescriptionId=" + prescriptionId + ", assignedMedicine=" + assignedMedicine
				+ ", quantityAssigned=" + quantityAssigned + ", price=" + price + "]";
	}


	public Prescription(String assignedMedicine, int quantityAssigned, double price, @NotNull Appointment appointment,
			@NotNull Medicine medicine) {
		super();
		this.assignedMedicine = assignedMedicine;
		this.quantityAssigned = quantityAssigned;
		this.price = price;
		this.appointment = appointment;
		this.medicine = medicine;
	}

	
}
