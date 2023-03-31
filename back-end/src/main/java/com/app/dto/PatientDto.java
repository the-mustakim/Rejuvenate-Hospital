package com.app.dto;

import com.app.models.Address;
import com.app.models.BloodGroup;
import com.app.models.Gender;
import com.app.models.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {

	
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private int age;
	private Gender gender;
	private String mobNo;
	private Role role;
	private String securityQuestion;
	private String securityAnswer;
	private Address address;
	private BloodGroup bloodGroup;
	private String medicalHistory;
	
	
}
