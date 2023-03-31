package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ErrorResponce;
import com.app.dto.PrescriptionDto;
import com.app.models.Appointment;
import com.app.models.Doctor;
import com.app.models.Medicine;
import com.app.security.JwtUtil;
import com.app.service.DoctorService;

@RestController
@CrossOrigin
@RequestMapping("/doctor")
public class DoctorController {
	
	// This annotation enables Spring to automatically inject an instance of DoctorService
	@Autowired
	private DoctorService doctorService;
	
	// This annotation enables Spring to automatically inject an instance of JwtUtil
	@Autowired
	private JwtUtil jwtUtil;
	
	// Constructor for DoctorController
	public DoctorController() {
		System.out.println("inside the doctor controller");
	}
	
	//Fetching all the patients for specific doctor
	@GetMapping("/patientlist")
	public ResponseEntity<?> fetchAllAppointment(@RequestHeader (name="Authorization") String token)
	{
		System.out.println("in fetch all patients ");
		try
		{
			// Extract the token value and the email from the token
			token=token.replace("Bearer", "").trim();
			String email=jwtUtil.getTokenUsername(token);
			System.out.println("The email is "+email + "The token is"+token);
			Doctor doctor=doctorService.getDoctor(email);
			List<Appointment> list =doctorService.getAllAppointment(doctor.getDoctorId());
			list.forEach(System.out::println);
			
			// Return a successful response with the list of appointments
			return ResponseEntity.ok(list);
		}
		catch (Exception e) {
			e.printStackTrace(); // If there is an exception, return a response with an error message
			return new ResponseEntity<>(new ErrorResponce("Fetching All Appointments Details failed",e.getMessage()),HttpStatus.BAD_REQUEST);
		}
	}
	
	// This method fetches a specific appointment by ID
	@GetMapping("/fetchAppointment/{appointmentId}")
	public ResponseEntity<?> fetchAppointment(@PathVariable Integer appointmentId)
	{
		System.out.println("in fetch Appointment");
		try
		{
			
			return ResponseEntity.ok(doctorService.getAppointment(appointmentId));
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ErrorResponce("Fetching Appointment Details failed",e.getMessage()),HttpStatus.BAD_REQUEST);
		}
	}
	
	//This method updates the treatment status of an appointment
	@PutMapping("/updateAppointment/{appointmentId}")
	public ResponseEntity<?> updateTreatmentStatus(@PathVariable Integer appointmentId,@RequestBody Appointment appointment)
	{
		System.out.println("in updateTreatmentStatus");
		try
		{
			
			return ResponseEntity.ok(doctorService.updateAppointment(appointmentId,appointment));
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ErrorResponce("Updating Appointment failed",e.getMessage()),HttpStatus.BAD_REQUEST);
		}
	}
	
	//This method gets all medicines
	@GetMapping("/fetchAllMedicines")
	public ResponseEntity<?> fetchAllMedicines()
	{
		System.out.println("in fetchAllMedicines");
		try
		{
			List<Medicine> list=doctorService.getAllMedicines();
			list.forEach(System.out::println);
			return ResponseEntity.ok(list);
		}
		catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponce("Fetching All Medicines Details failed",e.getMessage()),HttpStatus.BAD_REQUEST);
		}
	}
	
	//This method adds prescription to an appointment
	@PostMapping("/addPrescription/{appointmentId}")
	public ResponseEntity<?> addPrescription(@PathVariable Integer appointmentId,@RequestBody List<PrescriptionDto> assignedMedicines)
	{
		System.out.println("Inside the addPrescription");
		try{
			StringBuilder msg= doctorService.assignPrescription(assignedMedicines,appointmentId);
			return ResponseEntity.ok(msg);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ErrorResponce("Prescription Added Failed",e.getMessage()),HttpStatus.BAD_REQUEST);
		}
	}
	
	//This method fetch all the prescriptions
	@GetMapping("/fetchAllPrescription")
	public ResponseEntity<?> getAllPrescription()
	{
		try
		{
			return ResponseEntity.ok(doctorService.getAllprescription());
		}
		catch (Exception e) {
			return new ResponseEntity<>(new ErrorResponce("Fetching All Prescripion Details failed",e.getMessage()),HttpStatus.BAD_REQUEST);
		}
	}
	
}
