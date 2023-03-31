package com.app.service;

import java.util.List;

import com.app.dto.MedicineDto;
import com.app.models.AppUser;
import com.app.models.Medicine;
import com.app.models.Role;

public interface PharmacistService {
	
	String addMedicine(Medicine medicine);
	
	List<Medicine> allMedicine();
	
	Medicine showByName(String medicineName);

	List<AppUser> showAllPhramacist();
	
	MedicineDto updateMedicine(MedicineDto medicine,Integer medicineId);
}
