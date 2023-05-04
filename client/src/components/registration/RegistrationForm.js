import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",    
    userName: "",
    city: ""
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation, userName, city } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }
    if (userName.trim() == "") {
      newErrors = {
        ...newErrors,
        userName: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/users", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
          const userData = await response.json();
          setShouldRedirect(true);
        }
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="sign-in-form">
      <h3 className="sign-in-header">Register</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input 
              className="form-field-input"
              type="text" 
              name="email" 
              value={userPayload.email} 
              onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            User Name
            <input
              className="form-field-input"
              type="text"
              name="userName"
              value={userPayload.userName}
              onChange={onInputChange}
              />
              <FormError error={errors.userName} />
          </label>
        </div>
        <div>
          <label>
            City
            <input
              className="form-field-input"
              type="text"
              name="city"
              value={userPayload.city}
              onChange={onInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              className="form-field-input"
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              className="form-field-input"
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="form-button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
