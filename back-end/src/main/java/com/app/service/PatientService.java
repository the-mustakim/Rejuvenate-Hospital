package com.app.service;

import java.util.List;

import com.app.dto.PatientDto;
import com.app.models.AppUser;
import com.app.models.Appointment;
import com.app.models.Patient;

public interface PatientService {
	
	List<Patient> showAllPatient();

	List<Appointment> getAllAppointements(Integer userId);

	Patient getPatient(Integer userId);
	
	AppUser updatePatient(PatientDto patient,Integer userId);

}

