import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = (props) => {
  const host = process.env.REACT_APP_HOST_LOCATION;
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
      
        try {
          const response = await axios.post(
            `${host}/validate`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setAuth(true);
          } else {
            setAuth(false);
          }
        } catch (error) {
          setAuth(false);
          localStorage.removeItem("token");
        }
      } else {
        setAuth(false);
      }
    };

    fetchAuth();
  }, []);

  if (auth === null) {
    // Authentication status not yet determined
    return null;
  } else if (auth) {
    // User is authenticated, render the protected component
    return <Route path={props.path} exact component={props.component} />;
  } else {
    // User is not authenticated, redirect to login page
    props.showAlert("Login First","danger")
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoute;
