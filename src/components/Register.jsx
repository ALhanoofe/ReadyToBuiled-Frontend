import { useState } from "react"
import { RegisterUser } from "../services/Auth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "../style/auth.css"

const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    type: "",
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let userType = ""
    if (formValues.type === "customer") userType = "customers"
    else if (formValues.type === "developer") userType = "developer"
    else {
      alert("Please select a user type")
      return
    }
    await RegisterUser({
      name: formValues.name,
      username: formValues.username,
      email: formValues.email,
      phoneNumber: parseInt(formValues.phoneNumber, 10),
      password: formValues.password,
      userType,
    })
    setFormValues(initialState)
    navigate("/")
  }

  return (
    <div className="col register">
      <div className="auth-page">
        <div className="auth-card">
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                placeholder="full name"
                onChange={handleChange}
                value={formValues.name}
                required
                autoComplete="name"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="username">username</label>
              <input
                name="username"
                type="text"
                placeholder="username"
                onChange={handleChange}
                value={formValues.username}
                required
                autoComplete="username"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                placeholder="example@example.com"
                onChange={handleChange}
                value={formValues.email}
                required
                autoComplete="email"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                name="phoneNumber"
                type="text"
                placeholder="phoneNumber"
                onChange={handleChange}
                value={formValues.phoneNumber}
                required
                autoComplete="off"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
                value={formValues.password}
                required
                autoComplete="off"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="confirm password"
                onChange={handleChange}
                value={formValues.confirmPassword}
                required
                autoComplete="off"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="type">Are You a Developer or Customer?</label>

              <select
                name="type"
                id="type"
                value={formValues.type}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Type --</option>
                <option value="customer">Customer</option>
                <option value="developer">Developer</option>
              </select>
            </div>
            <div className="input-wrapper">
              <Link to="/" className="auth-link">
                do you have an account !
              </Link>
            </div>
            <button
              disabled={
                !formValues.email ||
                !formValues.password ||
                formValues.password !== formValues.confirmPassword
              }
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
