package com.app.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Integer patientId;
	

	@NotNull
	@Enumerated(EnumType.STRING)
	private BloodGroup bloodGroup;
	@NotBlank
	@NotNull
	private String medicalHistory;

	@OneToOne
	@JoinColumn(name = "user_id")
	@NotNull
	private AppUser user;
	
	
	
	public Patient(BloodGroup bloodGroup, String medicalHistory, @NotNull AppUser user) {
		super();
		this.bloodGroup = bloodGroup;
		this.medicalHistory = medicalHistory;
		this.user = user;
	}

	
	}
	

