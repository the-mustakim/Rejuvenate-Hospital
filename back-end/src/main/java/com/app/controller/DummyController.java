package com.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class DummyController {

	
	public DummyController() {
		System.out.println("Inside DummyController");
	}
	
	
	@GetMapping
	public void show() {
		
		System.out.println("Inside show");
	}
	
	
}
