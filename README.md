# Hospital Management System

## Overview

The **Hospital Management System (HMS)** is an integrated software solution designed to streamline hospital operations. It covers various aspects such as patient registration, doctor management, appointment scheduling, and medicine distribution. The system is accessible to different users with role-based access, including administrators, doctors, patients, receptionists, and pharmacists. 

The software enables administrators and authorized personnel to manage patient and staff details, ensure secure data storage, and provide a user-friendly interface for patients to interact with healthcare services.

### Key Features

1. **Patient Registration & Management**  
   - Patients are assigned unique IDs upon registration.  
   - Personal and medical information are securely stored in the system.  
   - Patients can book appointments and view their prescriptions.

2. **Doctor & Staff Management**  
   - Admin can manage doctor details, availability, and schedules.  
   - Doctors can view and update patient records, provide prescriptions, and manage appointments.

3. **Authentication & Access Control**  
   - **JWT Authentication** ensures secure access to the application.  
   - Role-based access control (Admin, Doctor, Receptionist, Patient, Pharmacist).

4. **Appointment Booking**  
   - Patients can book appointments with available doctors.  
   - Receptionists and Admin can manage and update appointments.

5. **Prescription & Medicine Management**  
   - Doctors can provide prescriptions, which patients can view.  
   - Pharmacists assign and manage medicines for prescriptions.

6. **Billing & Payments**  
   - Patients can pay doctor fees and receive a bill receipt after online payments.

7. **Complaint Management**  
   - Users can submit complaints, which are then referred to the relevant authorities for action.

8. **User Interface**  
   - **User-friendly interface** for smooth navigation and interaction with the system.

9. **Data Security**  
   - Strong encryption mechanisms ensure patient and staff data security.

---

## System Modules

### 1. **Administrator Module**
   - Managing patient and doctor information.
   - Managing user roles and permissions.
   - Referring complaints to relevant authorities.

### 2. **Doctor Module**
   - Viewing and managing patient information and appointments.
   - Writing prescriptions for patients.
   - Providing medical advice and notes to patients.

### 3. **Patient Module**
   - Registering with the hospital and managing their profile.
   - Booking and managing appointments with doctors.
   - Viewing prescriptions and medical history.
   - Paying doctor fees online and receiving bill receipts.

### 4. **Receptionist Module**
   - Assisting patients with appointment booking and registration.
   - Managing doctor schedules and availability.
   - Assisting with patient check-in and check-out.

### 5. **Pharmacist Module**
   - Viewing and managing prescriptions provided by doctors.
   - Assigning and dispensing medicines to patients based on prescriptions.
   - Managing medicine inventory and stock.

---

## Technologies Used

### Frontend
- **React**: For building the dynamic user interface.
- **CSS**: For styling the application.
- **Bootstrap**: For responsive web design.
- **HTML**: For the basic structure of the web pages.

### Backend
- **Java 8**: The backend logic is written in Java.
- **Spring Boot**: For building the REST API and backend services.
- **MySQL**: For database management and storing hospital data.
- **Docker**: For contenarization on AWS EC2 deployement

---
