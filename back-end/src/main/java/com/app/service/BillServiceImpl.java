package com.app.service;
//Hi
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.BillDao;
import com.app.dto.AddBillDto;
import com.app.models.Bill;

@Service
@Transactional
public class BillServiceImpl implements BillService {

	@Autowired
	private BillDao billDao;
	
	@Override
	public AddBillDto getBillByBillingDate(LocalDate billingDate) {
		List<Bill> allBillsByDate = billDao.findBillByBillingDate(billingDate);
		double totalMedicinePrice=0;
		double treatementFees=0;
		double totalPrice=0;
		for (Bill bill : allBillsByDate) {
			totalMedicinePrice=bill.getTotalMedicinePrice()+totalMedicinePrice;
			treatementFees=bill.getTreatementFees()+treatementFees;
			totalPrice=bill.getTotalPrice()+totalPrice;
		}
//		retrieves the bills for a specific billing
		return new AddBillDto(billingDate, totalMedicinePrice, treatementFees, totalPrice);
	}

//	@Override
//	public List<AddBillDto> getAllBillEarnings() {
//	    List<Bill> allBills = billDao.countTotalBillByDate();
//	    double[] totalMedicinePrice = {0};
//	    double[] treatmentFees = {0};
//	    double[] totalPrice = {0};
//	    List<AddBillDto> allBillDtos = allBills.stream().map(bill -> {
//	        totalMedicinePrice[0] += bill.getTotalMedicinePrice();
//	        treatmentFees[0] += bill.getTreatementFees();
//	        totalPrice[0] += bill.getTotalPrice();
//	        return new AddBillDto(bill.getBillingDate(), totalMedicinePrice[0], treatmentFees[0], totalPrice[0]);
//	    }).collect(Collectors.toList());
////	    retrieves all the bills from the database and calculates the total medicine price, treatment fees, and total price for each billing date
//	    return allBillDtos;
//	}

	@Override
	public int getTotalEarning()
	{		
//		 retrieves the total earnings
		return billDao.getTotalEarning();
		
	}

	public List<AddBillDto> getAllBillEarnings() {
	    List<Bill> allBills = billDao.countTotalBillByDate();
	    Map<LocalDate, AddBillDto> datewiseBillMap = new HashMap();
	    for (Bill bill : allBills) {
	        LocalDate billingDate = bill.getBillingDate();
	        if (!datewiseBillMap.containsKey(billingDate)) {
	            datewiseBillMap.put(billingDate, new AddBillDto(billingDate, bill.getTotalMedicinePrice(), bill.getTreatementFees(), bill.getTotalPrice()));
	        } else {
	            AddBillDto existingBillDto = datewiseBillMap.get(billingDate);
	            existingBillDto.setTotalMedicinePrice(existingBillDto.getTotalMedicinePrice() + bill.getTotalMedicinePrice());
	            existingBillDto.setTreatementFees(existingBillDto.getTreatementFees() + bill.getTreatementFees());
	            existingBillDto.setTotalPrice(existingBillDto.getTotalPrice() + bill.getTotalPrice());
	        }
	    }
	    return new ArrayList<>(datewiseBillMap.values());
	}


}
