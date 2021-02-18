import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import useForm from '../../utils/useForm'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'


function Login() {
  const history = useHistory()
  const [error, setError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const { data } = await loginUser(formdata)
      setToken(data.token)
      history.push('/crops/') //page to go to after logging in
    } catch (err) {
      setError(true)
    }
  }

  const handleFocus = () => {
    setError(false)
  }

  return (
    <main>
      <section className="section central-body register-page">
        <div className="container">
          <div className="columns">
            <form className="register-form column is-half is-offset-one-quarter box" onSubmit={handleSubmit}>
              <div className="block-form">
                <h1>LOGIN HERE</h1>
                <input
                  className="block-form"
                  placeholder="Email Address"
                  onChange={handleChange}
                  name="email"
                  value={formdata.email}
                  onFocus={handleFocus}
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  className="block-form"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formdata.password}
                  onFocus={handleFocus}
                />
                {error && <p className="login-error error-in-form error-message">Sorry, your username or password are incorrect</p>}
              </div>
              <div className="block-form field login-button">
                <button type="submit" className="block-form button is-fullwidth form-submit-button">Log In</button>
              </div>
              <div className="block-form">
                <p className="or">or</p>
              </div>
              <Link to="/register">
                <div className="block-form field">
                  <button className="block-form button is-fullwidth form-submit-button">Create New Account</button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login