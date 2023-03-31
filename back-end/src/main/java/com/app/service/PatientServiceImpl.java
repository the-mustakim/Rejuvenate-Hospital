package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.AppointmentDao;
import com.app.dao.PatientDao;
import com.app.dao.UserDao;
import com.app.dto.PatientDto;
import com.app.models.AppUser;
import com.app.models.Appointment;
import com.app.models.Patient;

@Transactional
@Service
public class PatientServiceImpl implements PatientService {
	
	@Autowired
	private PatientDao patientDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private AppointmentDao appointmentDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public PatientServiceImpl()
	{
		System.out.println(getClass().getName());
	}

	@Override
	public List<Appointment> getAllAppointements(Integer userId) {
		Patient patient= patientDao.getByUserId(userId);
		//This method retrieves all the appointments of a particular patient with the provided userId
		return appointmentDao.getAllAppointment(patient.getPatientId());
	}

	@Override
	public Patient getPatient(Integer userId) {
		//This method retrieves the patient record from the database with the provided userId
		return patientDao.getByUserId(userId);
	}

	@Override
	public List<Patient> showAllPatient() {
		//This method retrieves all the patients available
		return patientDao.findAll();
	}

	@Override
	public AppUser updatePatient(PatientDto patient, Integer userId) {
		//This method updates the patient record with the provided patient and userId
		AppUser user=userDao.findById(userId).orElseThrow();
		user.setAddress(patient.getAddress());
		user.setAge(patient.getAge());
		user.setEmail(patient.getEmail());
		user.setFirstName(patient.getFirstName());
		user.setGender(patient.getGender());
		user.setLastName(patient.getLastName());
		user.setMobNo(patient.getMobNo());
		
		if(patient.getPassword().length()<15) {
			System.out.println(patient.getPassword().length()+" length");
			user.setPassword(passwordEncoder.encode(patient.getPassword()));
		}
		else {
			user.setPassword(patient.getPassword());
		}
		
		user.setRole(patient.getRole());
		user.setSecurityQuestion(patient.getSecurityQuestion());
		user.setSecurityAnswer(patient.getSecurityAnswer());
		user.setAddress(patient.getAddress());
		userDao.saveAndFlush(user);
//		Patient updatedPatient=patientDao.findPatient(userId);
//		updatedPatient.setBloodGroup(patient.getBloodGroup());
//		updatedPatient.setMedicalHistory(patient.getMedicalHistory());
		//patientDao.saveAndFlush(updatedPatient);
		return user;
	}

	

}
