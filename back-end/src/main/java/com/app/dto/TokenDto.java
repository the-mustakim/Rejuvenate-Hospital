package com.app.dto;

import com.app.models.AppUser;
import com.app.models.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto {
	
	String token;
	Role role;
	AppUser user;	
}
