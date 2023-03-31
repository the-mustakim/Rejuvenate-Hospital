import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import hmsContext from "../../context/hmsContext";
import Select from "react-select";
import "../style1.css";
import { useHistory } from "react-router-dom";

export default function ViewAppointment(props) {
  const context = useContext(hmsContext);
  const history=useHistory()
  const {
    getAppointment,
    AppointmentRecord,
    UpdateStatus,
    getAllMedicines,
    getAllMeds,
    addPrescription,
    showToastMessage,
    changeNavbar,
    changeNavbar2
  } = context;

  const [treatMentStatusSet, setTreatMentStatusSet] = useState({
    treatmentStatus: "",
  });
  const [selectedOptions, setSelectedOptions] = useState();
  const [MedicinesAdded, setMedicinesAdded] = useState([]);
  const [IncNum, setIncNum] = useState(0)
  const optionList = [];
  const [Prescripion, setPrescripion] = useState({Message:""})
  

  useEffect(() => {
    async function fetch() {
      await getAppointment();
      await getAllMedicines();
      changeNavbar("Dashboard","/DoctorDashboard")
      changeNavbar2("View Patient","/showPatients")
      setTreatMentStatusSet({
        treatmentStatus: AppointmentRecord.treatmentStatus,
      });
    }
    fetch();
  }, []);

  useEffect(() => {
    Medsmap();
  }, [getAllMedicines,selectedOptions])
  

  useEffect(() => {
    //Medsmap();
  }, [MedicinesAdded,IncNum]);

  const Medsmap = () => {
    //debugger;
    getAllMeds.map((med) => {
      optionList.push({ assignedMedicine:med.medicineName, price:med.price, value: med.medicineName, label: med.medicineName , quantityAssigned:"" , stock: med.stock, medicineId: med.medicineId});
      //debugger;
    });
    //console.log(getAllMeds);
    //debugger;
  };
  const AddMeds = () => {
    //console.log(selectedOptions);
    setMedicinesAdded(selectedOptions);
  };

  const RemoveMed= async (e)=>{
    let oldMedList=MedicinesAdded
    var oldMed=oldMedList.filter((element)=>{
          return (element.value === e.target.getAttribute("medName"));
    });
    oldMed[0].quantityAssigned="";
    //debugger
    var filteredMeds = oldMedList.filter((element)=>{
        if(element.value != e.target.getAttribute("medName"))
        {
          return element
        }
    });
    setMedicinesAdded(filteredMeds)
  }
  
  let handleChange = (e) => {
    //const value=parseInt(e.target.value)
    //setQuantity(e.target.value);
      let oldMedList=MedicinesAdded
      var oldMed=oldMedList.filter((element)=>{
          return (element.value === e.target.getAttribute("medName"));
        });
     //debugger
     if(e.target.value>-1)
     {
       oldMed[0].quantityAssigned=e.target.value;
       setMedicinesAdded(oldMedList)
       setIncNum(IncNum+1)
       
     }
  };

  function handleSelect(data) {
    setSelectedOptions(data);
  }

 
  const onChange = (event) => {
    setTreatMentStatusSet({ treatmentStatus: event.target.value });
  };

  const handlePrescripion=(e)=>{
    setPrescripion({...Prescripion,Message:e.target.value})
  }

  const UpdateAppointment = async (e) => {
    e.preventDefault()
    await UpdateStatus(
      AppointmentRecord.appointmentId,
      treatMentStatusSet.treatmentStatus
    );
  };

  const AddPrescripion=async ()=>{
    //debugger
    await addPrescription(MedicinesAdded);
    //console.log(MedicinesAdded)
    history.push("/showPatients")
  }

  // { value: "red", label: "Red" },
  //   { value: "green", label: "Green" },
  //   { value: "yellow", label: "Yellow" },
  //   { value: "blue", label: "Blue" },
  //   { value: "white", label: "White" },

  return (
    <>
    <div className="container">
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
      <div className="container my-5 text-center">
        <h1>View Appointment</h1>
      </div>
      <form>
        <div className="container-fluid pt-5">
          <div className="row gy-5">
            <div className="col-md-6 mb-5 text-center">
              <div>
                <label htmlFor="patinetFirstName "><h6>Patient First Name</h6></label>
                <input
                  type="text"
                  className="form-control text-center text-uppercase"
                  id="patientName"
                  value={AppointmentRecord.patient.user.firstName}
                  readOnly={true}
                />
              </div>
              <div>
                <label htmlFor="appDate"><h6>Appointment Date</h6></label>
                <input
                  type="text"
                  className="form-control text-center text-uppercase"
                  id="appDate"
                  value={AppointmentRecord.appointmentDate}
                  readOnly={true}
                />
              </div>
              <div>
                <label htmlFor="bloodGrp"><h6>Blood Group</h6></label>
                <input
                  type="text"
                  className="form-control text-center text-uppercase"
                  id="bloodGrp"
                  value={AppointmentRecord.patient.bloodGroup}
                  readOnly={true}
                />
              </div>
            </div>

            <div className="col-md-6 mb-5 text-center">
              <div>
                <label htmlFor="patientLastName"><h6>Patient Last Name</h6></label>
                <input
                  type="text"
                  className="form-control text-center text-uppercase"
                  id="patientLastName"
                  value={AppointmentRecord.patient.user.lastName}
                  readOnly={true}
                />
              </div>
              <div>
                <label htmlFor="age"><h6>Patient Age</h6></label>
                <input
                  type="text"
                  className="form-control text-center text-uppercase"
                  id="age"
                  value={AppointmentRecord.patient.user.age}
                  readOnly={true}
                />
              </div>
              <div>
                <label htmlFor="appTime"><h6>Appointment Time</h6></label>
                <input
                  type="text"
                  className="form-control text-center text-uppercase"
                  id="appTime"
                  value={
                    AppointmentRecord.appointmentSlot.startTime +
                    "-" +
                    AppointmentRecord.appointmentSlot.endTime
                  }
                  readOnly={true}
                />
              </div>
            </div>
            <div className="row m-auto">
              <div
                className="form-group col-md-6 offset-md-3
                            text-center"
              >
                <label htmlFor="pblmDesc"><h6>Problem Description</h6></label>
                <textarea
                  className="form-control"
                  id="pblmDesc"
                  rows="8"
                  value={AppointmentRecord.problemDescription}
                  readOnly={true}
                ></textarea>
              </div>
            </div>
            <div className="row m-auto my-4">
              <div
                className="form-group col-md-6 offset-md-3
                            text-center"
              >
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="treatMentStatus"
                  onChange={onChange}
                >
                  <option defaultValue={""}>Treatment Status</option>
                  <option value="PENDING">PENDING</option>
                  <option value="ATTENDED">ATTENDED</option>
                </select>
              </div>
            </div>
            <div className="row m-auto my-4">
              <div
                className="form-group col-md-6 offset-md-3
                            text-center"
              >
                <button className="btn btn-primary" onClick={UpdateAppointment}>
                  Update Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="container">
        <div className="row m-auto my-4">
          <div
            className="form-group col-md-6 offset-md-3
                            text-center"
          >
            <h2>Assign Medicines to Patient</h2>
          </div>
        </div>

        <div className="row m-auto">
          <div className="col-md-6 mb-5 text-center app">
            <Select
              options={optionList}
              placeholder="Select Medicines"
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              isMulti
            />
          </div>
          <div className="col-md-6 mb-5 text-center">
            <button className="btn btn-primary" onClick={AddMeds}>
              Add Medicine
            </button>
          </div>
        </div>
        <div className="container-fluid pt-5">
          <div className="row m-auto">
            <div className="col-md-4 mb-5 text-center"><h6>Medicine Name</h6></div>
            <div className="col-md-4 mb-5 text-center"><h6>Quantity</h6></div>
            <div className="col-md-4 mb-5 text-center"><h6>Remove</h6></div>
          </div>
        </div>
        {MedicinesAdded.map((meds) => {
          return (
            <div key={meds.value} className="row m-auto">
              <div className="col-md-4 mb-5 text-center">
                  <label htmlFor="medicineName">{meds.value}</label>
              </div>
              <div className="col-md-4 mb-5 text-center">
                  <div class="col-sm">
                      <input  
                        type="text"
                        class="form-control text-center inputPad"
                        value={meds.quantityAssigned}
                        onChange={handleChange}
                        medName={meds.value}
                      />
                    </div>
              </div>
              <div className="col-md-4 mb-5 text-center">

                    <button
                        class="btn btn-outline-primary"
                        type="button"
                        onClick={RemoveMed}
                        medName={meds.value}
                      >
                        Delete
                      </button>
                </div>
              </div>
          );
        })}

        <div className="row m-auto">
          <div
            className="form-group col-md-6 offset-md-3
                            text-center"
          >
            <label htmlFor="pblmDesc" className="my-3"><h6>Add Prescription</h6></label>
            <textarea
              className="form-control"
              id="pblmDesc"
              rows="8"
              value={Prescripion.Message}
              onChange={handlePrescripion}
            ></textarea>
          </div>
        </div>

        <div className="row m-auto my-3">
          <div
            className="form-group col-md-6 offset-md-3
              text-center"
          >
            <button className="btn btn-primary" onClick={AddPrescripion}><h6>Add Medicine</h6></button>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
