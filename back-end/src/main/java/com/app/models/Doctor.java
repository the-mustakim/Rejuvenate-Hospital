package com.app.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="doctors")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Doctor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer doctorId;
	
	@Enumerated(EnumType.STRING)
	private Department department;
	
	private double treatmentFees;
	
	@Enumerated(EnumType.STRING)
	private Availability isAvailable;
	
	@OneToOne
	@JoinColumn(name = "user_id")
	@NotNull
	private AppUser user;

	@Override
	public String toString() {
		return "Doctor [department=" + department + ", TreatmentFees=" + treatmentFees + ", isAvailable=" + isAvailable
				+ "]";
	}

	public Doctor(Department department, double treatmentFees, Availability isAvailable, @NotNull AppUser user) {
		this.department = department;
		this.treatmentFees = treatmentFees;
		this.isAvailable = isAvailable;
		this.user = user;
	}
	
	
}
