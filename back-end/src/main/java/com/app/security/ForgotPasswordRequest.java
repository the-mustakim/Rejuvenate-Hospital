package com.app.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ForgotPasswordRequest {
	
	
	private String email;
	private String password;
	private String confirmPassword;
	private String securityQuestion;
	private String securityAnswer;

}
