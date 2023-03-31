package com.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.dto.AddBillDto;
import com.app.models.Bill;

public interface BillDao extends JpaRepository<Bill, Integer> {
	
	@Query("select b from Bill b where b.appointment.appointmentId=?1")
	Bill findBillByAppointmentId(@Param(value = "1") Integer appointmentId);
	
	List<Bill> findBillByBillingDate(LocalDate billingDate);
	
	@Query(value = "SELECT new com.app.models.Bill(c.billingDate, SUM(c.totalMedicinePrice), SUM(c.treatementFees), SUM(c.totalPrice)) FROM Bill c GROUP BY c.billingDate ORDER BY c.billingDate DESC")
	List<Bill> countTotalBillByDate();
	
	@Query("select SUM(b.totalPrice) from Bill b")
	int getTotalEarning();
}
