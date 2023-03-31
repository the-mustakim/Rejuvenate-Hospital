package com.app.exc_handler;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.app.custom_exceptions.ResourceNotFoundException;


@RestControllerAdvice
//singleton n eager
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		System.out.println("in  global exc handler : validation failures");
		List<FieldError> list = ex.getFieldErrors();
		Map<String, String> map = list.stream()
		.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
	}
	//add a method to handle ANY Business exception
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleRuntimeException(ResourceNotFoundException e)
	{
		System.out.println("in run time exc handler");
		return new ResponseEntity<>(new ApiResponse(e.getMessage(),true,HttpStatus.NOT_FOUND,LocalDateTime.now()), HttpStatus.NOT_FOUND);
	}
	

}
