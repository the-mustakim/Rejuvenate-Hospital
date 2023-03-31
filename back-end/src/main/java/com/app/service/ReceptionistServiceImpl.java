package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AppointmentDao;
import com.app.dao.AppointmentSlotDao;
import com.app.dao.BillDao;
import com.app.dao.DoctorDao;
import com.app.dao.PatientDao;
import com.app.dao.PrescriptionDao;
import com.app.dao.UserDao;
import com.app.dto.AddBillDto;
import com.app.dto.AppointmentDto;
import com.app.dto.AppointmentListDto;
import com.app.dto.FinalBillDto;
import com.app.dto.PatientDto;
import com.app.models.AppUser;
import com.app.models.Appointment;
import com.app.models.AppointmentSlots;
import com.app.models.Bill;
import com.app.models.BillStatus;
import com.app.models.Doctor;
import com.app.models.Patient;
import com.app.models.Prescription;
import com.app.models.Role;
import com.app.models.Status;
import com.app.models.TreatmentStatus;

@Service
@Transactional
public class ReceptionistServiceImpl implements ReceptionistService {

	
	@Autowired
	private PatientDao patientDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private DoctorDao doctorDao;
	
	@Autowired
	private AppointmentSlotDao appointmentSlotDao;
	
	@Autowired
	private AppointmentDao appointmentDao;
	
	@Autowired
	private BillDao billDao;
	
	@Autowired
	private PrescriptionDao prescriptiondao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private EmailServiceImpl emailService;
	
	
	@Override
	// This method adds a new patient to the system by creating a new AppUser and a new Patient entity
	public Patient addPatient(PatientDto patient) {

		// Save the new AppUser
		AppUser user = userDao.save(new AppUser(patient.getFirstName(),patient.getLastName(),patient.getEmail(),passwordEncoder.encode(patient.getPassword()),patient.getAge(),patient.getGender(),patient.getMobNo(),0,patient.getRole(),patient.getSecurityQuestion(),patient.getSecurityAnswer(),patient.getAddress()));
		
		// Save the new Patient with a reference to the AppUser
		Patient newPatient = patientDao.save(new Patient(patient.getBloodGroup(),patient.getMedicalHistory(),user));
		String to = user.getEmail();
	    String subject = "Registration Successfull with Rejuvenate Hospital";
	    String text = "Dear "+user.getFirstName()+",\r\n"
	    		+ "\r\n"
	    		+"We are delighted to inform you that your registration with Rejuvenate Hospital has been successful. We look forward to serving you with the highest level of care and ensuring that you receive the best possible treatment during your stay with us.\r\n"
	    		+"\r\n"
	    		+ "At Rejuvenate Hospital, we pride ourselves on providing our patients with a comfortable and supportive environment. Our highly trained and experienced medical staff is dedicated to meeting your individual needs and ensuring that your health and wellbeing are always a top priority.\r\n"
	    		+"\r\n"
	    		+ "We encourage you to take advantage of the various amenities and services that we offer, including our state-of-the-art facilities, personalized care plans, and wellness programs. Our goal is to help you achieve optimal health and to support you on your journey to wellness.\r\n"
	    		+"\r\n"
	    		+ "Should you have any questions or concerns, please do not hesitate to contact us. We are always here to assist you in any way we can.\r\n"
	    		+"\r\n"
	    		+"Thank you for choosing Rejuvenate Hospital as your healthcare provider. We are honored to have the opportunity to serve you.\r\n"
	    		+"\r\n"
	    		+ "Your Login Credentials,\r\n"
	    		+"\r\n"
	    		+ "Email: " + user.getEmail()+"\r\n"
	    		+"PateintId: "+newPatient.getPatientId()+"\r\n"
	    		+"Password: "+patient.getPassword()+"\r\n"
	    		+"\r\n"
	    		+"Best wishes,\r\n"
	    		+ "Rejuvenate Hospital";
	    emailService.sendSimpleMessage(to, subject, text);
		// Return the new Patient entity
		return newPatient;
	}

	// This method returns a list of all the receptionists
	@Override
	public List<AppUser> showAllReceptionist() {
		
		// Retrieve all the AppUsers with the role ROLE_RECEPTIONIST
		return userDao.findByRole(Role.ROLE_RECEPTIONIST);
	}

	// This method retrieves a specific patient by their ID
	@Override
	public Patient getPatient(Integer patientId) {
		
		// Retrieve the Patient entity with the given ID or throw an exception if it does not exist
		return patientDao.findById(patientId).orElseThrow();
	}

