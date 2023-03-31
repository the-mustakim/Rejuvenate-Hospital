package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Medicine;

@Repository
public interface MedicineDao extends JpaRepository<Medicine, Integer>{
	
	Medicine findByMedicineName(String medicineName);
	


}
