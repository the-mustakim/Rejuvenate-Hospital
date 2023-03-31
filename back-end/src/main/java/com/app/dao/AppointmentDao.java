package com.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.models.Appointment;
import com.app.models.Doctor;

public interface AppointmentDao extends JpaRepository<Appointment, Integer> {

	@Query("select a from Appointment a where a.patient.patientId=?1")
	List<Appointment> getAllAppointment(@Param(value = "1") Integer patientId);
	
	@Query("select a from Appointment a where a.doctor.doctorId=?1")
	List<Appointment> findAllAppointment(@Param(value = "1") Integer doctorId);
	
	@Query("select a from Appointment a where a.patient.patientId=?1")
	Appointment findAppointment(@Param(value="1") Integer patientId);
	
	
	@Query("select a from Appointment a where a.patient.user.firstName=?1")
	List<Appointment> findByPatientName(@Param(value = "1") String patientName);
	
	List<Appointment> findByAppointmentDate(LocalDate appointmentdate);
	
}
