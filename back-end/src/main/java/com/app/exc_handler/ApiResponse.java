package com.app.exc_handler;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ApiResponse {
	private String message;
	private boolean success;
	private HttpStatus status;
	private LocalDateTime timestamp;

	public ApiResponse(String message) {
		super();
		this.message = message;
		timestamp = LocalDateTime.now();
		
	}
}
