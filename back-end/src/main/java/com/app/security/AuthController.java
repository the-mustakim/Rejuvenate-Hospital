package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.UserDao;
import com.app.dto.TokenDto;
import com.app.models.AppUser;

@CrossOrigin
@RestController
public class AuthController {
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JwtUtil jwtUtils;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	

	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody Credentials cred) {
		System.out.println("Authenticating: " + cred);
		try {
			Authentication auth = new UsernamePasswordAuthenticationToken(cred.getEmail(), cred.getPassword());
			auth = authManager.authenticate(auth);
			User user = (User)auth.getPrincipal();
			AppUser currentUser = userDao.findByEmail(cred.getEmail());
			String token = jwtUtils.generateToken(user.getUsername());
			return ResponseEntity.ok(new TokenDto(token,currentUser.getRole(),currentUser));
		}
		catch (BadCredentialsException e) 
		{
			return ResponseEntity.notFound().build();
		}
	}
	
	
	@PostMapping("/validate")
	public ResponseEntity<?> validate(){
		
		try {
			
			return ResponseEntity.ok(new TokenDto());
		}
		catch (UsernameNotFoundException e) 
		{
			return ResponseEntity.notFound().build();
		}
	}
	
	   @PostMapping("/getSecurityQuestion")
	   public ResponseEntity<?> getSecurityQuestion(@RequestBody ForgotPasswordRequest request){
		  
		   String email = request.getEmail();
		   
		   AppUser user = userDao.findByEmail(email);
		   
	        if (user == null) {
	            return ResponseEntity.notFound().build();
	        }
		   
	        return ResponseEntity.ok(user.getSecurityQuestion());
	   }
	   
	   
	   @PostMapping("/checkAnswer")
	   public ResponseEntity<?> checkAnswer(@RequestBody ForgotPasswordRequest request) {
		   
		   String email = request.getEmail();
	       String answer = request.getSecurityAnswer();
	       
	       AppUser user = userDao.findByEmail(email);
	        if (user == null) {
	            return ResponseEntity.notFound().build();
	        }

	        // Check if security question answer matches
	        if (!user.getSecurityAnswer().equals(answer)) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	        }
	        
	        return ResponseEntity.ok(email);

	   }
	
	
	   @PostMapping("/forgotPassword")
	    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
		   
	        String email = request.getEmail();
	    //    String answer = request.getSecurityAnswer();

	        // Retrieve user by email
	        AppUser user = userDao.findByEmail(email);
	        if (user == null) {
	            return ResponseEntity.notFound().build();
	        }

	        // Check if security question answer matches
//	        if (!user.getSecurityAnswer().equals(answer)) {
//	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//	        }

	        // Generate new password and update in the database
	     //   String newPassword = generateNewPassword();
	        userDao.updatePassword(user.getUserId(),passwordEncoder.encode(request.getPassword()));

	        // Send new password to user via email
	    //    sendNewPasswordToUser(user.getEmail(), newPassword);

	        return ResponseEntity.ok("Password Updated Please Login In");
	    }

//	    private String generateNewPassword() {
//	        
//	    	return UUID.randomUUID().toString();
//	    }
//
//	    private void sendNewPasswordToUser(String email, String newPassword) {
//	        SimpleMailMessage msg = new SimpleMailMessage();
//	        msg.setTo(email);
//	        msg.setSubject("New Password for Your Account");
//	        msg.setText("Your new password is: " + newPassword);
//
//	        try {
//	            javaMailSender.send(msg);;
//	            
//	            
//	        } catch (MailException e) {
//	            // Handle mail sending error
//	        }
//	    }
}
