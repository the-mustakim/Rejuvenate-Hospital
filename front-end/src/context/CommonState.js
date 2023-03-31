import React from "react";
import { useState } from "react";
import hmsContext from "./hmsContext";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommonState = (props) => {
  const token = localStorage.getItem("token");
  const host = process.env.REACT_APP_HOST_LOCATION;
  const history = useHistory();

  //Admmin State Management---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [dashboardDetails, setDashboardDetails] = useState({
    Receptionist: "",
    MedicineQuantity: "",
    TotalAppointments: "",
    Patient: "",
    Pharmacist: "",
    Doctor: "",
    TotalEarnings:""
  });

  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    mobNo: "",
    salary: "",
    role: "",
    securityQuestion: "",
    securityAnswer: "",
    createdAt: "",
    address: {
      street: "",
      city: "",
      pincode: "",
    },
  });
  const [addDoc, setAddDoc] = useState({
    email: "",
    department: "",
    treatmentFees: "",
    isAvailable: "",
  });

  //Apponintment Details
  const [appts, setAppts] = useState([
    {
      appointmentId: "",
      appointmentTakenDate: "",
      appointmentDate: "",
      problemDescription: "",
      treatmentStatus: "",
      billStatus: "",
      doctor: {
        user: {
          firstName: "",
          lastName: "",
        },
      },
      patient: {
        user: {
          firstName: "",
          lastName: "",
        },
      },
      appointmentSlot: {
        startTime: "",
        endTime: "",
      },
    },
  ]);

  const [filteredAppts, setFilteredAppts] = useState([
    {
      appointmentId: "",
      appointmentTakenDate: "",
      appointmentDate: "",
      problemDescription: "",
      treatmentStatus: "",
      billStatus: "",
      doctor: {
        user: {
          firstName: "",
          lastName: "",
        },
      },
      patient: {
        user: {
          firstName: "",
          lastName: "",
        },
      },
      appointmentSlot: {
        startTime: "",
        endTime: "",
      },
    },
  ]);

  const [doctors, setDoctors] = useState([
    {
      doctorId: "",
      department: "",
      treatmentFees: "",
      user: {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: "",
        mobNo: "",
        salary: "",
      },
    },
  ]);

  const [fdoctors, fsetDoctors] = useState([
    {
      doctorId: "",
      department: "",
      treatmentFees: "",
      user: {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: "",
        mobNo: "",
        salary: "",
      },
    },
  ]);

  const [med, setMed] = useState([
    {
      medicineId: "",
      medicineName: "",
      manufacturedDate: "",
      expiryDate: "",
      stock: "",
      price: "",
      company: "",
      medicineAddedDate: "",
    },
  ]);

  const [fmed, fsetMed] = useState([
    {
      medicineId: "",
      medicineName: "",
      manufacturedDate: "",
      expiryDate: "",
      stock: "",
      price: "",
      company: "",
      medicineAddedDate: "",
    },
  ]);
  const [patients, setPatients] = useState([
    {
      patientId: "",
      bloodGroup: "",
      user: {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: "",
        mobNo: "",
      },
    },
  ]);

  const [fpatients, fsetPatients] = useState([
    {
      patientId: "",
      bloodGroup: "",
      user: {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: "",
        mobNo: "",
      },
    },
  ]);

  const [pharmacists, setPharmacists] = useState([
    {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "",
      mobNo: "",
      salary: "",
    },
  ]);

  const [fpharmacists, fsetPharmacists] = useState([
    {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "",
      mobNo: "",
      salary: "",
    },
  ]);

  const [receptionists, setReceptionists] = useState([
    {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "",
      mobNo: "",
      salary: "",
    },
  ]);

  const [freceptionists, fsetReceptionists] = useState([
    {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "",
      mobNo: "",
      salary: "",
    },
  ]);

  const [urecp, setUrecp] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    mobNo: "",
    salary: "",
    address: {
      street: "",
      city: "",
      pincode: "",
    },
  });

  const [udoctors, setUdoctors] = useState({
    doctorId: "",
    department: "",
    treatmentFees: "",
    user: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "",
      mobNo: "",
      salary: "",
      address: {
        street: "",
        city: "",
        pincode: "",
      },
    },
  });

  const [refreshPage, setrefreshPage] = useState(false)

  //Add User
  const addUser = async (
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    mobNo,
    salary,
    role,
    securityQuestion,
    securityAnswer,
    street,
    city,
    pincode
  ) => {
    const data = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      mobNo,
      salary,
      role,
      securityQuestion,
      securityAnswer,
      address: { street, city, pincode },
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    //debugger;
    await axios.post(`${host}/admin/registerUser`, data, options).then(
      (response) => {
        //console.log(response);
        //debugger;
        toast.success("User has been added successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      (error) => {
        //debugger;
        //console.log(error);
        toast.error("Unable to add the user Please try after some time!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };

  const addDoctor = async (email, department, treatmentFees, isAvailable) => {
    //debugger;
    const data = JSON.stringify({
      email,
      department,
      treatmentFees,
      isAvailable,
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    //debugger;
    await axios.post(`${host}/admin/registerDoctor`, data, options).then(
      (response) => {
        //console.log(response);
        //debugger;
      },
      (error) => {
        //debugger;
        //console.log(error);
      }
    );
  };

  //get the dashboard details
  const getDashboard = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios.get(`${host}/admin`, options).then(
      (response) => {
        setDashboardDetails(response.data);
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  //get All Appointment
  const getAllAppt = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios.get(`${host}/admin/getAllAppointments`, options).then(
      (response) => {
        setAppts(response.data);
        setFilteredAppts(response.data);
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  //getAll Doctors
  const getAllDocs = async () => {
    //debugger;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios.get(`${host}/admin/getAllDoctors`, options).then(
      (response) => {
        //debugger;
        setDoctors(response.data);
        fsetDoctors(response.data);
      },
      (error) => {
        //debugger;
        //console.log(error);
      }
    );
  };

  //getAllMedss
  const bringMeds = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios.get(`${host}/admin/getAllMedicines`, options).then(
      (response) => {
        //debugger;
        setMed(response.data);
        fsetMed(response.data);
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  //getAllPateints
  const getPatients = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios.get(`${host}/admin/getAllPatients`, options).then(
      (response) => {
        //debugger;
        setPatients(response.data);
        fsetPatients(response.data);
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  //getAllPharmcistDetails
  const getAllPharma = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios.get(`${host}/admin/getAllPharmacists`, options).then(
      (response) => {
        //debugger;
        setPharmacists(response.data);
        fsetPharmacists(response.data);
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  //getAllReceptionst
  const getAllReceptionst = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios.get(`${host}/admin/getAllReceptionists`, options).then(
      (response) => {
        //debugger;
        setReceptionists(response.data);
        fsetReceptionists(response.data);
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  //getUser
  const getUser = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios
      .get(
        `${host}/admin/getUserById/${localStorage.getItem("userId")}`,
        options
      )
      .then(
        (response) => {
          setUrecp(response.data);
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  //UpdateUser
  const updateRecp = async (
    userId,
    firstName,
    lastName,
    email,
    age,
    gender,
    mobNo,
    salary,
    street,
    city,
    pincode
  ) => {
    //debugger;
    const data = JSON.stringify({
      userId,
      firstName,
      lastName,
      email,
      age,
      gender,
      mobNo,
      salary,
      address: { street, city, pincode },
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios
      .put(`${host}/admin/updateUser/${urecp.userId}`, data, options)
      .then(
        (response) => {
          //debugger;
          //console.log(response);
          setUrecp(response.data);

          toast.success("User has been updated successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
        (error) => {
          //debugger;
          //console.log(error);

          toast.error("Unable to update the user Please try after some time!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
  };

  //getDoctor
  const getDoc = async () => {
    //debugger;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios
      .get(
        `${host}/admin/getDoctorById/${localStorage.getItem("doctorId")}`,
        options
      )
      .then(
        (response) => {
          //debugger;
          setUdoctors(response.data);
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  //UpdateDoctor
  const updateDoc = async (
    doctorId,
    department,
    treatmentFees,
    userId,
    firstName,
    lastName,
    email,
    age,
    gender,
    mobNo,
    salary,
    street,
    city,
    pincode
  ) => {
    //debugger;
    const data = JSON.stringify({
      doctorId,
      department,
      treatmentFees,
      userId,
      firstName,
      lastName,
      email,
      age,
      gender,
      mobNo,
      salary,
      address: { street, city, pincode },
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios
      .put(`${host}/admin/updateDoctor/${udoctors.doctorId}`, data, options)
      .then(
        (response) => {
          //debugger;
          //console.log(response);
          setUdoctors(response.data);
          setrefreshPage(true);
          toast.success("Doctor has been updated successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
        (error) => {
          //debugger;
          //console.log(error);

          toast.error(
            "Unable to update the doctor Please try after some time!",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      );
  };

  // Patient State Management ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    mobNo: "",
    salary: "0",
    role: "ROLE_PATIENT",
    securityQuestion: "",
    securityAnswer: "",
    address: {
      street: "",
      city: "",
      pincode: "",
    },
    bloodGroup: "",
    medicalHistory: "",
  });
  const [appt, setAppt] = useState([
    {
      appointmentId: "",
      appointmentTakenDate: "",
      appointmentDate: "",
      problemDescription: "",
      treatmentStatus: "",
      appointmentSlot: {
        startTime: "",
        endTime: "",
        doctor: { user: { firstName: "", lastName: "" } },
      },
      patient: { patientId: "" },
    },
  ]);
  //debugger
  const [filteredAppt, setfilteredAppt] = useState([
    {
      appointmentId: "",
      appointmentTakenDate: "",
      appointmentDate: "",
      problemDescription: "",
      treatmentStatus: "",
      appointmentSlot: {
        startTime: "",
        endTime: "",
        doctor: { user: { firstName: "", lastName: "" } },
      },
      patient: { patientId: "" },
    },
  ]);

  const [Pbill, setPBill] = useState([
    {
      appointmentId: "",
      billingDate: "",
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      mobNo: "",
      DoctorName: "",
      department: "",
      totalMedicinePrice: "",
      treatementFees: "",
      totalPrice: "",
    },
  ]);

  const [Pprescrpition, setPPrescription] = useState([
    {
      assignedMedicine: "",
      quantityAssigned: "",
      price: "",
      medicine: {
        expiryDate: "",
        company: "",
      },
    },
  ]);

  const [Ppat, setPPat] = useState({
    patientId: "",
    bloodGroup: "",
    user: {
      firstName: "",
      lastName: "",
    },
  });

  const [Pdoct, setPDoct] = useState({
    doctorId: "",
    department: "",
    user: {
      firstName: "",
      lastName: "",
    },
  });

  //get patient Details
  const getPatient = async () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get(
        `${host}/patient/getPatient/${localStorage.getItem("user_id")}`,
        options
      )
      .then(
        (response) => {
          //debugger;
          setPatient(response.data.user);
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  //Edt or Update Patient Details
  const updatePatient = async (
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    mobNo,
    salary,
    role,
    securityQuestion,
    securityAnswer,
    street,
    city,
    pincode,
    bloodGroup,
    medicalHistory
  ) => {
    //debugger;
    const data = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      mobNo,
      salary,
      role,
      securityQuestion,
      securityAnswer,
      address: { street, city, pincode },
      bloodGroup,
      medicalHistory,
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios
      .put(
        `${host}/patient/updatePatient/${localStorage.getItem("user_id")}`,
        data,
        options
      )
      .then(
        (response) => {
          //console.log(response);
          toast.success("Profile Updated Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
        (error) => {
          //debugger;
          //console.log(error);
          toast.error("Unable to Update Profile!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
  };

  //Show Patient Appointment
  const showPatientAppt = async () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get(
        `${host}/patient/getAppointments/${localStorage.getItem("user_id")}`,
        options
      )
      .then(
        (response) => {
          setAppt(response.data);
          setfilteredAppt(response.data);
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  const fetchBillGeneratePatient = async () => {
    //debugger;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get(
        `${host}/patient/fetchBill/${localStorage.getItem("appointmentId")}`,
        options
      )
      .then(
        (response) => {
          //debugger;
          setPBill(response.data);
          setPPrescription(response.data.prescriptionList);
          setPPat(response.data.prescriptionList[0].appointment.patient);
          setPDoct(response.data.prescriptionList[0].appointment.doctor);
          setFlag(true)
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  //Generate Bill in Pdf Format
  const generatePdfPateint = async () => {
    //debugger;
    const doc = new jsPDF();

    // Add hospital name and address
    doc.setFontSize(18);
    doc.text("Rejuvenate Hospital", 20, 20);
    doc.setFontSize(12);
    doc.text("123 Main Street, City, State", 20, 30);

    // Add bill number and date
    doc.text(`Bill No: ${Pbill.appointmentId}`, 160, 20);
    doc.text(`Date: ${Pbill.billingDate}`, 160, 30);

    // Add patient details
    doc.setFontSize(14);
    doc.text(
      `Patient Name: ${Ppat.user.firstName} ${pat.user.lastName}`,
      20,
      50
    );
    doc.text(`Patient ID: ${Ppat.patientId}`, 20, 60);
    doc.text(
      `Doctor Name: ${Pdoct.user.firstName} ${Pdoct.user.lastName}`,
      20,
      80
    );
    doc.text(`Doctor ID: ${Pdoct.doctorId}`, 20, 90);
    doc.text(`Specialization: ${Pdoct.department}`, 20, 100);

    // Add medicine details as a table
    doc.setFontSize(12);
    doc.text("Medicine Details", 20, 120);
    doc.autoTable({
      startY: 130,
      head: [["Medicine Name", "Company", "Expiry Date", "Qty", "Price"]],
      body: Pprescrpition.map((medicine) => [
        medicine.assignedMedicine,
        medicine.medicine.company,
        medicine.medicine.expiryDate,
        medicine.quantityAssigned,
        medicine.price,
      ]),
      theme: "striped",
      headStyles: { fillColor: [221, 221, 221] },
    });

    // Add total fees as a table
    doc.setFontSize(14);
    doc.text("Total Fees", 110, doc.autoTable.previous.finalY + 20);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 30,
      head: [["Treatment Fees", "Medicine Fees", "Total"]],
      body: [
        [Pbill.treatementFees, Pbill.totalMedicinePrice, Pbill.totalPrice],
      ],
      headStyles: { fillColor: [221, 221, 221] },
      margin: { top: 10 },
    });

    // Save the PDF
    doc.save("bill.pdf");
    setFlag(false)

    // Send email to patient with the generated PDF
    const emailData = {
      to: Pbill.email,
      subject: "Your bill",
      message: "Please find your bill attached below",
      attachment: doc.output("blob"),
      attachmentName: "bill.pdf",
    };
    // axios.post(`${host}/sendEmail`, emailData, options).then(
    //   (response) => {
    //     console.log("Email sent successfully");
    //   },
    //   (error) => {
    //     console.log("Error sending email");
    //   }
    // );
  };

  //Pharmacist State----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const { medicineName } = useParams();
  const [medicine, setMedicine] = useState({
    medicineName: "",
    manufacturedDate: "",
    expiryDate: "",
    stock: "",
    price: "",
    company: "",
    medicineAddedDate: "",
  });
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [Editmed, setEditMed] = useState({
    medicineId: "",
    medicineName: "",
    manufacturedDate: "",
    expiryDate: "",
    stock: "",
    price: "",
    company: "",
    medicineAddedDate: "",
  });

  const [medSearch, setmedSearch] = useState([
    {
      medicineId: "",
      medicineName: "",
      manufacturedDate: "",
      expiryDate: "",
      stock: "",
      price: "",
      company: "",
      medicineAddedDate: "",
    },
  ]);

  const [filteredMed, setfilteredMed] = useState([
    {
      medicineId: "",
      medicineName: "",
      manufacturedDate: "",
      expiryDate: "",
      stock: "",
      price: "",
      company: "",
      medicineAddedDate: "",
    },
  ]);

  //Add Medicine
  const addMed = async (
    medicineName,
    manufacturedDate,
    expiryDate,
    stock,
    price,
    company,
    medicineAddedDate
  ) => {
    //debugger;
    const data = JSON.stringify({
      medicineName,
      manufacturedDate,
      expiryDate,
      stock,
      price,
      company,
      medicineAddedDate,
    });
    //debugger;
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(`${host}/pharmacist/register`, data, options).then(
      (response) => {
        //console.log(response);
        toast.success("Medicine Added Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      (error) => {
        //debugger;
        //console.log(error);
        toast.error("Unable to Medicine!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };

  //Edit Medicines
  const getMed = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    //debugger;
    await axios
      .get(
        `${host}/pharmacist/getMedicineById/${localStorage.getItem("medicineId")}`,
        options
      )
      .then(
        (response) => {
          //debugger;
          setEditMed(response.data);
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  //Update Medicine
  const updateMedicine = async (
    medicineName,
    manufacturedDate,
    expiryDate,
    stock,
    price,
    company,
    medicineAddedDate
  ) => {
    //debugger;
    const data = JSON.stringify({
      medicineName,
      manufacturedDate,
      expiryDate,
      stock,
      price,
      company,
      medicineAddedDate,
    });
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios
      .put(
        `${host}/pharmacist/updateMedicine/${Editmed.medicineId}`,
        data,
        options
      )
      .then(
        (response) => {
          //console.log(response);
          setEditMed(response.data);
          toast.success("Medicine Edited Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
        (error) => {
          //debugger;
          //console.log(error);
          toast.error("Unable to Edit Medicine!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
  };

  //Search Medicine
  const getMeds = async () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.get(`${host}/pharmacist/getAllMedicines`, options).then(
      (response) => {
        setmedSearch(response.data);
        setfilteredMed(response.data);
      },
      (error) => {
        //debugger;
        //console.log(error);
      }
    );
  };

  //Receptionist State----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [Rpatient, setRPatient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    mobNo: "",
    salary: "0",
    role: "ROLE_PATIENT",
    securityQuestion: "",
    securityAnswer: "",
    createdAt: "",
    address: {
      street: "",
      city: "",
      pincode: "",
    },
    bloodGroup: "",
    medicalHistory: "",
  });

  const [PId, setPId] = useState("");

  const [isLocked, setIsLocked] = useState(false);
  const [R2patient, setR2Patient] = useState({
    patientId: "",
    bloodGroup: "",
    user: { userId: "", firstName: "", lastName: "", email: "", age: "" },
  });
  const [Rdoctor, setRdoctor] = useState([
    {
      doctorId: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
    },
  ]);

  const [appointmentSlot, setAppointmentSlot] = useState([
    {
      appointmentSlotId: "",
      startTime: "",
      endTime: "",
      status: "",
    },
  ]);

  const [appointment, setAppointment] = useState({
    appointmentTakenDate: "",
    appointmentDate: "",
    problemDescription: "",
    treatmentStatus: "",
    billStatus: "NOT_GENERATED",
    patientId: "",
    doctorId: "",
    appointmentSlotId: "",
  });

  const [Rappt, setRappt] = useState([
    {
      appointmentId: "",
      appointmentTakenDate: "",
      appointmentDate: "",
      startTime: "",
      endTime: "",
      treatmentStatus: "",
      totaltreatementFees: "",
      bloodGroup: "",
      firstName: "",
      lastName: "",
      age: "",
      mobNo: "",
      doctorName: "",
      billStatus: "",
    },
  ]);
  //debugger
  const [RfilteredAppt, setRfilteredAppt] = useState([
    {
      appointmentId: "",
      appointmentTakenDate: "",
      appointmentDate: "",
      startTime: "",
      endTime: "",
      treatmentStatus: "",
      totaltreatementFees: "",
      bloodGroup: "",
      firstName: "",
      lastName: "",
      age: "",
      mobNo: "",
      doctorName: "",
      billStatus: "",
    },
  ]);

  // const [Gbill, setGBill] = useState([
  // ]);

  // const [Gprescrpition, setGPrescription] = useState([
  // ]);

  // const [Gpat, setGPat] = useState({
  // });

  // const [Gdoct, setGDoct] = useState({
  // });
  //let flag=false;
  const [flag, setFlag] = useState(false)
  const [Gbill, setGBill] = useState([
    {
      appointmentId: "",
      billingDate: "",
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      mobNo: "",
      DoctorName: "",
      department: "",
      totalMedicinePrice: "",
      treatementFees: "",
      totalPrice: "",
    },
  ]);

  const [Gprescrpition, setGPrescription] = useState([
    {
      assignedMedicine: "",
      quantityAssigned: "",
      price: "",
      medicine: {
        expiryDate: "",
        company: "",
      },
    },
  ]);

  const [Gpat, setGPat] = useState({
    patientId: "",
    bloodGroup: "",
    user: {
      firstName: "",
      lastName: "",
    },
  });

  const [Gdoct, setGDoct] = useState({
    doctorId: "",
    department: "",
    user: {
      firstName: "",
      lastName: "",
    },
  });

  const [bill, setBill] = useState([
    {
      appointmentId: "",
      billingDate: "",
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      mobNo: "",
      DoctorName: "",
      department: "",
      totalMedicinePrice: "",
      treatementFees: "",
      totalPrice: "",
    },
  ]);

  const [prescrpition, setPrescription] = useState([
    {
      assignedMedicine: "",
      quantityAssigned: "",
      price: "",
      medicine: {
        expiryDate: "",
        company: "",
      },
    },
  ]);

  const [pat, setPat] = useState({
    patientId: "",
    bloodGroup: "",
    user: {
      firstName: "",
      lastName: "",
    },
  });

  const [doct, setDoct] = useState({
    doctorId: "",
    department: "",
    user: {
      firstName: "",
      lastName: "",
    },
  });

  //Add the Patient
  const addPatient = async (
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    mobNo,
    salary,
    role,
    securityQuestion,
    securityAnswer,
    street,
    city,
    pincode,
    bloodGroup,
    medicalHistory
  ) => {
    //debugger;
    salary = "0";
    role = "ROLE_PATIENT";
    const data = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      mobNo,
      salary,
      role,
      securityQuestion,
      securityAnswer,
      address: { street, city, pincode },
      bloodGroup,
      medicalHistory,
    });
    //debugger;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    let tempId;

    await axios
      .post(`${host}/receptionist/registerPatient`, data, options)
      .then(
        (response) => {
          //debugger
          //console.log(response);
          toast.success(
            `Patient has been added successfully with Id:${response.data.patientId}`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          setPId(response.data.patientId);
          tempId = response.data.patientId;
          localStorage.setItem("patientId", response.data.patientId);
          debugger;
        },
        (error) => {
          //debugger;
          //console.log(error);
          toast.error("Unable to Add Patient!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
    return tempId;
  };

  //Add Appointment
  const getAllRDoctors = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios.get(`${host}/receptionist/getAllDoctors`, options).then(
      (response) => {
        setRdoctor(response.data);
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  //get Pateint
  const getPatientById = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get(`${host}/receptionist/getPatient/${appointment.patientId}`, options)
      .then(
        (response) => {
          setR2Patient(response.data);
          setIsLocked(true);
        },
        (error) => {
          //console.log(error);
        }
      );
  };

  //Add Appointment
  const AddAppointment = async (
    appointmentDate,
    problemDescription,
    treatmentStatus,
    billStatus,
    patientId,
    doctorId,
    appointmentSlotId
  ) => {
    //debugger;
    const data = JSON.stringify({
      appointmentDate,
      problemDescription,
      treatmentStatus,
      billStatus,
      patientId,
      doctorId,
      appointmentSlotId,
    });
    // debugger;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios.post(`${host}/receptionist/addAppointment`, data, options).then(
      (response) => {
        //debugger;
        //console.log(response);
        toast.success("Appointment Added Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      (error) => {
        //debugger;
        //console.log(error);
        toast.error("Unable to Add Appointment!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };

  //get All Slots

  const getSlots = async (docId) => {
    const doctorId = docId;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    localStorage.setItem("doctorId", doctorId);
    await axios
      .get(
        `${host}/receptionist/getSlots/${localStorage.getItem("doctorId")}`,
        options
      )
      .then(
        (response) => {
          setAppointmentSlot(response.data);
        },
        (error) => {
          //console.log(error);
        }
      );
  };

  //get Appt with Date
  const getAppt = async () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get(
        `${host}/receptionist/fetchAppointments/${new Date()
          .toISOString()
          .substr(0, 10)}`,
        options
      )
      .then(
        (response) => {
          setRappt(response.data);
          setRfilteredAppt(response.data);
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  //Fetch Bill
  const fetchBill = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get(
        `${host}/receptionist/fetchBill/${localStorage.getItem(
          "appointmentId"
        )}`,
        options
      )
      .then(
        (response) => {
          //debugger;
          setBill(response.data);
          setPrescription(response.data.prescriptionList);
          setPat(response.data.prescriptionList[0].appointment.patient);
          setDoct(response.data.prescriptionList[0].appointment.doctor);
        },
        (error) => {
          //console.log(error);
        }
      );
  };

  //generate the Pdf
  const generate = () => {
    const doc = new jsPDF();

    // Add hospital name and address
    doc.setFontSize(18);
    doc.text("Rejuvenate Hospital", 20, 20);
    doc.setFontSize(12);
    doc.text("123 Main Street, City, State", 20, 30);

    // Add bill number and date
    doc.text(`Bill No: ${bill.appointmentId}`, 160, 20);
    doc.text(`Date: ${bill.billingDate}`, 160, 30);

    // Add patient details
    doc.setFontSize(14);
    doc.text(
      `Patient Name: ${pat.user.firstName} ${pat.user.lastName}`,
      20,
      50
    );
    doc.text(`Patient ID: ${pat.patientId}`, 20, 60);
    doc.text(
      `Doctor Name: ${doct.user.firstName} ${doct.user.lastName}`,
      20,
      80
    );
    doc.text(`Doctor ID: ${doct.doctorId}`, 20, 90);
    doc.text(`Specialization: ${doct.department}`, 20, 100);

    // Add medicine details as a table
    doc.setFontSize(12);
    doc.text("Medicine Details", 20, 120);
    doc.autoTable({
      startY: 130,
      head: [["Medicine Name", "Company", "Expiry Date", "Qty", "Price"]],
      body: prescrpition.map((medicine) => [
        medicine.assignedMedicine,
        medicine.medicine.company,
        medicine.medicine.expiryDate,
        medicine.quantityAssigned,
        medicine.price,
      ]),
      theme: "striped",
      headStyles: { fillColor: [221, 221, 221] },
    });

    // Add total fees as a table
    doc.setFontSize(14);
    doc.text("Total Fees", 110, doc.autoTable.previous.finalY + 20);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 30,
      head: [["Treatment Fees", "Medicine Fees", "Total"]],
      body: [[bill.treatementFees, bill.totalMedicinePrice, bill.totalPrice]],
      headStyles: { fillColor: [221, 221, 221] },
      margin: { top: 10 },
    });

    // Save the PDF
    doc.save("bill.pdf");

    // Send email to patient with the generated PDF
    const emailData = {
      to: bill.email,
      subject: "Your bill",
      message: "Please find your bill attached below",
      attachment: doc.output("blob"),
      attachmentName: "bill.pdf",
    };
    // axios.post(`${host}/sendEmail`, emailData, options).then(
    //   (response) => {
    //     console.log("Email sent successfully");
    //   },
    //   (error) => {
    //     console.log("Error sending email");
    //   }
    // );

    //Method to change bill status to Generated

    async function fetch() {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axios
        .get(
          `${host}/receptionist/updateBill/${localStorage.getItem(
            "appointmentId"
          )}`,
          options
        )
        .then(
          (response) => {
            //console.log(response);
          },
          (error) => {
            //debugger;
            //console.log(error);
          }
        );

      history.push("/MakeBill");
    }
    fetch();
  };

  //Generate Bill
  const fetchBillGenerate = async () => {
    //debugger;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get(
        `${host}/receptionist/fetchBill/${localStorage.getItem(
          "appointmentId"
        )}`,
        options
      )
      .then(
        (response) => {
          //debugger;
          setGBill(response.data);
          setGPrescription(response.data.prescriptionList);
          setGPat(response.data.prescriptionList[0].appointment.patient);
          setGDoct(response.data.prescriptionList[0].appointment.doctor);
          setFlag(true)
          //console.log(flag);
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  //Generate Bill in Pdf Format
  const generatePdf = async () => {
    //debugger;
    const doc = new jsPDF();

    // Add hospital name and address
    doc.setFontSize(18);
    doc.text("Rejuvenate Hospital", 20, 20);
    doc.setFontSize(12);
    doc.text("123 Main Street, City, State", 20, 30);

    // Add bill number and date
    doc.text(`Bill No: ${Gbill.appointmentId}`, 160, 20);
    doc.text(`Date: ${Gbill.billingDate}`, 160, 30);

    // Add patient details
    doc.setFontSize(14);
    doc.text(
      `Patient Name: ${Gpat.user.firstName} ${Gpat.user.lastName}`,
      20,
      50
    );
    doc.text(`Patient ID: ${Gpat.patientId}`, 20, 60);
    doc.text(
      `Doctor Name: ${Gdoct.user.firstName} ${Gdoct.user.lastName}`,
      20,
      80
    );
    doc.text(`Doctor ID: ${Gdoct.doctorId}`, 20, 90);
    doc.text(`Specialization: ${Gdoct.department}`, 20, 100);

    // Add medicine details as a table
    doc.setFontSize(12);
    doc.text("Medicine Details", 20, 120);
    doc.autoTable({
      startY: 130,
      head: [["Medicine Name", "Company", "Expiry Date", "Qty", "Price"]],
      body: Gprescrpition.map((medicine) => [
        medicine.assignedMedicine,
        medicine.medicine.company,
        medicine.medicine.expiryDate,
        medicine.quantityAssigned,
        medicine.price,
      ]),
      theme: "striped",
      headStyles: { fillColor: [221, 221, 221] },
    });

    // Add total fees as a table
    doc.setFontSize(14);
    doc.text("Total Fees", 110, doc.autoTable.previous.finalY + 20);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 30,
      head: [["Treatment Fees", "Medicine Fees", "Total"]],
      body: [
        [Gbill.treatementFees, Gbill.totalMedicinePrice, Gbill.totalPrice],
      ],
      headStyles: { fillColor: [221, 221, 221] },
      margin: { top: 10 },
    });

    // Save the PDF
    doc.save("bill.pdf");
    setFlag(false);

    // Send email to patient with the generated PDF
    const emailData = {
      to: Gbill.email,
      subject: "Your bill",
      message: "Please find your bill attached below",
      attachment: doc.output("blob"),
      attachmentName: "bill.pdf",
    };
    // axios.post(`${host}/sendEmail`, emailData, options).then(
    //   (response) => {
    //     console.log("Email sent successfully");
    //   },
    //   (error) => {
    //     console.log("Error sending email");
    //   }
    // );

    //Method to change bill status to Generated
    //debugger;
    async function fetch() {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axios
        .get(
          `${host}/receptionist/updateBill/${localStorage.getItem(
            "appointmentId"
          )}`,
          options
        )
        .then(
          (response) => {
            //console.log(response);
          },
          (error) => {
            //debugger;
            //console.log(error);
          }
        );

      history.push("/MakeBill");
    }
    fetch();
  };

  //Add Bill
  const addBill = async (
    totalMedicinePrice,
    treatementFees,
    totalPrice,
    appointmentId
  ) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const data = JSON.stringify({
      totalMedicinePrice,
      treatementFees,
      totalPrice,
      appointmentId,
    });

    await axios.post(`${host}/receptionist/addBill`, data, options).then(
      (response) => {
        //console.log(response);
        toast.success("Bill Generated Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      (error) => {
        //debugger;
        //console.log(error);
      }
    );
  };

  //Doctor State-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [navbarComponent1, setnavbarComponent1] = useState("");
  const [navbarLink1, setnavbarLink1] = useState("");
  const [navbarComponent2, setnavbarComponent2] = useState("");
  const [navbarLink2, setnavbarLink2] = useState("");
  const [navbarComponent3, setnavbarComponent3] = useState("");
  const [navbarLink3, setnavbarLink3] = useState("");
  const [navbarComponent4, setnavbarComponent4] = useState("");
  const [navbarLink4, setnavbarLink4] = useState("");

  const InitialAppointments = [
    {
      appointmentId: "",
      appointmentTakenDate: "",
      appointmentDate: "",
      problemDescription: "",
      treatmentStatus: "",
      billStatus: "",
      patient: { patientId: "", user: { firstName: "", lastName: "" } },
    },
  ];
  const [AppointmentList, setAppointmentList] = useState(InitialAppointments);
  const [appointmentId, setappointmentId] = useState(null);
  const [AppointmentRecord, setAppointmentRecord] = useState({
    appointmentId: "",
    appointmentTakenDate: "",
    appointmentDate: "",
    problemDescription: "",
    treatmentStatus: "",
    patient: {
      bloodGroup: "",
      medicalHistory: "",
      user: { firstName: "", lastName: "", age: "" },
    },
    appointmentSlot: { startTime: "", endTime: "" },
  });
  const [doctor, setdoctor] = useState({
    doctorId: "",
    department: "",
    treatmentFees: "",
    isAvailable: "",
  });
  const InitialMedList = [
    {
      medicineId: "",
      medicineName: "",
      manufacturedDate: "",
      expiryDate: "",
      stock: "",
      price: "",
      company: "",
      medicineAddedDate: "",
      QuantityAdded: "",
    },
  ];
  const [getAllMeds, setAllMeds] = useState(InitialMedList);

  const changeNavbar = (navCmpName, navLink) => {
    setnavbarComponent1(navCmpName);
    setnavbarLink1(navLink);
  };

  const changeNavbar2 = (navCmpName, navLink) => {
    setnavbarComponent2(navCmpName);
    setnavbarLink2(navLink);
  };

  const changeNavbar3 = (navCmpName, navLink) => {
    setnavbarComponent3(navCmpName);
    setnavbarLink3(navLink);
  };

  const changeNavbar4 = (navCmpName, navLink) => {
    setnavbarComponent4(navCmpName);
    setnavbarLink4(navLink);
  };

  const showToastMessage = (Msg) => {
    //debugger;
    toast.success(`${Msg}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //get All Appointments
  const getAllAppointments = async () => {
    //API Call
    //debugger
    //let doctorId=doctor.doctorId;
    await axios
      .get(`${host}/doctor/patientlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          //debugger;
          let date = new Date().toISOString().substr(0, 10);
          setAppointmentList(
            response.data.filter((element) => {
              return element.appointmentDate === date;
            })
          );
          //console.log(AppointmentList);
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  //get Appointment
  const getAppointment = async () => {
    //API Call
    //debugger
    await axios
      .get(
        `${host}/doctor/fetchAppointment/${localStorage.getItem(
          "appointmentId"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(
        (response) => {
          //debugger
          setAppointmentRecord(response.data);
          //console.log(AppointmentList)
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  //Update The Status of the Patient
  const UpdateStatus = async (appointmentId, treatmentStatus) => {
    //API Call
    //debugger
    const data = JSON.stringify({ treatmentStatus });
    //console.log(data);
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .put(`${host}/doctor/updateAppointment/${appointmentId}`, data, options)
      .then(
        (response) => {
          //debugger
          //console.log(response.data);
          toast.success("Status Updated!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
        (error) => {
          //console.log(error);
          toast.error("Unable to Update the Status!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
  };

  //get All Medicines
  const getAllMedicines = async () => {
    //API Call
    //debugger;
    await axios
      .get(`${host}/doctor/fetchAllMedicines`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          //debugger;
          setAllMeds(response.data);
          //console.log(getAllMeds);
          //debugger;
        },
        (error) => {
          //debugger;
          //console.log(error);
        }
      );
  };

  //Adding the Prescription
  const addPrescription = async (Prescripion) => {
    //debugger;
    const data = Prescripion;
    //console.log(data);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post(
        `${host}/doctor/addPrescription/${localStorage.getItem(
          "appointmentId"
        )}`,
        data,
        options
      )
      .then(
        (response) => {
          //console.log(response);
          //debugger
          //showToastMessage('Prescripion Added For the Patient')
          //debugger;
          if (response.data.includes("Valid")) {
            toast.warn("Please Add Valid Quantity!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.success("Prescription Added!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        },
        (error) => {
          //debugger;
          toast.error("Unable to Add the Prescription!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <hmsContext.Provider
      value={{
        changeNavbar,
        navbarComponent1,
        navbarLink1,
        navbarComponent2,
        navbarLink2,
        navbarComponent3,
        navbarLink3,
        navbarComponent4,
        navbarLink4,
        doctor,
        changeNavbar2,
        changeNavbar3,
        changeNavbar4,
        AppointmentList,
        getAllAppointments,
        appointmentId,
        setappointmentId,
        getAppointment,
        AppointmentRecord,
        UpdateStatus,
        getAllMedicines,
        getAllMeds,
        addPrescription,
        urecp,
        setUrecp,
        getUser,
        updateRecp,
        udoctors,
        setUdoctors,
        getDoc,
        updateDoc,
        refreshPage,

        getDashboard,
        dashboardDetails,
        user,
        setUser,
        addUser,
        appts,
        setAppts,
        filteredAppts,
        setFilteredAppts,
        getAllAppt,
        doctors,
        setDoctors,
        fdoctors,
        fsetDoctors,
        getAllDocs,
        med,
        setMed,
        fmed,
        fsetMed,
        bringMeds,
        patients,
        setPatients,
        fpatients,
        fsetPatients,
        getPatients,
        pharmacists,
        setPharmacists,
        fpharmacists,
        fsetPharmacists,
        getAllPharma,
        receptionists,
        setReceptionists,
        freceptionists,
        fsetReceptionists,
        getAllReceptionst,
        addDoc,
        setAddDoc,
        addDoctor,

        patient,
        setPatient,
        getPatient,
        updatePatient,
        appt,
        setAppt,
        filteredAppt,
        setfilteredAppt,
        showPatientAppt,
        fetchBillGeneratePatient,
        generatePdfPateint,
        Pbill,
        Pprescrpition,
        Ppat,
        Pdoct,

        medicine,
        setMedicine,
        currentDate,
        setCurrentDate,
        addMed,
        Editmed,
        setEditMed,
        getMed,
        updateMedicine,
        medSearch,
        setmedSearch,
        filteredMed,
        setfilteredMed,
        getMeds,

        Rpatient,
        setRPatient,
        addPatient,
        isLocked,
        setIsLocked,
        R2patient,
        setR2Patient,
        Rdoctor,
        setRdoctor,
        appointment,
        setAppointment,
        appointmentSlot,
        setAppointmentSlot,
        getAllRDoctors,
        getPatientById,
        AddAppointment,
        getSlots,
        Rappt,
        setRappt,
        RfilteredAppt,
        setRfilteredAppt,
        getAppt,
        bill,
        setBill,
        prescrpition,
        setPrescription,
        pat,
        setPat,
        doct,
        setDoct,
        fetchBill,
        generate,
        fetchBillGenerate,
        generatePdf,
        Gbill,
        setGBill,
        Gprescrpition,
        setGPrescription,
        Gpat,
        setGPat,
        Gdoct,
        setGDoct,
        PId,
        setPId,
        addBill,
        flag
      }}
    >
      {props.children}
    </hmsContext.Provider>
  );
};

export default CommonState;
