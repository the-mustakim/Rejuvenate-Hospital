package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class AppUserDetailsService implements UserDetailsService {
	@Autowired
	private com.app.dao.UserDao userDao;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		com.app.models.AppUser user = userDao.findByEmail(email);
		if(user == null)
			throw new UsernameNotFoundException(email + " not found.");
		return user.toUser();
	}
}
