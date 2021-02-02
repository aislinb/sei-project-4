import React from 'react'
import useForm from '../../utils/useForm'
import { registerUser } from '../../lib/api'
import { useHistory, Link } from 'react-router-dom'


function Register() {
  const history = useHistory()
  const { formdata, errors, handleChange, setErrors } = useForm({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    profileImage: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      console.log(formdata)
      await registerUser(formdata)
      history.push('/login/') // if registration successful => login
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }
  return (
    <main>
      <div className="flex-div central-body">
        <section className="section register-page">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="block-form">
              <h1>Sign up!</h1>
              <label className="block-form">Username:</label>
              <input
                className="block-form"
                placeholder="Username"
                onChange={handleChange}
                name="username"
                value={formdata.username}
              />
            </div>
            {errors.username && <p className="error-in-form error-message">{errors.username}</p>}
            <div className="block-form">
              <label className="block-form">Email:</label>
              <input
                className="block-form"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formdata.email}
              />
            </div>
            {errors.email && <p className="error-in-form error-message">{errors.email}</p>}
            <div className="block-form">
              <label className="block-form">First Name:</label>
              <input
                className="block-form"
                placeholder="First name"
                onChange={handleChange}
                name="firstName"
                value={formdata.firstName}
              />
            </div>
            {errors.firstName && <p className="error-in-form error-message">{errors.firstName}</p>}
            <div className="block-form">
              <label className="block-form">Last Name:</label>
              <input
                className="block-form"
                placeholder="Last name"
                onChange={handleChange}
                name="lastName"
                value={formdata.lastName}
              />
            </div>
            {errors.lastName && <p className="error-in-form error-message">{errors.lastName}</p>}
            <div className="block-form">
              <label className="block-form">Profile Image:</label>
              <input
                className="block-form"
                placeholder="profileImage"
                onChange={handleChange}
                name="profileImage"
                value={formdata.profileImage}
              />
            </div>
            {errors.profileImage && <p className="error-in-form error-message">{errors.profileImage}</p>}
            <div className="block-form">
              <label className="block-form">Password:</label>
              <input
                type="password"
                className="block-form"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={formdata.password}
              />
            </div>
            {errors.password && <p className="error-in-form error-message">{errors.password}</p>}
            <div className="block-form">
              <label className="block-form">Password Confirmation:</label>
              <div className="control">
                <input
                  type="password"
                  className="block-form"
                  placeholder="Password Confirmation"
                  onChange={handleChange}
                  name="passwordConfirmation"
                  value={formdata.passwordConfirmation}
                />
              </div>
              {errors.passwordConfirmation && <p className="error-in-form error-message">{errors.passwordConfirmation}</p>}
            </div>
            <div className="block-form">
              <button type="submit" className="block-form form-submit-button">Register</button>
            </div>
            <div className="block-form account-already">
            Already have an account? <Link to="/login/">Log In.</Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Register