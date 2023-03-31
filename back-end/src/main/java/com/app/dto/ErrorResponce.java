package com.app.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Data Transfer Object between the frontend and backend
//Error Responce POJO


@NoArgsConstructor
@Getter
@Setter
public class ErrorResponce {
	private String message;
	private String errorDetails;
	private LocalDateTime timeStamp;
	
	public ErrorResponce(String message, String errorDetails) {
		this.message = message;
		this.errorDetails = errorDetails;
		this.timeStamp = LocalDateTime.now();
	}
	
}
