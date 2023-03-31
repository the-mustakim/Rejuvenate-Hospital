package com.app.models;

import java.time.LocalDate;
import java.util.Collections;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Users")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class AppUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	@NotNull
    @NotBlank
	private String firstName;
	@NotNull
    @NotBlank
	private String lastName;
	@NotNull
    @NotBlank
    @Email
    @Column(unique = true)
	private String email;
	@NotNull
    @NotBlank
    //@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	@NotNull
	private int age;
	@NotNull
	@Enumerated(EnumType.STRING)
	private Gender gender;
	@NotNull
	@NotBlank
	private String mobNo;
	private double salary;
	@NotNull
	@Enumerated(EnumType.STRING)
	private Role role;
	@NotNull
    @NotBlank
	private String securityQuestion;
	@NotNull
    @NotBlank
	private String securityAnswer;
	@CreationTimestamp
	private LocalDate createdAt;
	@Embedded
	private Address address;
	
	
	public AppUser(String firstName, String lastName, String email, String password, int age, Gender gender,
			String mobNo, double salary, Role role, String securityQuestion, String securityAnswer,
			Address address) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.age = age;
		this.gender = gender;
		this.mobNo = mobNo;
		this.salary = salary;
		this.role = role;
		this.securityQuestion = securityQuestion;
		this.securityAnswer = securityAnswer;
		this.address = address;
	}
		
	public User toUser() {
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.toString());
		User user = new User(email, password, 
				Collections.singletonList(authority));
		
		return user;
	
	}
}
