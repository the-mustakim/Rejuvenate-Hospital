package com.app.service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.AppointmentSlotDao;
import com.app.dao.DoctorDao;
import com.app.dao.UserDao;
import com.app.dto.AppUserDto;
import com.app.dto.DoctorDto;
import com.app.models.AppUser;
import com.app.models.AppointmentSlots;
import com.app.models.Availability;
import com.app.models.Doctor;
import com.app.models.Role;
import com.app.models.Status;


@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	 @Autowired
	 private PasswordEncoder passwordEncoder;
	 
	 @Autowired
	 private DoctorDao doctorDao;
	 
	 @Autowired
	 private EmailServiceImpl emailService;
	
	@Autowired
	private AppointmentSlotDao appointmentSlotDao;
	
	 //This method adds a new user to the database
	@Override
	public AppUser addUser(AppUser user) {
		String userPassword=user.getPassword();
	    user.setPassword(passwordEncoder.encode(user.getPassword()));
		AppUser savedUser=userDao.save(user);
		
		String to = user.getEmail();
	    String subject = "Registration Successfull with Rejuvenate Hospital";
	    String text="";
	    
	    switch (user.getRole()) {
		case ROLE_ADMIN:
			text="Dear Admin."+user.getFirstName()+",\r\n"
					+"\r\n"
					+"Thank you for your interest in becoming a member of our technical team at Rejuvenate Hospital. We are excited to have you join us and provide support to the hospital.\r\n"
					+"\r\n"
					+ "Your Login Credentials,\r\n"
		    		+"\r\n"
		    		+ "Email: " + user.getEmail()+"\r\n"
		    		+"Password: "+userPassword+"\r\n"
					+"\r\n"
					+ "Best regards,\r\n"
	    			+ "Rejuvenate Hospital";
			break;
		case ROLE_DOCTOR:
			text="Dear Dr."+user.getFirstName()+",\r\n"
				+"\r\n"
				+"Thank you for your interest in becoming a member of our medical team at Rejuvenate Hospital. We are excited to have you join us and provide high-quality care to our patients.\r\n"
				+"\r\n"
				+ "Your Login Credentials,\r\n"
	    		+"\r\n"
	    		+ "Email: " + user.getEmail()+"\r\n"
	    		+"Password: "+userPassword+"\r\n"
				+"\r\n"
				+ "Best regards,\r\n"
    			+ "Rejuvenate Hospital";
			break;
		case ROLE_PHARMACIST:
			text="Dear Pharmacist."+user.getFirstName()+",\r\n"
					+"\r\n"
					+"Thank you for your interest in becoming a member of our medicine team at Rejuvenate Hospital. We are excited to have you join us and provide high-quality care to our patients.\r\n"
					+"\r\n"
					+ "Your Login Credentials,\r\n"
		    		+"\r\n"
		    		+ "Email: " + user.getEmail()+"\r\n"
		    		+"Password: "+userPassword+"\r\n"
					+"\r\n"
					+ "Best regards,\r\n"
	    			+ "Rejuvenate Hospital";
			break;
		case ROLE_RECEPTIONIST:
			text="Dear Receptionist."+user.getFirstName()+",\r\n"
					+"\r\n"
					+"Thank you for your interest in becoming a member of our medical team at Rejuvenate Hospital. We are excited to have you join us and provide high-quality care to our patients.\r\n"
					+"\r\n"
					+ "Your Login Credentials,\r\n"
		    		+"\r\n"
		    		+ "Email: " + user.getEmail()+"\r\n"
		    		+"Password: "+userPassword+"\r\n"
					+"\r\n"
					+ "Best regards,\r\n"
	    			+ "Rejuvenate Hospital";
			break;
		default:
			break;
		}
	    
	    emailService.sendSimpleMessage(to, subject, text);
		return savedUser;
	}
	
	@Override
	public Doctor addDoctor(DoctorDto doctor) {
		AppUser user=userDao.findByEmail(doctor.getEmail());
		Doctor AddedDoctor=doctorDao.save(new Doctor(doctor.getDepartment(),doctor.getTreatmentFees(),doctor.getIsAvailable(),user));
		List<AppointmentSlots> slots=new ArrayList<AppointmentSlots>();
		slots.add(new AppointmentSlots(LocalTime.of(10,00),LocalTime.of(11,00),Status.AVAILABLE,AddedDoctor));
		slots.add(new AppointmentSlots(LocalTime.of(11,00),LocalTime.of(12,00),Status.AVAILABLE,AddedDoctor));
		slots.add(new AppointmentSlots(LocalTime.of(12,00),LocalTime.of(13,00),Status.AVAILABLE,AddedDoctor));
		slots.add(new AppointmentSlots(LocalTime.of(13,00),LocalTime.of(14,00),Status.AVAILABLE,AddedDoctor));
		slots.add(new AppointmentSlots(LocalTime.of(18,00),LocalTime.of(19,00),Status.AVAILABLE,AddedDoctor));
		slots.add(new AppointmentSlots(LocalTime.of(19,00),LocalTime.of(20,00),Status.AVAILABLE,AddedDoctor));
		slots.add(new AppointmentSlots(LocalTime.of(20,00),LocalTime.of(21,00),Status.AVAILABLE,AddedDoctor));
		slots.add(new AppointmentSlots(LocalTime.of(21,00),LocalTime.of(22,00),Status.AVAILABLE,AddedDoctor));
		
		for(AppointmentSlots slot: slots)
		{
			appointmentSlotDao.save(slot);
		}
		return AddedDoctor;
	}

	
	//This method retrieves all users
	@Override
	public List<AppUser> showAllUser() { 
		
		return userDao.findAll();
	}

	//This method counts the number of patients
	@Override
	public int countAllPatient() {
	
		return userDao.countByRole(Role.ROLE_PATIENT);
	}

	//This method counts the number of doctors
	@Override
	public int countAllDoctor() {
		return userDao.countByRole(Role.ROLE_DOCTOR);
	}

	
	//This method counts the number of pharmacists 
	@Override
	public int countAllPharmacist() {
		return userDao.countByRole(Role.ROLE_PHARMACIST);
	}

	//This method counts the number of receptionists
	@Override
	public int countAllReceptionist() {
		return userDao.countByRole(Role.ROLE_RECEPTIONIST);
	}

	//This method updates the details of an existing user
	@Override
	public AppUser updateUser(Integer userId, AppUserDto updateduser) {
		
		try {
		AppUser user = userDao.findById(userId).orElseThrow(null);
		
	
		user.setFirstName(updateduser.getFirstName());
		user.setLastName(updateduser.getLastName());
		user.setEmail(updateduser.getEmail());
		user.setAge(updateduser.getAge());
		user.setGender(updateduser.getGender());
		user.setMobNo(updateduser.getMobNo());
		user.setSalary(updateduser.getSalary());
		user.setAddress(updateduser.getAddress());
		
		return userDao.saveAndFlush(user);
		
		}
		
		catch (Exception e) {
			e.printStackTrace();
		}
		return null;
		
		
	}
	
	//This method delete the existing user 
	@Override
	public String deleteUser(Integer userId) {
		
		
		userDao.deleteById(userId);
		
		
		return "User deleted Successfully";
	}

	//This method search the existing user  by userId
	@Override
	public AppUser getUserById(Integer userId) {
		
		AppUser user = userDao.findById(userId).orElseThrow(null);
		
		return user;
	}

	
}
