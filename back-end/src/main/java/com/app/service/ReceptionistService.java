package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.dto.AddBillDto;
import com.app.dto.AppointmentDto;
import com.app.dto.AppointmentListDto;
import com.app.dto.FinalBillDto;
import com.app.dto.PatientDto;
import com.app.models.AppUser;
import com.app.models.Appointment;
import com.app.models.AppointmentSlots;
import com.app.models.Bill;
import com.app.models.Doctor;
import com.app.models.Patient;

public interface ReceptionistService {

	Patient addPatient(PatientDto patient);
	
	List<AppUser> showAllReceptionist();
	

	Patient getPatient(Integer patientId); 
	
	List<Doctor> getDoctorList();
	
	List<AppointmentSlots> getSlots(Integer doctorId);
	
	String addAppointment(AppointmentDto appointmentDto);
	
	List<AppointmentListDto> getAllAppointments(LocalDate appointmentdate);
	
	FinalBillDto getBill(Integer appointmentId);

	Bill addBillToDb(AddBillDto bill);
	
	String updateBillStatus(Integer appointmentId);
}
