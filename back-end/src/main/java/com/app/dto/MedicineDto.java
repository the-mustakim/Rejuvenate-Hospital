package com.app.dto;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MedicineDto {

	private Integer medicineId;
	
	private String medicineName;
	
	private LocalDate manufacturedDate;
	
	private LocalDate expiryDate;
	
	private int stock;
	
	private double price;
	
	private String company;
	
	@CreationTimestamp
	private LocalDate medicineAddedDate;
	
	
}
