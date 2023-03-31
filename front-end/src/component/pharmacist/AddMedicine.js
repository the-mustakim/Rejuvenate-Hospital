import React, { createContext, useContext, useState, useEffect } from "react";
import "../style1.css";
import axios from "axios";
import { toast } from "react-toastify";
import hmsContext from "../../context/hmsContext";

export default function AddMedicine(props) {
  const context = useContext(hmsContext);
  const {
    changeNavbar,
    changeNavbar2,
    changeNavbar3,
    changeNavbar4,
    medicine,
    setMedicine,
    currentDate,
    setCurrentDate,
    addMed,
  } = context;

  useEffect(() => {
    changeNavbar("Dashboard", "/PharmacistDashboard");
    changeNavbar2("Add Medicine", "/AddMedicine");
    changeNavbar3("Search Medicine", "/SearchMedicine");
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    //debugger
    if (
      medicine.medicineName == "" ||
      medicine.manufacturedDate == "" ||
      medicine.expiryDate == "" ||
      medicine.stock == "" ||
      medicine.price == "" ||
      medicine.company == ""
    ) {
      toast.warn("Fields are empty!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    await addMed(
      medicine.medicineName,
      medicine.manufacturedDate,
      medicine.expiryDate,
      medicine.stock,
      medicine.price,
      medicine.company,
      medicine.medicineAddedDate
    );
    //debugger
    // props.showAlert("Medicine Added", "success")
    setMedicine({
      medicineName: "",
      manufacturedDate: "",
      expiryDate: "",
      stock: "",
      price: "",
      company: "",
      medicineAddedDate: "",
    });
  };

  const onChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form className="row g-3" style={{ marginTop: 100 }}>
        <div class="col-md-12">
          <center>
            <h2>Add Medicine</h2>
          </center>
        </div>
        <div className="col-md-12">
          <label htmlFor="medicineName" class="form-label">
            Medicine Name
          </label>
          <input
            type="text"
            class="form-control"
            id="medicineName"
            name="medicineName"
            onChange={onChange}
            value={medicine.medicineName}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="manufacturedDate" class="form-label">
            Manufactured Date
          </label>
          <input
            type="date"
            class="form-control"
            id="manufacturedDate"
            name="manufacturedDate"
            onChange={onChange}
            value={medicine.manufacturedDate}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="expiryDate" class="form-label">
            Expiry Date
          </label>
          <input
            type="date"
            class="form-control"
            id="expiryDate"
            name="expiryDate"
            onChange={onChange}
            value={medicine.expiryDate}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="stock" class="form-label">
            Stock
          </label>
          <input
            type="text"
            class="form-control"
            id="stock"
            name="stock"
            onChange={onChange}
            value={medicine.stock}
            required
            min={1}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="price" class="form-label">
            Price
          </label>
          <input
            type="text"
            class="form-control"
            id="price"
            name="price"
            onChange={onChange}
            value={medicine.price}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="company" class="form-label">
            Medicine Company
          </label>
          <input
            type="text"
            class="form-control"
            id="company"
            name="company"
            onChange={onChange}
            value={medicine.company}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="medicineAddedDate" class="form-label"></label>
          <input
            type="date"
            class="form-control"
            id="medicineAddedDate"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            hidden
          />
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button type="submit" class="btn btn-primary" onClick={handleClick}>
            Add Medicine
          </button>
        </div>
      </form>
      <div style={{ marginBottom: 300 }}></div>
    </div>
  );
}
