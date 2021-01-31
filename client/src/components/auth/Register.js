import React from 'react'
import useForm from '../../utils/useForm'
import { registerUser } from '../../lib/api'
import { useHistory, Link } from 'react-router-dom'


function Register() {
  const history = useHistory()
  const { formdata, errors, handleChange, setErrors } = useForm({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      console.log(formdata)
      await registerUser(formdata)
      history.push('/login/') // is registration successful => login
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }
  return (
    <main>
      <section className="section login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="block-form">
            <h1>Register here</h1>
            <label className="block-form">Username:</label>
            <input
              className="block-form" {...`input ${errors && errors.username ? 'error-in-form' : ''}`}
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
              className="block-form" {...`input ${errors && errors.email ? 'error-in-form' : ''}`}
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
              className="block-form" {...`input ${errors && errors.first_name ? 'error-in-form' : ''}`}
              placeholder="First name"
              onChange={handleChange}
              name="first_name"
              value={formdata.first_name}
            />
          </div>
          {errors.email && <p className="error-in-form error-message">{errors.email}</p>}
          <div className="block-form">
            <label className="block-form">Last Name:</label>
            <input
              className="block-form" {...`input ${errors && errors.last_name ? 'error-in-form' : ''}`}
              placeholder="Last name"
              onChange={handleChange}
              name="last_name"
              value={formdata.last_name}
            />
          </div>
          {errors.email && <p className="error-in-form error-message">{errors.email}</p>}
          <div className="block-form">
            <label className="block-form">Password:</label>
            <input
              type="password"
              className="block-form" {...`input ${errors.password ? 'error-in-form' : ''}`}
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
                className="block-form" {...`input ${errors.passwordConfirmation ? 'error-in-form' : ''}`}
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
    </main>
  )
}

export default Register