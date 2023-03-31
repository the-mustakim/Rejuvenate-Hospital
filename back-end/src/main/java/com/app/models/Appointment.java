package com.app.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Appointments")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Appointment {
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private Integer appointmentId;
	
	@CreationTimestamp
	private LocalDate appointmentTakenDate;
	
	
	private LocalDate appointmentDate;
	
	private String problemDescription;
	
	@Enumerated(EnumType.STRING)
	private TreatmentStatus treatmentStatus;
	
	@Enumerated(EnumType.STRING)
	private BillStatus billStatus;
	
	
	@OneToOne
	@JoinColumn(name="doctor_id")
	@NotNull
	private Doctor doctor;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	@NotNull
	private Patient patient;
	
	@OneToOne
	@JoinColumn(name = "appointmentslot_id")
	@NotNull
	private AppointmentSlots appointmentSlot;

	
	@Override
	public String toString() {
		return "Appointment [appointmentId=" + appointmentId + ", appointmentTakenDate=" + appointmentTakenDate
				+ ", appointmentDate=" + appointmentDate + ", problemDescription=" + problemDescription
				+ ", treatmentStatus=" + treatmentStatus + ", billStatus=" + billStatus + "]";
	}

	public Appointment(LocalDate appointmentTakenDate, LocalDate appointmentDate, String problemDescription,
			TreatmentStatus treatmentStatus, BillStatus billStatus, @NotNull Doctor doctor, @NotNull Patient patient,
			@NotNull AppointmentSlots appointmentSlot) {
		super();
		this.appointmentTakenDate = appointmentTakenDate;
		this.appointmentDate = appointmentDate;
		this.problemDescription = problemDescription;
		this.treatmentStatus = treatmentStatus;
		this.billStatus = billStatus;
		this.doctor = doctor;
		this.patient = patient;
		this.appointmentSlot = appointmentSlot;
	}
	
	
	
	

}
