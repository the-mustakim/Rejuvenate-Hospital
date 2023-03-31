package com.app.models;

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

@Entity
@Table(name="medicines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Medicine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
