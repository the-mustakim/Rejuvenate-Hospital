package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.MedicineDao;
import com.app.models.Medicine;


@Service
@Transactional
public class MedicineServiceImpl implements MedicineService {

	
	@Autowired
	private MedicineDao medicineDao;
	
	
	@Override
	public int countAllMedicines() {
	//This method returns the total count of medicines available
		return (int)medicineDao.count();
	}


	@Override
	public Medicine findById(Integer medicineId) {
		//This method retrieves the medicine record by Id
		return medicineDao.findById(medicineId).orElseThrow();
	}


	@Override
	public List<Medicine> showAllMedicines() {
		//This method retrieves all the medicines available
		return medicineDao.findAll();
	}

}
