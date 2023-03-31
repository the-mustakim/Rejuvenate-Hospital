package com.app.service;

import java.util.List;

import com.app.models.AppUser;
import com.app.models.Medicine;

public interface MedicineService {

	
	int countAllMedicines();
	
	Medicine findById(Integer medicineId);
	
	List<Medicine> showAllMedicines();
	
	
}
