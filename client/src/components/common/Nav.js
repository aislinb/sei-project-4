import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'

function Nav() {
  useLocation()
  const isLoggedIn = isAuthenticated()
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/') // logs out & returns user to homepage
  }

  const [isOpen, setIsOpen] = React.useState(false)
  const { pathname } = useLocation()

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className="navbar is-fixed-top is-hoverable">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <a className="navbar-brand" href="/">
              <div className="logo-image">
                <img src="https://images.squarespace-cdn.com/content/v1/5ed034aaab927132aa19a21d/1601539956445-1Z3EQO8X8S3MHEKHONMM/ke17ZwdGBToddI8pDm48kMABmXfHFJ1hPhaBVAaleilZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxcLMSb-u98vE5T7M6L1cpWXMj3FU9GeFt3G9woqbsI-XeQjidn880xzk_2dDWgBr0/Natoora_Logo.png?format=1000w" className="img-fluid"></img>
              </div>           
            </a>
          </Link>
          <span onClick={handleMenuToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link to="/crops" className="navbar-item"><button className="nav-button hover">WHAT TO GROW</button></Link>
            <Link to="/crops/new" className="navbar-item"><button className="nav-button hover">COMMUNITY</button></Link>
            <Link to="/about-us" className="navbar-item"><button className="nav-button hover">ABOUT US</button></Link>
            <Link to="/contact-us" className="navbar-item"><button className="nav-button hover">CONTACT US</button></Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {!isLoggedIn ?
                <>
                  <div className="buttons">
                    <Link to="/register">
                      <button className="nav-button hover">REGISTER</button>
                    </Link>
                    <Link to="/login">
                      <button className="nav-button hover">LOG IN</button>
                    </Link>
                  </div>
                  
                </>
                :
                <>
                  <div className="buttons">
                    <Link to="/profile">
                      <button className="nav-button hover">MY PROFILE</button>
                    </Link>
                    <button className="nav-button hover" onClick={handleLogout}>LOG OUT</button>
                  </div>
                </>
              }
            </div> 
          </div>
        </div>
      </div>
    </nav>
  )

}

export default Nav