	// This method retrieves a list of all the doctors
	@Override
	public List<Doctor> getDoctorList() {
		
		// Retrieve all the Doctor entities
		return doctorDao.findAll();
	}

	// This method retrieves a list of available appointment slots for a specific doctor
	@Override
	public List<AppointmentSlots> getSlots(Integer doctorId) {
		
		// Retrieve all the available appointment slots for the given doctor
		return appointmentSlotDao.findAppointmentSlotsByDoc(doctorId, Status.AVAILABLE);
	}

	// This method adds a new appointment to the system
	@Override
	public String addAppointment(AppointmentDto appointmentDto) {
		
		// Retrieve the patient, doctor, and appointment slot entities associated with the new appointment
		Patient patient = patientDao.findById(appointmentDto.getPatientId()).orElseThrow();
		Doctor doctor = doctorDao.findById(appointmentDto.getDoctorId()).orElseThrow();
		AppointmentSlots slot = appointmentSlotDao.findById(appointmentDto.getAppointmentSlotId()).orElseThrow();
		
		// Mark the appointment slot as occupied
		slot.setStatus(Status.OCCUPIED);
		
		// Save the new appointment with a reference to the patient, doctor, and appointment slot
		Appointment appointment = appointmentDao.saveAndFlush(new Appointment(appointmentDto.getAppointmentTakenDate(), appointmentDto.getAppointmentDate(), appointmentDto.getProblemDescription(), appointmentDto.getTreatmentStatus(), appointmentDto.getBillStatus(), doctor, patient, slot));
		
		String to = patient.getUser().getEmail();
	    String subject = "Appointment Scheduled Successfully";
	    String text = "Dear "+patient.getUser().getFirstName()+",\r\n"
	    			+ "\r\n"
	    			+ "We hope this email finds you well.\r\n"
	    			+ "\r\n"
	    			+ "We are writing to confirm that your appointment at Rejuvenate Hospital has been scheduled with Dr."+doctor.getUser().getFirstName()+".\r\n"
	    			+ "\r\n"
	    			+ "Please find the details of your appointment below:\r\n"
	    			+ "\r\n"
	    			+"Appointment Id:"+appointment.getAppointmentId()+"\n"
	    			+ "Doctor:"+"Dr."+doctor.getUser().getFirstName()+"\n"
	    			+ "Date:"+appointment.getAppointmentTakenDate()+"\n"
	    			+ "Time:"+slot.getStartTime()+" to "+slot.getEndTime()+"\n"
	    			+ "\r\n"
	    			+ "Please plan to arrive at least 15 minutes before your scheduled appointment time. This will give you time to check in, complete any necessary paperwork, and prepare for your consultation with the doctor.\r\n"
	    			+ "\r\n"
	    			+ "Thank you for choosing Rejuvenate Hospital and Dr."+doctor.getUser().getFirstName()+" for your healthcare needs. We look forward to seeing you at your scheduled appointment.\r\n"
	    			+ "\r\n"
	    			+ "Best regards,\r\n"
	    			+ "Rejuvenate Hospital";
	    
	    emailService.sendSimpleMessage(to, subject, text);
		// Return a success message
		return "Appointment Added";
	}
	
