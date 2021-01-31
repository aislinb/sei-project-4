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

  return (
    <nav>
      <Link to="/">
        <div className="logo">
          <div>👩🏼‍🌾</div>
        </div>
      </Link>
      <ul>
        <li> 
          <Link to="/crops/">Crops</Link>
        </li>
        <li> 
          <Link to="/new/">Add a new crop</Link>
        </li>
        <li> 
          <div className="buttons">
            {!isLoggedIn ?
              <>
                <Link className="nav-button" to="/register">
                      Register
                </Link>
                <Link className="nav-button" to="/login">
                      Log in
                </Link>
              </>
              :
              <>
                <Link to="/profile">
                  <button className="nav-button">My Profile</button>
                </Link>
                <button className="nav-button" onClick={handleLogout}>Log Out</button>
              </>
            }
          </div>
        </li>
      </ul>

    </nav>
  )

}

export default Nav