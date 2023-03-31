package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.models.AppUser;

public interface ReceptionistDao extends JpaRepository<AppUser, Integer> {

}
