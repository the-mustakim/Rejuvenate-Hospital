package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.DoctorDto;
import com.app.dto.PrescriptionDto;
import com.app.models.AppUser;
import com.app.models.Appointment;
import com.app.models.Doctor;
import com.app.models.Medicine;
import com.app.models.Prescription;
import com.app.models.Role;

public interface DoctorService {
	
	List<Doctor> showAllDoctor();
	
	List<Appointment> getAllAppointment(Integer userId);
	
	Appointment getAppointment(Integer appointmentId);
	
	Appointment updateAppointment(Integer appointmentId,Appointment appointment);
	
	List<Medicine> getAllMedicines();
	
	StringBuilder assignPrescription(List<PrescriptionDto> assignedMedicines,Integer appointmentId);
	
	List<Prescription> getAllprescription();
	
	Optional<Doctor> findById(Integer doctorID);
	
	List<Doctor> findByName(String Name);

	Doctor getDoctor(String email);
	
	Doctor updateDoctor(Integer doctorId,DoctorDto doctor);
}
