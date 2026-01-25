import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    name: '',
    username:'',
    email: '',
    phoneNumber:'',
    password: '',
    confirmPassword: '',
    type:''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      name: formValues.name,
      username: formValues.username,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      password: formValues.password,
      type: formValues.type
    })
    setFormValues(initialState)
    navigate('/')
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
                type="phoneNumber"
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
              <label htmlFor="type">Are You A Developer or Customer?</label>
              <input
                name="type"
                type="type"
                placeholder="type"
                onChange={handleChange}
                value={formValues.type}
                required
                autoComplete="off"
              />
            </div>
            <Link to="/">do you have an account !</Link>

            <button
              disabled={
                !formValues.email ||
                (!formValues.password &&
                  formValues.password === formValues.confirmPassword)
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
