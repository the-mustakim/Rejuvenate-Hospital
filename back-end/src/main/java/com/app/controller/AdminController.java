package com.app.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppUserDto;
import com.app.dto.DoctorDto;
import com.app.models.AppUser;
import com.app.service.AppointmentService;
import com.app.service.BillService;
import com.app.service.DoctorService;
import com.app.service.MedicineService;
import com.app.service.PatientService;
import com.app.service.PharmacistService;
import com.app.service.ReceptionistService;
import com.app.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin   // Allow cross-origin requests for this controller
public class AdminController {

	// Constructor
	public AdminController() {
		System.out.println("Inside Admin Controller");
	}
	
	// Autowire services
	@Autowired
	private UserService userService;
	
	@Autowired
	private MedicineService medicineService;
	
	@Autowired
	private AppointmentService appointmentService;
	
	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private PharmacistService pharmacistService;
	
	@Autowired
	private PatientService patientService;
	
	@Autowired
	private ReceptionistService receptionistService;
	
	@Autowired
	private BillService billService;
	
	// Returns dashboard data
	@GetMapping
	public ResponseEntity<?> showDashboard(){
		
		Map<String,Integer> map = new HashMap<>();
		map.put("Patient",userService.countAllPatient());
		map.put("Doctor",userService.countAllDoctor());
		map.put("Pharmacist",userService.countAllPharmacist());
		map.put("Receptionist",userService.countAllReceptionist());
		map.put("MedicineQuantity",medicineService.countAllMedicines());
		map.put("TotalAppointments", appointmentService.countAllAppointments());
		map.put("TotalEarnings",billService.getTotalEarning());
		
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
	
	// Endpoint to adds a new user
	@PostMapping("/registerUser")
	public ResponseEntity<?> addUser(@RequestBody AppUser user){
		
		return new ResponseEntity<>(userService.addUser(user), HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/registerDoctor")
	public ResponseEntity<?> addDoctor(@RequestBody DoctorDto doctor)
	{
		return new ResponseEntity<>(userService.addDoctor(doctor),HttpStatus.ACCEPTED);
	}
	
	// Endpoint to deletes a user by ID
	@DeleteMapping("/deleteUser/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable Integer userId){
		
		return ResponseEntity.ok(userService.deleteUser(userId));
		
	}
	
	// Endpoint to get a user by ID
	@PutMapping("/updateUser/{userId}")
	public ResponseEntity<?> updateUser(@PathVariable Integer userId,@RequestBody AppUserDto user){
		
		return ResponseEntity.ok(userService.updateUser(userId,user));
		
	}
	
	// Endpoint to update a doctor by ID
	@PutMapping("/updateDoctor/{doctorId}")
    public ResponseEntity<?> updateDoctor(@PathVariable Integer doctorId, @RequestBody DoctorDto doctor)
	       {
	    	return ResponseEntity.ok(doctorService.updateDoctor(doctorId, doctor));
	  
	       }
	
	// Endpoint to get a user by ID
	@GetMapping("/getUserById/{userId}")
	public ResponseEntity<?> getUserById(@PathVariable Integer userId){
		
		return ResponseEntity.ok(userService.getUserById(userId));
	}
	   
	// Endpoint to get a doctor by ID
	@GetMapping("/getDoctorById/{doctorId}")
	public ResponseEntity<?> getDoctorById(@PathVariable Integer doctorId){
		
		return ResponseEntity.ok(doctorService.findById(doctorId));
	}
	
	// Endpoint to get a doctor by name
	@GetMapping("/getDoctorByName/{doctorName}")
	public ResponseEntity<?> getDoctorById(@PathVariable String doctorName){
		
		return ResponseEntity.ok(doctorService.findByName(doctorName));
	}
	
	// Endpoint to get an appointment by ID
	@GetMapping("/getAppointmentById/{appointmentId}")
	public ResponseEntity<?> getAppointmentById(@PathVariable Integer appointmentId){
		
		return ResponseEntity.ok(appointmentService.findById(appointmentId));
	}
	

	// Endpoint to get an appointment by patient name
	@GetMapping("/getAppointmentByPatientName/{PatientName}")
	public ResponseEntity<?> getAppointmentByPatientName(@PathVariable String PatientName){
		
		return ResponseEntity.ok(appointmentService.findByName(PatientName));
	}
	
	// Endpoint to get a medicine by ID
	@GetMapping("/getMedicineById/{medicineId}")
	public ResponseEntity<?> getMedicineById(@PathVariable Integer medicineId){
		
		return ResponseEntity.ok(medicineService.findById(medicineId));
	}
	
	// Endpoint to get a medicine by name
	@GetMapping("/getMedicineByName/{medicineName}")
	public ResponseEntity<?> getMedicineByName(@PathVariable String medicineName){
		
		return ResponseEntity.ok(pharmacistService.showByName(medicineName));
	}
	
	// Endpoint to get all users
	@GetMapping("/getAllUsers")
	public ResponseEntity<?> getAllUsers(){
		
		return ResponseEntity.ok(userService.showAllUser());
	}
	
	// Endpoint to get all doctors
	@GetMapping("/getAllDoctors")
	public ResponseEntity<?> getAllDoctors(){
		
		return ResponseEntity.ok(doctorService.showAllDoctor());
	}
	
	// Endpoint to get all patients
	@GetMapping("/getAllPatients")
	public ResponseEntity<?> getAllPatients(){
		
		return ResponseEntity.ok(patientService.showAllPatient());
	}
	
	// Endpoint to get all receptionists
	@GetMapping("/getAllReceptionists")
	public ResponseEntity<?> getAllReceptionists(){
		
		return ResponseEntity.ok(receptionistService.showAllReceptionist());
	}
	
	// Endpoint to get all pharmacists
	@GetMapping("/getAllPharmacists")
	public ResponseEntity<?> getAllPharmacists(){
		
		return ResponseEntity.ok(pharmacistService.showAllPhramacist());
	}
	
	// Endpoint to get all appointments
	@GetMapping("/getAllAppointments")
	public ResponseEntity<?> getAllAppointments(){
		
		return ResponseEntity.ok(appointmentService.showAllAppointments());
	}
		
	// Endpoint to get all medicines
	@GetMapping("/getAllMedicines")
	public ResponseEntity<?> getAllMedicines(){
		
		return ResponseEntity.ok(medicineService.showAllMedicines());
	}
	
	// Endpoint to get the earnings for a specific billing date
	@GetMapping("/getEarning/{billingDate}")
	public ResponseEntity<?> getEarningByDate(@PathVariable String billingDate){
		System.out.println("getEarning by date");
		return ResponseEntity.ok(billService.getBillByBillingDate(LocalDate.parse(billingDate)));
	}
	
	// Endpoint to get all earnings
	@GetMapping("/getAllEarnings")
	public ResponseEntity<?> getAllEarnings()
	    {
		
		return ResponseEntity.ok(billService.getAllBillEarnings());
		
	     }
	
}
