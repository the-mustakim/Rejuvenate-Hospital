package com.app.models;

import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name="Appointmentslots")
public class AppointmentSlots {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer appointmentSlotId;
	
	private LocalTime startTime;
	
	private LocalTime endTime;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@ManyToOne
	@JoinColumn(name = "doctor_id")
	@NotNull
	private Doctor doctor;
	
	public AppointmentSlots(LocalTime startTime, LocalTime endTime, Status status, @NotNull Doctor doctor) {
		super();
		this.startTime = startTime;
		this.endTime = endTime;
		this.status = status;
		this.doctor = doctor;
	}

}
