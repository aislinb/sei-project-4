import React from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getAllCrops, showUserProfile  } from '../../lib/api'
import { logout } from '../../lib/auth'

function profileShow() {

  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  const isLoggedIn = isAuthenticated()
  const [user, setUser] = React.useState('')
  const [hasError, setHasError] = React.useState(false)

  const { id } = useParams()

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await showUserProfile(id)
        setUser(data)
      } catch (err) {
        setHasError(true)
        console.log(hasError)
      }
    }
    getData()
  }, [id])
  console.log(user)

  // GET CROPS:
  const [crops, setCrops] = React.useState([])

  React.useEffect(() => {

    const getData = async () => {

      try {
        const { data } = await getAllCrops()
        setCrops(data)
      } catch (err) {
        console.log(err)
      }
    }

    getData()

  }, [])

  return (
    <main>
      <section className="section central-body register-page profile-show">
        <div className="container">
          <div className="columns">
            <div className="register-form column is-half is-offset-one-quarter box">
              <h1>YOUR DETAILS</h1>
              {isLoggedIn ?
                <>
                  <div className="profile-container block-form">
                    <h3>Hello, {user.username}!</h3>
                    <div className="block-form">
                      <div className="block-form">
                        <div className="block-form">
                          <h4>Username:</h4>
                          <span>{user.username}</span>
                        </div>
                        <div className="block-form">
                          <h4>Email address:</h4>
                          <p>{user.email}</p>
                        </div>
                        <div className="block-form">
                          <h4>First Name:</h4>
                          <p>{user.firstName}</p>
                        </div>
                        <div className="block-form">
                          <h4>Last Name:</h4>
                          <p>{user.lastName}</p>
                        </div>
                      </div>
                      <div className="block-form  profile-pic">
                        <h4>Profile Picture:</h4>
                        {!user.profileImage ? 
                          <div className="profile-image not-yet">Not yet added...</div>
                          :
                          <figure className="profile-image">
                            <img src={user.profileImage} alt={user.username}/>
                          </figure>
                        }
                      </div>
                    </div>
                    <div className="block-form">
                      <div className="block-form full-width">
                        <h4>Crops you have created:</h4>
                        {user && crops ? 
                          crops.map(crop => {
                            if (crop.owner === user.id) {
                              return (
                                <>
                                  <Link to={`/crops/${crop.id}`}>
                                    <div>{crop.name}</div>
                                    <img src={crop.image} alt={crop.name}/>
                                  </Link>
                                </>
                              )
                            }
                          })
                          :
                          <div>You haven&apos;t grown any crops yet..</div>
                        }
                      </div>
                
                      <div className="block-form full-width">
                        <button className="edit-btn">
                          <Link to={'/update-profile'} className="edit-button">Edit my profile</Link>
                        </button>
                        <button className="nav-button" onClick={handleLogout}>Log Out</button>
                      </div>
                    </div>
                  </div>
                </>
                :
                <div className="profile-container please-login">
                  <button>
          Please <Link to="/login">Log in</Link> to access this page
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  )

}

export default profileShow