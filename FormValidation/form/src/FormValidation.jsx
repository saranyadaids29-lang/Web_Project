import { useRef, useState } from "react";
import "./FormValidation.css";

const initialFormData = {
  name: "",
  aadhaarName: "",
  phone: "",
  email: "",
  permanentAddress: "",
  currentAddress: "",
  sameAddress: false,
  photo: null,
  password: "",
  confirmPassword: ""
};

const validateForm = (formData) => {
  const newErrors = {};
  const normalizeName = (value) => value.trim().replace(/\s+/g, " ").toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!formData.name.trim()) newErrors.name = "Name is required";
  else if (formData.name.trim().length < 3) newErrors.name = "Name must contain at least 3 characters";
  if (!formData.aadhaarName.trim()) newErrors.aadhaarName = "Aadhaar name is required";
  else if (normalizeName(formData.name) !== normalizeName(formData.aadhaarName)) newErrors.aadhaarName = "Aadhaar name must match your name";
  if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must contain exactly 10 digits";
  if (!formData.email) newErrors.email = "Email is required";
  else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address";
  if (!formData.permanentAddress.trim()) newErrors.permanentAddress = "Permanent address is required";
  if (!formData.currentAddress.trim()) newErrors.currentAddress = "Current address is required";
  if (!formData.photo) newErrors.photo = "Photo is required";
  if (!formData.password) newErrors.password = "Password is required";
  else if (formData.password.length < 8) newErrors.password = "Password must contain at least 8 characters";
  else if (!/[A-Z]/.test(formData.password)) newErrors.password = "Password must contain a capital letter";
  else if (!/[a-z]/.test(formData.password)) newErrors.password = "Password must contain a small letter";
  else if (!/[0-9]/.test(formData.password)) newErrors.password = "Password must contain a number";
  else if (!/[!@#$%^&*]/.test(formData.password)) newErrors.password = "Password must contain a special character";
  if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
  else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

  return newErrors;
};

function FormValidation() {
  const [formData, setFormData] = useState(initialFormData);
  const [touched, setTouched] = useState({});
  const photoInputRef = useRef(null);
  const errors = validateForm(formData);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;
    setFormData((previous) => ({
      ...previous,
      [name]: nextValue,
      ...(name === "permanentAddress" && previous.sameAddress ? { currentAddress: value } : {}),
      ...(name === "sameAddress" && checked ? { currentAddress: previous.permanentAddress } : {})
    }));
  };

  const handleBlur = (event) => {
    setTouched((previous) => ({ ...previous, [event.target.name]: true }));
  };

  const handlePhoneChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      phone: event.target.value.replace(/\D/g, "").slice(0, 10)
    }));
  };

  const handlePhotoChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      photo: event.target.files[0] || null
    }));
    setTouched((previous) => ({ ...previous, photo: true }));
  };

  const isFormValid = Object.keys(errors).length === 0 &&
    Object.entries(formData).every(([key, value]) => key === "sameAddress" || value);
  const fieldClass = (name) => touched[name] ? (errors[name] ? "invalid" : "valid") : "";

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(Object.keys(initialFormData).reduce((all, field) => ({ ...all, [field]: true }), {}));
    if (isFormValid) alert("Registration successful!");
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setTouched({});
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  return (
    <div className="page">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p className="subtitle">Complete your identity and contact details</p>

        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={fieldClass("name")} />
            {touched.name && errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="aadhaarName">Name as on Aadhaar</label>
            <input id="aadhaarName" type="text" name="aadhaarName" placeholder="Enter Aadhaar name" value={formData.aadhaarName} onChange={handleChange} onBlur={handleBlur} className={fieldClass("aadhaarName")} />
            {touched.aadhaarName && errors.aadhaarName && <span className="error">{errors.aadhaarName}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" name="phone" inputMode="numeric" maxLength="10" placeholder="10-digit phone number" value={formData.phone} onChange={handlePhoneChange} onBlur={handleBlur} className={fieldClass("phone")} />
            {touched.phone && errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={fieldClass("email")} />
            {touched.email && errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="permanentAddress">Permanent Address</label>
          <textarea id="permanentAddress" name="permanentAddress" placeholder="Enter permanent address" value={formData.permanentAddress} onChange={handleChange} onBlur={handleBlur} className={fieldClass("permanentAddress")} />
          {touched.permanentAddress && errors.permanentAddress && <span className="error">{errors.permanentAddress}</span>}
        </div>
        <label className="checkbox-label">
          <input type="checkbox" name="sameAddress" checked={formData.sameAddress} onChange={handleChange} />
          Current address is the same as permanent address
        </label>
        <div className="input-group">
          <label htmlFor="currentAddress">Current Address</label>
          <textarea id="currentAddress" name="currentAddress" placeholder="Enter current address" value={formData.currentAddress} onChange={handleChange} onBlur={handleBlur} className={fieldClass("currentAddress")} readOnly={formData.sameAddress} />
          {touched.currentAddress && errors.currentAddress && <span className="error">{errors.currentAddress}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="photo">Upload Photo</label>
          <input ref={photoInputRef} id="photo" type="file" name="photo" accept="image/*" onChange={handlePhotoChange} className={fieldClass("photo")} />
          {formData.photo && <span className="file-name">{formData.photo.name}</span>}
          {touched.photo && errors.photo && <span className="error">{errors.photo}</span>}
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} onBlur={handleBlur} className={fieldClass("password")} />
            {touched.password && errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} className={fieldClass("confirmPassword")} />
            {touched.confirmPassword && errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
        </div>

        <div className="actions">
          <button type="submit" disabled={!isFormValid}>Submit</button>
          <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default FormValidation;
