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
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <span role="img" aria-label="logo" className="title">👩🏼‍🌾</span>
          </Link>
          <span onClick={handleMenuToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link to="/crops/" className="navbar-item"><strong>See all Crops</strong></Link>
            <Link to="/crops/new/" className="navbar-item"><strong>Add a new crop</strong></Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {!isLoggedIn ?
                <>
                  <div className="buttons">
                    <Link className="nav-button" to="/register/">
                      Register
                    </Link>
                    <Link className="nav-button" to="/login/">
                      Log in
                    </Link>
                  </div>
                </>
                :
                <>
                  <div className="buttons">
                    <Link to="/profile/">
                      <button className="nav-button">My Profile</button>
                    </Link>
                    <button className="nav-button" onClick={handleLogout}>Log Out</button>
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