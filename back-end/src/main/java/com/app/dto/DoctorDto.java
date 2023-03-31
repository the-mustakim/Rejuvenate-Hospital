package com.app.dto;

import com.app.models.Address;
import com.app.models.Availability;
import com.app.models.Department;
import com.app.models.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {

	private Integer userId;
	private String firstName;
	private String lastName;
	private String email;
	private int age;
	private Gender gender;
	private String mobNo;
    private double salary;
	private Address address;
	private Department department;
	private double treatmentFees;
	private Availability isAvailable;
	private String availabilityString;
}
