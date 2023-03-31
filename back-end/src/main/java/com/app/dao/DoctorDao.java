package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.dto.DoctorDto;
import com.app.models.Appointment;
import com.app.models.Doctor;

public interface DoctorDao extends JpaRepository<Doctor,Integer>{
	
	Doctor findByUserUserId(Integer userId);
	
	@Query("select d from Doctor d where d.user.userId=?1")
	Doctor findDoctor(@Param(value = "1") Integer userId);
	
	@Query("select d from Doctor d where d.user.firstName=?1")
	List<Doctor> findByName(@Param(value = "1") String doctorName);
	
	

}
