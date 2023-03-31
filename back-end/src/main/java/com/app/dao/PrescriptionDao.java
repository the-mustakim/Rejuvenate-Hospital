package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.models.Prescription;

public interface PrescriptionDao extends JpaRepository<Prescription, Integer> {
	
	List<Prescription> findAllByAppointmentAppointmentId(Integer appointmentId);

}
