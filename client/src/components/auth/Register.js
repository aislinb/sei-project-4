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
      history.push('/login') // if registration successful => login
    } catch (err) {
      setErrors(err.response.data)
    }
  }
  return (
    <main>
      <section className="section central-body register-page">
        <div className="container">
          <div className="columns">
            <form className="register-form column is-half is-offset-one-quarter box" onSubmit={handleSubmit}>
              <div className="block-form">
                <h1>SIGN UP</h1>
                {/* <label className="block-form">Username:</label> */}
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
                {/* <label className="block-form">Email:</label> */}
                <input
                  className="block-form"
                  placeholder="Email Address"
                  onChange={handleChange}
                  name="email"
                  value={formdata.email}
                />
              </div>
              {errors.email && <p className="error-in-form error-message">{errors.email}</p>}
              <div className="block-form">
                {/* <label className="block-form">First Name:</label> */}
                <input
                  className="block-form"
                  placeholder="First Name"
                  onChange={handleChange}
                  name="firstName"
                  value={formdata.firstName}
                />
              </div>
              {errors.firstName && <p className="error-in-form error-message">{errors.firstName}</p>}
              <div className="block-form">
                {/* <label className="block-form">Last Name:</label> */}
                <input
                  className="block-form"
                  placeholder="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  value={formdata.lastName}
                />
              </div>
              {errors.lastName && <p className="error-in-form error-message">{errors.lastName}</p>}
              <div className="block-form">
                {/* <label className="block-form">Profile Image:</label> */}
                <input
                  className="block-form"
                  placeholder="Profile Image URL"
                  onChange={handleChange}
                  name="profileImage"
                  value={formdata.profileImage}
                />
              </div>
              {errors.profileImage && <p className="error-in-form error-message">{errors.profileImage}</p>}
              <div className="block-form">
                {/* <label className="block-form">Password:</label> */}
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
                {/* <label className="block-form">Confirm Password:</label> */}
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
              <div className="block-form field reg-button">
                <button type="submit" className="block-form button is-fullwidth form-submit-button">Register</button>
              </div>
              <div className="block-form account-already">
            Already have an account? <Link to="/login">LOG IN.</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Register