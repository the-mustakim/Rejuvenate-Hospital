
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./search.css";
import hmsContext from "../../context/hmsContext";

export default function SearchMedicine(props) {

  const context = useContext(hmsContext);
  const {
    changeNavbar,
    changeNavbar2,
    changeNavbar3,
    medSearch,
    filteredMed,
    setfilteredMed,
    getMeds,
  } = context;
  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      await getMeds();
    }
    fetch();
    changeNavbar("Dashboard", "/PharmacistDashboard");
    changeNavbar2("Add Medicine", "/AddMedicine");
    changeNavbar3("Search Medicine", "/SearchMedicine");
  }, []);

  const handleSearch = (event) => {
    let medicineName = event.target.value.toLowerCase();

    if (medicineName === "") {
      setfilteredMed(medSearch); // show all data if search box is empty
    } else {
      setfilteredMed(
        medSearch.filter((a) =>
          a.medicineName.toLowerCase().includes(medicineName)
        )
      ); // filter data if search box is not empty
    }
  };

  const onHandleDelete = (medicineId) => {};

  const onHandleEdit = (medicineId) => {
    localStorage.setItem("medicineId", medicineId);
    history.push(`/EditMedicine/${medicineId}`);
  };

  return (
    <>
      <div className="container">
        <div className="row" style={{ marginTop: 100 }}>
          <div className="col d-flex justify-content-center align-items-center">
            <div className="search">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Medicine Name"
                name="medicineName"
                onChange={handleSearch}
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <table className="table table-bordered margin my-3">
              <thead>
                <tr>
                  <th>Medicine ID</th>
                  <th>Medicine Name</th>
                  <th>Medicine Company</th>
                  <th>Manufactured Date</th>
                  <th>Expiry Date</th>
                  <th>Medicine Added Date</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Edit Medicine</th>
                  {/* <th>Delete Medicine</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredMed.map((med) => (
                  <tr key={med.appointmentId}>
                    <td>{med.medicineId}</td>
                    <td>{med.medicineName.toUpperCase()}</td>
                    <td>{med.company.toUpperCase()}</td>
                    <td>{med.manufacturedDate}</td>
                    <td>{med.expiryDate}</td>
                    <td>{med.medicineAddedDate}</td>
                    <td>{med.price}</td>
                    <td>{med.stock}</td>

                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          onHandleEdit(med.medicineId);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    {/* <td>
                      <button
                        
                        className="btn btn-danger"
                        onClick={() => {
                          onHandleDelete(med.medicineName);
                        }}
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
