import React, { useContext, useEffect } from "react";
import hmsContext from "../../context/hmsContext";
import { toast } from 'react-toastify'

export default function AddUser(props) {
  const context = useContext(hmsContext);
  const { user, setUser, addUser, changeNavbar, changeNavbar2,addDoc,setAddDoc,addDoctor } = context;

  useEffect(() => {
    changeNavbar("Dashboard", "/AdminDashboard");
    changeNavbar2("AddUser", "/AddUser");
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    //  debugger
    if(user.firstName =="" ||
      user.lastName =="" ||
      user.email =="" ||
      user.password =="" ||
      user.age =="" ||
      user.gender =="" ||
      user.mobNo =="" ||
      user.salary =="" ||
      user.role =="" ||
      user.securityQuestion =="" ||
      user.securityAnswer =="" ||
      user.address.street =="" ||
      user.address.city =="" ||
      user.address.pincode==""
      )
      {
        toast.warn('Fields are empty!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return

      }



    async function fetch() {
      await addUser(
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.age,
        user.gender,
        user.mobNo,
        user.salary,
        user.role,
        user.securityQuestion,
        user.securityAnswer,
        user.address.street,
        user.address.city,
        user.address.pincode
      );
    if(user.role =="ROLE_DOCTOR")
    {
      if(addDoc.email=="" || addDoc.treatmentFees=="" || addDoc.department=="" || addDoc.isAvailable=="")
      {
        toast.warn('Doctor Fields are empty!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return
      }
      await addDoctor(addDoc.email,addDoc.department,addDoc.treatmentFees,addDoc.isAvailable);
    }
    }
    fetch();
    
    //  props.showAlert("User Added", "success")
    setUser({
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
      address: { street: "", city: "", pincode: "" },
    });
    setAddDoc({
    email:"",
    department:"",
    treatmentFees:"",
    isAvailable:""
  })
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    //debugger;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      address: {
        ...prevUser.address,
        [name]: value,
      },
    }));
    setAddDoc({...addDoc,[event.target.name]:event.target.value})
  };

  const onDocChange=(e)=>{
    setAddDoc({...addDoc,[e.target.name]:e.target.value})
    
    //console.log(addDoc.department)
    //console.log(addDoc.treatmentFees)
    //console.log(addDoc.isAvailable)
    //debugger
  }

  return (
    <div className="container">
        <form className="row g-3 my-4">
          <div className="col-md-12">
            <center>
              <h2>Add User</h2>
            </center>
          </div>
          <div className="col-md-12">
            <label htmlFor="firstName" class="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              required
              onChange={onChange}
              value={user.firstName}
              />
          </div>
          <div className="col-md-12">
            <label htmlFor="lastName" class="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              onChange={onChange}
              value={user.lastName}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" class="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              value={user.email}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              value={user.password}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="age" class="form-label">
              Age
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              onChange={onChange}
              value={user.age}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              onChange={onChange}
              required
            >
              <option value="" selected>--Select Gender--</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="mobNo" class="form-label">
              Mobile No
            </label>
            <input
              type="text"
              className="form-control"
              id="mobNo"
              name="mobNo"
              onChange={onChange}
              value={user.mobNo}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="salary" class="form-label">
              Salary
            </label>
            <input
              type="number"
              className="form-control"
              id="salary"
              name="salary"
              onChange={onChange}
              value={user.salary}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="role">Role</label>
            <select
              className="form-select"
              id="role"
              name="role"
              onChange={onChange}
            >
              <option value="" selected>--Select Role--</option>
              <option value="ROLE_ADMIN">ADMIN</option>
              <option value="ROLE_DOCTOR">DOCTOR</option>
              <option value="ROLE_RECEPTIONIST">RECEPTIONIST</option>
              <option value="ROLE_PHARMACIST">PHARMACIST</option>
            </select>
          </div>
          <div className="col-md-12">
            <label htmlFor="securityQuestion" class="form-label">
              Security Question
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="securityQuestion"
              onChange={onChange}
              value={user.securityQuestion}
            >
              <option value="" selected>--Security Question--</option>
              <option value="Favourite City">Favourite City</option>
              <option value="Favourite Color">Favourite Color</option>
              <option value="Favourite dish">Favourite dish</option>
            </select>

            {/* <input
              type="text"
              class="form-control"
              id="securityQuestion"
              name="securityQuestion"
              onChange={onChange}
              value={user.securityQuestion}
              required
            /> */}
          </div>
          <div className="col-md-12">
            <label htmlFor="securityAnswer" class="form-label">
              Security Answer
            </label>
            <input
              type="text"
              className="form-control"
              id="securityAnswer"
              name="securityAnswer"
              value={user.securityAnswer}
              required
              onChange={onChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="street" class="form-label">
              Street
            </label>
            <input
              type="text"
              className="form-control"
              id="street"
              name="street"
              onChange={onChange}
              value={user.address.street}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="city" class="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              onChange={onChange}
              value={user.address.city}
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="pincode" class="form-label">
              Pincode
            </label>
            <input
              type="text"
              className="form-control"
              id="pincode"
              name="pincode"
              onChange={onChange}
              value={user.address.pincode}
              required
            />
          </div>
          {user.role==='ROLE_DOCTOR'?
            <>
            <div className="col-6">
            <label htmlFor="department" class="form-label">
              Department
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="department"
              onChange={onDocChange}
              value={addDoc.department}
            >
              <option value="" selected>--Select Department--</option>
              <option value="CARDIOLOGY">Cardiology</option>
              <option value="NEUROLOGY">Neurology</option>
              <option value="HEPATOLOGY">Hepatology</option>
              <option value="PEDIATRICS">Pediatrics</option>
              <option value="EYECARE">Eye Care</option>
            </select>
          </div>
           <div className="col-6">
           <label htmlFor="treatmentFees" class="form-label">
           Treatment Fees
           </label>
           <input
              type="text"
              className="form-control"
              id="treatmentFees"
              name="treatmentFees"
              onChange={onDocChange}
              value={addDoc.treatmentFees}
              required
            />
         </div>
          <div className="col-6">
          <label htmlFor="isAvailable" class="form-label">
          Availability
          </label>
          <select
              className="form-select"
              aria-label="Default select example"
              name="isAvailable"
              onChange={onDocChange}
              value={addDoc.isAvailable}
            >
              <option value="" selected>--Select Availability</option>
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="OCCUPIED">OCCUPIED</option>
            </select>
        </div>
        </>
          :<div></div>
          }

          <div className="col-12 d-flex justify-content-center align-item-center">
            <button type="button" className="btn btn-primary" onClick={handleClick}>
              Add User
            </button>
          </div>
        </form>
        <div style={{marginBottom:300}}>
          
        </div>
    </div>
  );
}
