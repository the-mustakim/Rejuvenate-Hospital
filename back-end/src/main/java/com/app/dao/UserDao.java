package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.app.models.AppUser;
import com.app.models.Role;

@Transactional
public interface UserDao extends JpaRepository<AppUser, Integer> {

	
	int countByRole(Role role);
	
	List<AppUser> findByRole(Role role);

	
	AppUser findByEmail(String email);

	@Modifying //Indicates that data is getting modified in database
	@Query("UPDATE AppUser u SET u.password = :newPassword WHERE u.userId = :userId")
	void updatePassword(@Param("userId") Integer userId, @Param("newPassword") String newPassword);
}