	//Retrieves all the appointments scheduled on a specific date, and generates a list of AppointmentListDto objects representing these appointments
	@Override
	public List<AppointmentListDto> getAllAppointments(LocalDate appointmentdate) {
		List<Appointment> appointmentList=appointmentDao.findByAppointmentDate(appointmentdate);
		List<AppointmentListDto> appointmentDtos=new ArrayList<>();
		
		appointmentList.forEach((app)->{
			//Bill bill;
			if(app.getTreatmentStatus()==TreatmentStatus.ATTENDED)
			{
				//bill=billDao.findBillByAppointmentId(app.getAppointmentId());
				List<Prescription> prescriptionList=prescriptiondao.findAllByAppointmentAppointmentId(app.getAppointmentId());
				double totalMedicinePrice=0.0;
				for(Prescription pre: prescriptionList)
				{
					totalMedicinePrice=totalMedicinePrice+pre.getPrice();
				}
				appointmentDtos.add(new AppointmentListDto(app.getAppointmentId(),app.getAppointmentTakenDate(),app.getAppointmentDate(),app.getAppointmentSlot().getStartTime(),app.getAppointmentSlot().getEndTime(),app.getTreatmentStatus(),totalMedicinePrice+app.getDoctor().getTreatmentFees(),app.getPatient().getBloodGroup(),app.getPatient().getUser().getFirstName(),app.getPatient().getUser().getLastName(),app.getPatient().getUser().getAge(),app.getPatient().getUser().getMobNo(),app.getDoctor().getUser().getFirstName(),app.getBillStatus()));
			}
			else
			{
				appointmentDtos.add(new AppointmentListDto(app.getAppointmentId(),app.getAppointmentTakenDate(),app.getAppointmentDate(),app.getAppointmentSlot().getStartTime(),app.getAppointmentSlot().getEndTime(),app.getTreatmentStatus(),0.0,app.getPatient().getBloodGroup(),app.getPatient().getUser().getFirstName(),app.getPatient().getUser().getLastName(),app.getPatient().getUser().getAge(),app.getPatient().getUser().getMobNo(),app.getDoctor().getUser().getFirstName(),app.getBillStatus()));
			}
		});
		
		return appointmentDtos;
	}

//	@Override
//	public FinalBillDto getBill(Appointment appointment) {
//		List<Prescription> prescriptionList=prescriptiondao.findAllByAppointmentAppointmentId(appointment.getAppointmentId());
//		//Bill bill=billDao.findBillByAppointmentId(appointment.getAppointmentId());
//		double totalMedicinePrice=0.0;
//		for(Prescription pre: prescriptionList)
//		{
//			totalMedicinePrice=totalMedicinePrice+pre.getPrice();
//		}
//		return new FinalBillDto(appointment.getAppointmentId(),LocalDate.now(),appointment.getPatient().getUser().getFirstName(),appointment.getPatient().getUser().getLastName(),appointment.getPatient().getUser().getEmail(),appointment.getPatient().getUser().getAge(),appointment.getPatient().getUser().getMobNo(),appointment.getDoctor().getUser().getFirstName(),appointment.getDoctor().getDepartment(),prescriptionList,totalMedicinePrice,prescriptionList.get(0).getAppointment().getDoctor().getTreatmentFees(),totalMedicinePrice+prescriptionList.get(0).getAppointment().getDoctor().getTreatmentFees());
//		//return null;
//	}
	
	// This method calculates the bill for a particular appointment
	@Override
	public FinalBillDto getBill(Integer appointmentId) {
		// Get all prescriptions for the appointment
		List<Prescription> prescriptionList=prescriptiondao.findAllByAppointmentAppointmentId(appointmentId);
		
		// Get the appointment object by appointmentId
		Appointment appointment=appointmentDao.findById(appointmentId).orElseThrow();
		// Calculate the total price of medicines prescribed
		double totalMedicinePrice=0.0;
		for(Prescription pre: prescriptionList)
		{
			totalMedicinePrice=totalMedicinePrice+pre.getPrice();
		}
		// Create a FinalBillDto object and return it
		return new FinalBillDto(appointment.getAppointmentId(),LocalDate.now(),appointment.getPatient().getUser().getFirstName(),appointment.getPatient().getUser().getLastName(),appointment.getPatient().getUser().getEmail(),appointment.getPatient().getUser().getAge(),appointment.getPatient().getUser().getMobNo(),appointment.getDoctor().getUser().getFirstName(),appointment.getDoctor().getDepartment(),prescriptionList,totalMedicinePrice,prescriptionList.get(0).getAppointment().getDoctor().getTreatmentFees(),totalMedicinePrice+prescriptionList.get(0).getAppointment().getDoctor().getTreatmentFees());
		
	}

	// This method adds a bill to the database for a particular appointment
	@Override
	public Bill addBillToDb(AddBillDto billDto){
		// Get the appointment object by appointmentId
		Appointment appointment = appointmentDao.findById(billDto.getAppointmentId()).orElse(null);
		// Create a Bill object and save it to the database
		Bill addedBill=billDao.save(new Bill(LocalDate.now(),billDto.getTotalMedicinePrice(),billDto.getTreatementFees(),billDto.getTotalPrice(),appointment));
		return addedBill;
	}
	
	// This method updates the bill status of a particular appointment to "GENERATED"
	@Override
	public String updateBillStatus(Integer appointmentId) {
		// Get the appointment object by appointmentId
		Appointment appointment=appointmentDao.findById(appointmentId).orElseThrow();
		// Update the bill status of the appointment to "GENERATED"
		appointment.setBillStatus(BillStatus.GENERATED);
		appointmentDao.saveAndFlush(appointment);
		return "Bill Status Updated";
	}
	
}
