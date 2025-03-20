import React, { useState } from "react";

const RegisterForm = () => {
  //form values
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  //errors

  const [formErrors, setFormErrors] = useState({
    NameError: null,
    EmailError: null,
    PasswordError: null,
    ConfirmPasswordError: null,
  });

  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    let errors = { ...formErrors };

    if (name === "name") {
      errors.NameError = value.trim() === "" ? "Required" : null;
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.EmailError =
        value.trim() === ""
          ? "Required"
          : !emailRegex.test(value)
          ? "Invalid email format"
          : null;
    }

    if (name === "password") {
      errors.PasswordError =
        value.length < 6 ? "Password must be at least 6 characters long" : null;
    }

    if (name === "confirmpassword") {
      errors.ConfirmPasswordError =
        value !== formValues.password ? "Passwords do not match" : null;
    }

    setFormErrors(errors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if there are any errors before submitting
    if (
      Object.values(formErrors).some((error) => error !== null) ||
      Object.values(formValues).some((val) => val === "")
    ) {
      alert("Please fix errors before submitting.");
      return;
    }
 
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="container"
        style={{
          marginTop: "100px",
        }}
      >
        <h2
          style={{
            color: "rgb(86, 2, 31)",
          }}
        >
          Register Form
        </h2>
        <hr />
        <form
          onSubmit={(event) => {
            handleSubmit(event);
            if (
              !Object.values(formErrors).some((error) => error !== null) &&
              !Object.values(formValues).some((val) => val === "")
            ) {
              setShowModal(true);
            }
          }}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${
                formErrors.NameError ? "border-danger" : ""
              }`}
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChangeForm}
            />
            {formErrors.NameError && (
              <div className="text-danger">{formErrors.NameError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${
                formErrors.EmailError ? "border-danger" : ""
              }`}
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChangeForm}
            />
            {formErrors.EmailError && (
              <div className="text-danger">{formErrors.EmailError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleChangeForm}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${
                formErrors.PasswordError ? "border-danger" : ""
              }`}
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChangeForm}
            />
            {formErrors.PasswordError && (
              <div className="text-danger">{formErrors.PasswordError}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                formErrors.ConfirmPasswordError ? "border-danger" : ""
              }`}
              id="confirmpassword"
              name="confirmpassword"
              value={formValues.confirmpassword}
              onChange={handleChangeForm}
            />
            {formErrors.ConfirmPasswordError && (
              <div className="text-danger">
                {formErrors.ConfirmPasswordError}
              </div>
            )}
          </div>

          <button type="submit" className="btn"
          style={{
              backgroundColor :"rgb(125, 28, 74)",
              color:"white"
          }}
          >
            Submit
          </button>
        </form>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Information</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {formValues.name}
                </p>
                <p>
                  <strong>Email:</strong> {formValues.email}
                </p>
                <p>
                  <strong>Username:</strong> {formValues.username}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setFormValues({
                      name: "",
                      email: "",  
                      username: "",
                      password: "",
                      confirmpassword: "",
                    });
                    setFormErrors({
                      NameError: null,
                      EmailError: null,
                      PasswordError: null,
                      ConfirmPasswordError: null,
                    });
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default RegisterForm;
