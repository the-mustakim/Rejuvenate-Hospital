package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.models.AppUser;
import com.app.models.Appointment;

public interface AppointmentService {

	int countAllAppointments();	
	
	Optional<Appointment> findById(Integer appointmentId);
	
	List<Appointment> findByName(String patientName);
	
	List<Appointment> showAllAppointments();
}
