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
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.MedicineDto;
import com.app.models.Medicine;
import com.app.service.MedicineService;
import com.app.service.PharmacistService;

@RestController
@RequestMapping("/pharmacist")
@CrossOrigin
public class PharmacistController {
	
	@Autowired
	private PharmacistService pharmaService;
	
	@Autowired
	private MedicineService medicineService;
	
	public PharmacistController() {
		System.out.println("Inside PharmacistController");
	}
	
	//This method  to add a new medicine to the database
	@PostMapping("/register")
	public ResponseEntity<?> AddMedicine(@RequestBody Medicine medicine) {
		System.out.println("Medicine Adding Method");
		return ResponseEntity.ok(pharmaService.addMedicine(medicine));
	}
	
	//fetch all the medicines from the database
	@GetMapping("/getAllMedicines")
	public ResponseEntity<?> allMed(){
		
		return ResponseEntity.ok(pharmaService.allMedicine());
	}
	
	//search for a medicine by name
	@GetMapping("/{medicineName}")
	public ResponseEntity<?> serachByName(@PathVariable String medicineName) {
		
		return ResponseEntity.ok(pharmaService.showByName(medicineName.toLowerCase())) ;
	}
	
	//update a medicine's details for a given medicine ID
	@PutMapping("/updateMedicine/{medicineId}")
	public ResponseEntity<?> updateMedicine(@RequestBody MedicineDto medicine, @PathVariable Integer medicineId ){
		
		return ResponseEntity.ok(pharmaService.updateMedicine(medicine, medicineId));
	}
	
	//fetch a medicine's details for a given medicine ID
	@GetMapping("/getMedicineById/{medicineId}")
	public ResponseEntity<?> getMedicineById(@PathVariable Integer medicineId){
		
		return ResponseEntity.ok(medicineService.findById(medicineId));
	}

}
