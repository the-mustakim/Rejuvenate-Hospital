package com.app.models;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Address {
	
	
	private String street;
	private String city;
	private String pincode;
}
