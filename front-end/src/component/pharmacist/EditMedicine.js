import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import hmsContext from "../../context/hmsContext";

export default function EditMedicine() {
  const context = useContext(hmsContext);
  const {
    changeNavbar,
    changeNavbar2,
    changeNavbar3,
    changeNavbar4,
    Editmed,
    setEditMed,
    getMed,
    updateMedicine,
  } = context;

  const history = useHistory();

  useEffect(() => {
    //debugger;
    async function fetch() {
      await getMed();
    }
    fetch();
    changeNavbar("Dashboard", "/PharmacistDashboard");
    changeNavbar2("Add Medicine", "/AddMedicine");
    changeNavbar3("Search Medicine", "/SearchMedicine");
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setEditMed((prevMed) => ({
      ...prevMed,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    //debugger;
    await updateMedicine(
      Editmed.medicineName,
      Editmed.manufacturedDate,
      Editmed.expiryDate,
      Editmed.stock,
      Editmed.price,
      Editmed.company,
      Editmed.medicineAddedDate
    );
    history.push("/SearchMedicine");
  };

  return (
    <div className="container">
      <form className="row g-3" style={{marginTop:100}}>
        <div class="col-md-12">
          <center>
            <h2>Edit Medicine</h2>
          </center>
        </div>
        <div className="col-md-6">
          <label htmlFor="firstName" class="form-label">
            Medicine ID
          </label>
          <input
            type="text"
            class="form-control"
            id="medicineId"
            name="medicineId"
            onChange={onChange}
            value={Editmed.medicineId}
            required
            readOnly={true}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" class="form-label">
            Medicine Name
          </label>
          <input
            type="text"
            class="form-control"
            id="medicineName"
            name="medicineName"
            onChange={onChange}
            value={Editmed.medicineName}
            required
          />
        </div>

        <div className="col-md-0">
          <label htmlFor="role" class="form-label">
            Company
          </label>
          <input
            type="text"
            class="form-control"
            id="company"
            name="company"
            onChange={onChange}
            value={Editmed.company}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" class="form-label">
            Manufactured Date
          </label>
          <input
            type="date"
            class="form-control"
            id="manufacturedDate"
            name="manufacturedDate"
            onChange={onChange}
            value={Editmed.manufacturedDate}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="password" class="form-label">
            Expiry Date
          </label>
          <input
            type="date"
            class="form-control"
            id="expiryDate"
            name="expiryDate"
            onChange={onChange}
            value={Editmed.expiryDate}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="age" class="form-label">
            Stock
          </label>
          <input
            type="text"
            class="form-control"
            id="stock"
            name="stock"
            onChange={onChange}
            value={Editmed.stock}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="gender" class="form-label">
            price
          </label>
          <input
            type="text"
            class="form-control"
            id="price"
            name="price"
            onChange={onChange}
            value={Editmed.price}
            required
          />
        </div>

        <div className="col-6">
          <label htmlFor="mobNo" class="form-label"></label>
          <input
            type="hidden"
            class="form-control"
            id="medicineAddedDate"
            name="medicineAddedDate"
            onChange={onChange}
            value={Editmed.medicineAddedDate}
            required
          />
        </div>

        <div className="col-12 d-flex justify-content-center align-item-center">
          <button type="submit" class="btn btn-primary" onClick={handleClick}>
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
}
