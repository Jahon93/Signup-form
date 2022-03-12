import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Enter your name";
    }
    if (!values.email) {
      errors.email = "Enter your email";
    } else if (!regex.test(values.email)) {
      errors.email = "Looks like this is not an email";
    }
    if (!values.password) {
      errors.password = "Enter your password";
    } 
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form">
          <div className="form-field">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <p className="error-input">{formErrors.name}</p>
          <div className="form-field">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p className="error-input">{formErrors.email}</p>
          <div className="form-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p className="error-input">{formErrors.password}</p>
          
          <div className="btn">
            <button>CREATE ACCOUNT</button>
          </div>
        </div>

        {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="successful-message">You have created an account successfully</div>
      ) : (
        <pre></pre>
      )}

      </form>
    </div>
  );
}

export default App;