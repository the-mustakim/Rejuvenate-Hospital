package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AppointmentDao;
import com.app.dao.AppointmentSlotDao;
import com.app.dao.DoctorDao;
import com.app.dao.MedicineDao;
import com.app.dao.PatientDao;
import com.app.dao.PrescriptionDao;
import com.app.dao.UserDao;
import com.app.dto.DoctorDto;
import com.app.dto.PrescriptionDto;
import com.app.models.AppUser;
import com.app.models.Appointment;
import com.app.models.AppointmentSlots;
import com.app.models.Doctor;
import com.app.models.Medicine;
import com.app.models.Prescription;
import com.app.models.Status;
import com.app.models.TreatmentStatus;

@Service
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	private PatientDao patientRepo;
	
	@Autowired
	private AppointmentDao appointmentRepo;
	
	@Autowired
	private DoctorDao doctorRepo;
	
	@Autowired
	private UserDao userRepo;
	
	@Autowired
	private MedicineDao MedicineRepo;
	
	@Autowired
	private PrescriptionDao PrescriptionRepo;
	
	@Autowired
	private AppointmentSlotDao appointmentSlotDao;

	@Override
	public Doctor getDoctor(String email) {
		// find the user with the given email
		AppUser user=userRepo.findByEmail(email);
		// find the doctor associated with the user
		Doctor doctor=doctorRepo.findByUserUserId(user.getUserId());
		// return the doctor
		return doctor;
	}


	@Override
	public List<Appointment> getAllAppointment(Integer doctorId){
		System.out.println("The doctor is"+doctorId);
		// retrieve all appointments for the given doctor ID
		return appointmentRepo.findAllAppointment(doctorId);
	}

	@Override
	public Appointment getAppointment(Integer appointmentId){
		// retrieve the appointment with the given ID, or throw an exception if it does not exist
			Appointment appointment=appointmentRepo.findById(appointmentId).orElseThrow(null);
		return appointment;
	}

	@Override
	public Appointment updateAppointment(Integer appointmentId, Appointment appointment) {
		// retrieve the old appointment with the given ID, or throw an exception if it does not exist
		Appointment oldappointment=appointmentRepo.findById(appointmentId).orElseThrow(null);
				// retrieve the appointment slot associated with the old appointment
	AppointmentSlots slot= appointmentSlotDao.findById(oldappointment.getAppointmentSlot().getAppointmentSlotId()).orElseThrow(null);
				// if the treatment status of the new appointment is "attended", update the appointment slot status to "available"
		
		if(appointment.getTreatmentStatus().equals(TreatmentStatus.ATTENDED))
		{
	//		System.out.println("In slot update for Attended "+appointment.getTreatmentStatus()+" "+oldappointment.getAppointmentSlot().getStatus());
			slot.setStatus(Status.AVAILABLE);
			oldappointment.setTreatmentStatus(appointment.getTreatmentStatus());
	//		System.out.println("In slot update for Attended "+appointment.getTreatmentStatus()+" "+oldappointment.getAppointmentSlot().getStatus());
		}
		// if the treatment status of the new appointment is "pending", update the appointment slot status to "occupied"
		else if(appointment.getTreatmentStatus().equals(TreatmentStatus.PENDING)) {
	//		System.out.println("In slot update "+appointment.getTreatmentStatus()+" "+oldappointment.getAppointmentSlot().getStatus());
			// save the updated appointment and appointment slot
			slot.setStatus(Status.OCCUPIED);
			oldappointment.setTreatmentStatus(appointment.getTreatmentStatus());
		}
	//	System.out.println("In slot update "+oldappointment.getTreatmentStatus()+" "+oldappointment.getAppointmentSlot().getStatus());
		appointmentRepo.saveAndFlush(oldappointment);
		appointmentSlotDao.saveAndFlush(slot);
		//appointmentRepo.saveAndFlush(oldappointment);
	//	System.out.println("In slot update "+oldappointment.getTreatmentStatus()+" "+oldappointment.getAppointmentSlot().getStatus());
		return oldappointment;
	}

	@Override
	public List<Medicine> getAllMedicines() {
		// retrieve all medicines
		return MedicineRepo.findAll();
	}

	@Override
	public StringBuilder assignPrescription(List<PrescriptionDto> assignedMedicines, Integer appointmentId) {
		    // Retrieve the appointment with the given ID, or throw an exception if it does not exist
		    Appointment appointment = appointmentRepo.findById(appointmentId).orElseThrow(null);
		    // Initialize a StringBuilder to store messages about the prescription assignments
		    StringBuilder msg = new StringBuilder();
		    assignedMedicines.forEach((med) -> {
		        // Retrieve the medicine with the given ID, or throw an exception if it does not exist
		        Medicine medicine = MedicineRepo.findById(med.getMedicineId()).orElseThrow(null);
		        // Check if the medicine is in stock and the requested quantity is less than the available stock
		        if (medicine.getStock() > 0 && med.getQuantityAssigned() < medicine.getStock()) {
		            // Subtract the assigned quantity from the medicine's stock and save the updated medicine
		            medicine.setStock(medicine.getStock() - med.getQuantityAssigned());
		            MedicineRepo.saveAndFlush(medicine);
		            // Create a new Prescription object and save it to the database
		            PrescriptionRepo.save(new Prescription(med.getAssignedMedicine(), med.getQuantityAssigned(), medicine.getPrice() * med.getQuantityAssigned(), appointment, medicine));
		            // Append a success message to the StringBuilder
		            msg.append("Prescription Added");
		        } else {
		            // Append an error message to the StringBuilder if the medicine is out of stock or the requested quantity is greater than the available stock
		            msg.append("Please Enter the Valid Quantity");
		        }
		    });
		    // Return the StringBuilder containing messages about the prescription assignments
		    return msg;
		}

		@Override
		public List<Prescription> getAllprescription() {
		    // Retrieve all prescriptions from the database
		    return PrescriptionRepo.findAll();
		}

		@Override
		public Optional<Doctor> findById(Integer doctorId) {
		    // Retrieve the doctor with the given ID, or return an empty Optional if it does not exist
		    return doctorRepo.findById(doctorId);
		}

		@Override
		public List<Doctor> findByName(String doctorName) {
		    // Retrieve all doctors with the given name from the database
		    return doctorRepo.findByName(doctorName);
		}

		@Override
		public List<Doctor> showAllDoctor() {
		    // Retrieve all doctors from the database
		    return doctorRepo.findAll();
		}

		@Override
		public Doctor updateDoctor(Integer doctorId, DoctorDto doctor) {
		    // Retrieve the doctor with the given ID, or throw an exception if it does not exist
		    Doctor doc = doctorRepo.findById(doctorId).orElseThrow(null);
		    // Retrieve the user associated with the doctor, or throw an exception if it does not exist
		    AppUser user = userRepo.findById(doc.getUser().getUserId()).orElseThrow(null);
		    // Update the user's information with the information from the DoctorDto object
		    user.setFirstName(doctor.getFirstName());
		    user.setLastName(doctor.getLastName());
		    user.setEmail(doctor.getEmail());
		    user.setAge(doctor.getAge());
		    user.setGender(doctor.getGender());
		    user.setMobNo(doctor.getMobNo());
		    user.setSalary(doctor.getSalary());
		    user.setAddress(doctor.getAddress());
		    // Set the doctor's user to the updated user and update the doctor's information with the information from the DoctorDto object
		    doc.setUser(user);
		    doc.setDepartment(doctor.getDepartment());
		    doc.setTreatmentFees(doctor.getTreatmentFees());
		    // Save the updated user and doctor to the database
		    userRepo.saveAndFlush(user);
		    return doctorRepo.saveAndFlush(doc);
		}

}
