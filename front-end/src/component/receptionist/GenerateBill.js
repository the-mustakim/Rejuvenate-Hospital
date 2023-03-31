import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useHistory } from "react-router-dom";
import hmsContext from "../../context/hmsContext";

export default function GenerateBill() {
  const context = useContext(hmsContext);
  const {
    changeNavbar,
    changeNavbar2,
    changeNavbar3,
    changeNavbar4,
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
    addBill,
  } = context;
  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      await fetchBillGenerate();
    }
    fetch();
    changeNavbar("Dashboard", "/ReceptionistDashboard");
    changeNavbar2("Add Patient", "/AddPatient");
    changeNavbar3("Add Appointment", "/AddAppointment");
    changeNavbar4("MakeBill", "/MakeBill");
  }, []);

  //   useEffect(() => {
  //     console.log("Re Rendring the component")
  //     //generatePdf();
  // }, [Gbill,Gpat,Gdoct,Gprescrpition])

  //Method to generate Bill in Pdf format
  const generatepdf = async () => {
    await generatePdf();
  };
  const saveBillToDb = async () => {
    await addBill(
      Gbill.totalMedicinePrice,
      Gbill.treatementFees,
      Gbill.totalPrice,
      Gbill.appointmentId
    );
    history.push("/MakeBill")
  };

  return (
    <div className="container">
      <h1>Appointment No:{Gbill.appointmentId}</h1>

      <hr></hr>

      <div className="card-group">
        <div className="card" style={{ marginRight: "300px" }}>
          <div class="card-header bg-transparent border-success">
            PATIENT DETAILS:
          </div>
          <div className="card-body">
            <div className="card-body">
              <h5 className="card-title">
                {Gpat.user.firstName} {Gpat.user.lastName}
              </h5>
              <p className="card-text">
                <strong>Age:</strong> {Gbill.age}
                <br />
                <strong>Blood Group:</strong>
                {Gpat.bloodGroup}
                <br />
                <strong>Email:</strong> {Gbill.email}
                <br />
                <strong>Phone:</strong> +91 {Gbill.mobNo}
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className="card border">
          <div class="card-header bg-transparent border-success">
            DOCTOR DETAILS:
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {Gdoct.user.firstName} {Gdoct.user.lastName}
            </h5>
            <p className="card-text">
              <strong>Specialization:</strong> {Gbill.department}
              <br />
            </p>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "20px" }}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th colSpan="5" className="text-center">
                Assigned Medicines
              </th>
            </tr>
            <tr>
              <th>Medicine Name</th>
              <th>Company</th>
              <th>Expiry Date</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Gprescrpition.map((medicine, index) => (
              <tr key={index}>
                <td>{medicine.assignedMedicine}</td>
                <td>{medicine.medicine.company}</td>
                <td>{medicine.medicine.expiryDate}</td>
                <td>{medicine.quantityAssigned}</td>
                <td>{medicine.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ float: "right" }}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th colSpan="2" className="text-center">
                Total Fees
              </th>
            </tr>
            <tr>
              <th>Treatment Fees</th>
              <td>{Gbill.treatementFees}</td>
            </tr>
            <tr>
              <th>Medicine Fees</th>
              <td>{Gbill.totalMedicinePrice}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{Gbill.totalPrice}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        {/* Existing code here */}
        <button
          className="btn btn-warning"
          onClick={() => {
            generatepdf();
            saveBillToDb();
          }}
        >
          Generate Bill
        </button>
      </div>
    </div>
  );
}
