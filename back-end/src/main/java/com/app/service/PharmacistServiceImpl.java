package com.app.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.MedicineDao;
import com.app.dao.UserDao;
import com.app.dto.MedicineDto;
import com.app.models.AppUser;
import com.app.models.Medicine;
import com.app.models.Role;

@Service
public class PharmacistServiceImpl implements PharmacistService{

	@Autowired
	private MedicineDao medicineDao;
	
	@Autowired
	private UserDao userDao;
	
	//Adds a new medicine to the database
	@Override
	public String addMedicine(Medicine medicine) {
		medicineDao.save(medicine);
		return "Med added";
	}

	//Retrieves all medicines from the database
	@Override
	public List<Medicine> allMedicine() {
		
		return medicineDao.findAll();
	}

	//Searches for a medicine by name
	@Override
	public Medicine showByName(String medicineName) {
		
		return medicineDao.findByMedicineName(medicineName.toLowerCase());
	}

	//Retrieves all users with the role of pharmacist
	@Override
	public List<AppUser> showAllPhramacist() {
		
		return userDao.findByRole(Role.ROLE_PHARMACIST);
	}

	//Updates an existing medicine in the database
	@Override
	public MedicineDto updateMedicine(MedicineDto medicine, Integer medicineId) {
		Medicine med=medicineDao.findById(medicineId).orElseThrow();
		med.setMedicineName(medicine.getMedicineName());
		med.setCompany(medicine.getCompany());
		med.setExpiryDate(medicine.getExpiryDate());
		med.setManufacturedDate(medicine.getManufacturedDate());
		med.setMedicineAddedDate(LocalDate.now());
		med.setPrice(medicine.getPrice());
		med.setStock(medicine.getStock());
		medicineDao.saveAndFlush(med);
		medicine.setMedicineId(medicineId);
		return medicine;
	}

}
