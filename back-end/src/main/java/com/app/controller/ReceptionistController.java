package com.app.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddBillDto;
import com.app.dto.AppointmentDto;
import com.app.dto.PatientDto;
import com.app.models.AppointmentSlots;
import com.app.models.Doctor;
import com.app.models.Patient;
import com.app.service.ReceptionistService;

@RestController
@RequestMapping("/receptionist")
@CrossOrigin
public class ReceptionistController {
	
	@Autowired
	private ReceptionistService receptionService;
	

	
	public ReceptionistController() {
		System.out.println("Inside ReceptionistController");
	}
	
	@PostMapping("/registerPatient")
	public ResponseEntity<?> addPatient(@RequestBody PatientDto patient) {
	
		// This method is used to register a patient
		return ResponseEntity.ok(receptionService.addPatient(patient));
	}
	
	@GetMapping("/getPatient/{patientId}")
	public Patient getPatient(@PathVariable Integer patientId) {
		// This method is used to get a specific patient by their id
		return receptionService.getPatient(patientId);
	}
	
	@GetMapping("/getAllDoctors")
	public List<Doctor> getAllDoctor(){
		// This method is used to get a list of all doctors in the system
		return receptionService.getDoctorList();
	}
	
	@GetMapping("/getSlots/{doctorId}")
	public List<AppointmentSlots> getSlotsByDoc(@PathVariable Integer doctorId){
		// This method is used to get a list of available appointment slots for a specific doctor
		return receptionService.getSlots(doctorId);
	}
	
	@PostMapping("/addAppointment")
	public String addAppointment(@RequestBody AppointmentDto appointmentDto) {
		// This method is used to add a new appointment to the system
		return receptionService.addAppointment(appointmentDto);
	}
	
	@GetMapping("/fetchAppointments/{appointmentDate}")
	public ResponseEntity<?> fetchAllAppointments(@PathVariable String appointmentDate){
		System.out.println("fetchappt called");
		// This method is used to fetch all appointments for a specific date
		return ResponseEntity.ok(receptionService.getAllAppointments(LocalDate.parse(appointmentDate)));
	}
	
	@GetMapping("/fetchBill/{appointmentId}")
	public ResponseEntity<?> fetchBill(@PathVariable Integer appointmentId){
		System.out.println("Fetch Bill Called");
		//retrieves a bill for a given appointment ID
		return ResponseEntity.ok(receptionService.getBill(appointmentId));
	}
	
	@PostMapping("/addBill")
	public ResponseEntity<?> addBill(@RequestBody AddBillDto bill){
		//adds a bill to the database
		return ResponseEntity.ok(receptionService.addBillToDb(bill));
	}
	
	@GetMapping("/updateBill/{appointmentId}")
	public ResponseEntity<?> updateBill(@PathVariable Integer appointmentId ){
		System.out.println("Inside update bill");
		//updates the status of a bill for a given appointment ID
		return ResponseEntity.ok(receptionService.updateBillStatus(appointmentId));
	}
	
	

}