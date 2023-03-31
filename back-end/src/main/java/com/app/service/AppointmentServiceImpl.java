package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AppointmentDao;
import com.app.models.AppUser;
import com.app.models.Appointment;
import com.app.models.Doctor;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

	
	@Autowired
	private AppointmentDao appointmentDao;
	
	@Override
	public int countAllAppointments() {
		
		//retrieves the total number of appointments stored in the database
		return (int)appointmentDao.count() ;
	}

	@Override
	public Optional<Appointment> findById(Integer appointmentId) {
		//retrieves an appointment by its ID from the database
		return appointmentDao.findById(appointmentId);
	}
	
	
	@Override
	public List<Appointment> findByName(String patientName) {
		//retrieves all appointments that match a given patient name 
		return appointmentDao.findByPatientName(patientName);
	}

	@Override
	public List<Appointment> showAllAppointments() {
		//retrieves all appointments stored in the database
		return appointmentDao.findAll();
	}

	
}
