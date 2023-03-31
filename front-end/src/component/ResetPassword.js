import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import "./Login.css";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { email } = useParams();

    const host = process.env.REACT_APP_HOST_LOCATION;

    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password!=confirmPassword)
        {
            toast.warn("Password does not match!", {
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
        try {
            const response = await axios.post(`${host}/forgotPassword`, {
                email,
                password,
                confirmPassword,
            });
            toast.success("Password changed Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            //console.log(response.data);
                history.push("/Login")
        }
        catch (error) {
            //console.error(error);
            // TODO: Show error message to the user
        }
    }

    const handlePassChange = ((e) => {
        setPassword(e.target.value)
    })

    const handleCPassChange = ((e) => {
        setConfirmPassword(e.target.value)
    })

    return (

        <>
        <main className="main-new">
          <div className="container d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm my-3">
              <input type="text" className="inputTag" name="password" value={password} onChange={handlePassChange} placeholder=" New Password" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm my-3">
              <input type="text" className="inputTag" name="confirmPassword" value={confirmPassword} onChange={handleCPassChange} placeholder=" Confirm Password "/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm my-3">
              <button type="submit" className="btn btn-primary inputTag">Reset Password</button>
              </div>
            </div>
            </form>
          </div>
      </main>




        {/* <form onSubmit={handleSubmit}>
            <label>
                New Password:
                <input type="text" name="password" value={password} onChange={handlePassChange} />
            </label>
            <br></br>
            <br></br>
            <label> Confirmed Password:
                <input type="text" name="confirmPassword" value={confirmPassword} onChange={handleCPassChange} />
            </label>
            <button type="submit">Reset Password</button>
        </form> */}
        </>
    );
}
export default ResetPassword;
