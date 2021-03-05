import React from 'react'
import { getSingleCrop, deleteCrop, createCropComment, deleteCropComment, showUserProfile } from '../../lib/api'
import useForm from '../../utils/useForm'
import { isOwner, isAuthenticated } from '../../lib/auth'


import profilePlaceholder from '../../images/profile-placeholder.jpg'
import { useParams, Link, useHistory } from 'react-router-dom'

function CropShow() {

  const [crop, setCrop] = React.useState([])
  const isLoggedIn = isAuthenticated()
  

  const { formdata, handleChange, errors, setErrors  } = useForm({
    text: '', 
    crop: {}
  })

  const history = useHistory()
  const { id } = useParams()

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await getSingleCrop(id)
        setCrop(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])
  console.log(crop)

  // De-structured fields from the crop dictionary:
  const { name, binomialName, description, image, tags, comments } = crop
  console.log(crop, comments)
  console.log(tags)

  // GET USER

  const [user, setUser] = React.useState('')

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await showUserProfile(id)
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])



  // ! DELETE Function
  const handleDelete = async () => {
    try {
      await deleteCrop(id)
      history.push('/crops')
    } catch (err) {
      console.log(err)
    }
  }

  

  // COMMENTS
  const handleCommentDelete = async (commentId) => {
    try {
      await deleteCropComment(id, commentId)
      const { data } = await getSingleCrop(id)
      setCrop(data)
    } catch (err) {
      console.log(err)
    }
  }


  // // * Submit Reviews
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log(formdata)
      await createCropComment(formdata)
      const { data } = await getSingleCrop(id)
      setCrop(data)
      formdata.text = ''
      crop.id = ''
      console.log(formdata)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }
  console.log(crop.tags)
  console.log(tags)

  console.log(`DEtails of logged in person: ${crop.owner}`)

  return (
    <main>
      <section className="section central-body crop-show-page">
        <div className="container">
          {!crop ?
            <h8>loading...</h8>
            :
            <div className="crop-show-flex">
              <div className="crop-details">
                <h1>{name}</h1>
                <h2>{binomialName}</h2>
                <p>{description}</p>
                {!tags ? 
                  <p>no tags</p>
                  :
                  
                  tags.map(tag => {
                    return (
                      <div 
                        key={tag.id}
                        className="tag"
                      >
                        
                        <Link to={`${tag.id}/crops-in-tag`}>{tag.name}</Link>
                      </div>
                    )
                  })
                }              
                <p></p>
                
              </div>
              <div className="image-block">
                <figure>
                  <img src={image} alt={name} />
                </figure>
                <div className="owner-buttons">
                  {crop.owner === user.id ?
                    <div>
                      <Link to={`${crop.id}/edit/`}><button className="edit-btn">Edit</button></Link>
                      <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    </div>
                    :
                    <p></p>
                  }
                </div>
              </div>
              <div className="comments-area">
                {isLoggedIn ? 
                  <div className="comments">
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label>Leave a comment if you are growing this variety</label>
                      </div>
                      <textarea
                        className="block-form" {...`input ${errors.text ? 'error-in-form' : ''}`}
                        name="text"
                        placeholder="Tell us what you thought..."
                        onChange={handleChange}
                        value={formdata.text}
                      />
                      {errors.text && <p className="error-in-form error-message">{errors.text}</p>}
                      <button type="submit" className="submit-btn">Submit</button>
                    </form>
                  </div>
                  :
                  <h2><Link to='/register'>Register</Link> or <Link to='/login'>Login</Link> to leave a review!</h2>
                }
              </div>
              <div className="reviews-and-ratings-wrapper">
                <section className="reviews">
                  {crop && comments && comments.length > 0 ?
                    <div>
                      <h3>Reviews:</h3>
                      {comments.map(comment => {
                        return (
                          <div key={comment.id} className="comment-block">
                            <h5>{comment.owner.username}</h5>
                            <p>{comment.text}</p>
                            <div className="avatar">
                              {comment.owner.userImage ? 
                                <img src={comment.owner.userImage} alt="profile pic" />
                                :
                                <img src={profilePlaceholder} alt="profile pic" />
                              }
                            </div>
                          
                            {isOwner(comment.owner.id) && 
                        <button className="delete-btn" onClick={() => handleCommentDelete(comment.id)}>Delete</button>
                            }                   
                          </div>
                        )
                      }
                      )}
                    </div>
                    :
                    <div>
                      <h3>Reviews:</h3>
                      <p>Be the first to review this event!</p>
                    </div>
                  }
                </section>
              </div>
            </div>
          
          }
        </div>
      </section>
    </main>

  )
}

export default CropShow