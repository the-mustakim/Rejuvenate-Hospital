import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Contact from "./component/Contact";
import AdminDashboard from "./component/admin/AdminDashboard";
import DoctorDashboard from "./component/doctor/DoctorDashboard";
import ReceptionistDashboard from "./component/receptionist/ReceptionistDashboard";
import PharmacistDashboard from "./component/pharmacist/PharmacistDashboard";
import PatientDashboard from "./component/patient/PatientDashboard";
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import AddUser from "./component/admin/AddUser";
import AddPatient from "./component/receptionist/AddPatient";
import AddAppointment from "./component/receptionist/AddAppointment";
import GenerateBill from "./component/receptionist/GenerateBill";
import MakeBill from "./component/receptionist/MakeBill";
import DoctorDetails from "./component/admin/DoctorDetails";
import PatientDetails from "./component/admin/PatientDetails";
import ReceptionistDetails from "./component/admin/ReceptionistDetails";
import PharmacistDetails from "./component/admin/PharmacistDetails";
import MedicineDetails from "./component/admin/MedicineDetails";
import AppointmentDetails from "./component/admin/AppointmentDetails";
import EditDoctor from "./component/admin/EditDoctor";
import EditUser from "./component/admin/EditUser";
import EarningDetails from "./component/admin/EarningDetails";
import ShowAppointments from "./component/patient/ShowAppointments";
import EditPatient from "./component/patient/EditPatient";
import AddMedicine from "./component/pharmacist/AddMedicine";
import SearchMedicine from "./component/pharmacist/SearchMedicine";
import EditMedicine from "./component/pharmacist/EditMedicine";
import ViewAppointment from "./component/doctor/ViewAppointment";
import ShowPatients from "./component/doctor/ShowPatients";
import CommonState from "./context/CommonState";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import ShowProfile from './component/patient/ShowProfile'

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <CommonState showAlert={showAlert}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Router>
          <Navbar showAlert={showAlert} />
          <div className="container" style={{ marginTop: 70 }}></div>
          <div className="my-4 my-class">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <ProtectedRoute
                exact
                path="/AdminDashboard"
                component={AdminDashboard}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/AddUser"
                component={AddUser}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/DoctorDetails"
                component={DoctorDetails}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/PatientDetails"
                component={PatientDetails}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/ReceptionistDetails"
                component={ReceptionistDetails}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/PharmacistDetails"
                component={PharmacistDetails}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/MedicineDetails"
                component={MedicineDetails}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/AppointmentDetails"
                component={AppointmentDetails}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/EarningDetails"
                component={EarningDetails}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/EditDoctor"
                component={EditDoctor}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/EditUser"
                component={EditUser}
                showAlert={showAlert}
              />

              <ProtectedRoute
                exact
                path="/DoctorDashboard"
                component={DoctorDashboard}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/viewAppointment"
                component={ViewAppointment}
                showAlert={showAlert}
              />
              <ProtectedRoute
                path="/showPatients"
                component={ShowPatients}
                showAlert={showAlert}
              />

              <ProtectedRoute
                exact
                path="/ReceptionistDashboard"
                component={ReceptionistDashboard}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/AddPatient"
                component={AddPatient}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/AddAppointment"
                component={AddAppointment}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/MakeBill"
                component={MakeBill}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/GenerateBill"
                component={GenerateBill}
                showAlert={showAlert}
              />

              <ProtectedRoute
                exact
                path="/PatientDashboard"
                component={PatientDashboard}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/ShowAppointments"
                component={ShowAppointments}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/ShowProfile"
                component={ShowProfile}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/EditPatient"
                component={EditPatient}
                showAlert={showAlert}
              />

              <ProtectedRoute
                exact
                path="/PharmacistDashboard"
                component={PharmacistDashboard}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/AddMedicine"
                component={AddMedicine}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/SearchMedicine"
                component={SearchMedicine}
                showAlert={showAlert}
              />
              <ProtectedRoute
                exact
                path="/EditMedicine/:medicineName"
                component={EditMedicine}
                showAlert={showAlert}
              />
              <Route exact path="/contact">
                <Contact showAlert={showAlert} />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/ForgotPassword">
                <ForgotPassword showAlert={showAlert} />
              </Route>

              <Route exact path="/ResetPassword/:email">
                <ResetPassword showAlert={showAlert} />
                        
              </Route>
            </Switch>
          </div>
          <footer>
            <Footer />
          </footer>
        </Router>
      </CommonState>
    </>
  );
}

export default App;
