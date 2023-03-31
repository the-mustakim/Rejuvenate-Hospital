package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.dto.AddBillDto;



public interface BillService  {
	
	AddBillDto getBillByBillingDate(LocalDate billingDate);
	
	List<AddBillDto> getAllBillEarnings();
	
	int getTotalEarning();
	
}
