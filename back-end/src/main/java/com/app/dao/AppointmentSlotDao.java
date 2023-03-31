package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.models.AppointmentSlots;
import com.app.models.Status;

public interface AppointmentSlotDao extends JpaRepository<AppointmentSlots, Integer>{
	
	
	@Query("select s from AppointmentSlots s where s.doctor.doctorId=?1 and s.status=?2")
	List<AppointmentSlots> findAppointmentSlotsByDoc(@Param(value = "1") Integer doctorId, @Param(value = "2") Status status);

}
