package com.app.service;

import java.util.List;

import com.app.dto.AppUserDto;
import com.app.dto.DoctorDto;
import com.app.models.AppUser;
import com.app.models.Doctor;

public interface UserService {

	List<AppUser> showAllUser();
	
	AppUser addUser(AppUser user);
	
	Doctor addDoctor(DoctorDto doctor);
	
	int countAllPatient();
	
	int countAllDoctor();
	
	int countAllPharmacist();
	
	int countAllReceptionist();
	
	AppUser updateUser(Integer userId,AppUserDto user);
	
	String deleteUser(Integer userId);
	
	AppUser getUserById(Integer userId);
	
	
	
}
