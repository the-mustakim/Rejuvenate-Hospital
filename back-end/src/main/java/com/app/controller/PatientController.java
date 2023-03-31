package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.PatientDto;
import com.app.service.PatientService;
import com.app.service.ReceptionistService;

@RestController
@RequestMapping("/patient")
@CrossOrigin
public class PatientController {                                                                                                                                                         

	@Autowired
	private PatientService patientService;
	
	@Autowired
	private ReceptionistService receptionService;
	
	public PatientController()
	{
		System.out.println("Inside "+getClass().getName());
	}
	
	//This method fetch all the appointments of a patient for a given user ID
	@GetMapping("/getAppointments/{userId}")
	
	
	public ResponseEntity<?> getPatientAppointments(@PathVariable Integer userId)
	{
			System.out.println("getPatAppt called");
			return ResponseEntity.ok(patientService.getAllAppointements(userId));                                                                                                                                                         
			
	}
	
	//This method fetch all the appointments of a patient for a given user ID
	@GetMapping("/getPatient/{userId}")
	public ResponseEntity<?> getPatient(@PathVariable Integer userId){
		
		return ResponseEntity.ok(patientService.getPatient(userId));
	}
	
	//This method update a patient's details for a given user ID
	@PutMapping("updatePatient/{userId}")
	public ResponseEntity<?> updatePatient(@RequestBody PatientDto patient, @PathVariable Integer userId){
		System.out.println("Update Patient Called");
		return ResponseEntity.ok(patientService.updatePatient(patient, userId));
	}
	
	@GetMapping("/fetchBill/{appointmentId}")
	public ResponseEntity<?> fetchBill(@PathVariable Integer appointmentId){
		System.out.println("Fetch Bill Called");
		//retrieves a bill for a given appointment ID
		return ResponseEntity.ok(receptionService.getBill(appointmentId));
	}
	
}

