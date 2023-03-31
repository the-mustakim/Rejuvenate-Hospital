package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.models.Patient;

public interface PatientDao extends JpaRepository<Patient, Integer> {
	
	@Query("select p from Patient p where p.user.userId=?1")
	Patient getByUserId(@Param(value = "1") Integer userId);
	
	@Query("select p from Patient p where p.user.userId=?1")
	Patient findPatient(@Param(value="1") Integer userId);

}
