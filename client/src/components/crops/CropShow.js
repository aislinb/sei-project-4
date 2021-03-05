import React from 'react'
import { getSingleCrop, deleteCrop, createCropComment, deleteCropComment, showUserProfile } from '../../lib/api'
import useForm from '../../utils/useForm'
import { isOwner, isAuthenticated } from '../../lib/auth'


import profilePlaceholder from '../../images/profile-placeholder.jpg'
import { useParams, Link, useHistory } from 'react-router-dom'

function CropShow() {

  const [crop, setCrop] = React.useState([])
  const isLoggedIn = isAuthenticated()
  
  // GET USER

  const [user, setUser] = React.useState('')

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await showUserProfile()
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const history = useHistory()
  const { id } = useParams()
  const { formdata, handleChange, errors, setErrors  } = useForm({
    text: '', 
    crop: id
  })

  

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
  console.log('Crop id we are commenting on is' + crop.id + 'name is ' + crop.name)

  // De-structured fields from the crop dictionary:
  const { name, binomialName, description, image, tags, comments } = crop
  // console.log(crop, comments)
  // console.log(tags)

  



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
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      console.log(formdata)
      await createCropComment(formdata)
      const { data } = await getSingleCrop(id)
      setCrop(data)
      
      console.log('Formdata is' + formdata + 'Crop ID is' + id)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }
  // console.log(crop.tags)
  // console.log(tags)

  console.log(`DEtails of logged in person: ${crop.owner}`)

  return (
    <main>
      <section className="section central-body crop-show-page">
        <div className="container">
          {!crop ?
            <h8>loading...</h8>
            :
            <div className="crop-show-flex">
              <div className="crop-details-wrapper">
                <div className="crop-details-left">
                  <div className="crop-details-div">
                    <h1 className="bold">{name}</h1>
                  </div>
                  <div className="crop-details-div full-width">
                    <span><Link to={'/crops'} className="bold">Our Produce &gt; </Link></span>
                    <span>{name}</span>
                  </div>
                  <div className="crop-details-div full-width">
                    <span className="bold">Binomial Name &gt; </span>
                    <span className="binomial">`{binomialName}`</span>
                  </div>
                  <div className="crop-details-div">
                    <div className="div-left">
                      <h2 className="bold">Variety</h2>
                      <span>{name}</span>
                    </div>
                    <div className="div-right">
                      <h2 className="bold">Variety</h2>
                      <span>{name}</span>
                    </div>
                  </div>
                  
                  <div className="crop-details-div full-width tags">
                    <span className="bold">Tags &gt; </span>                
                    {!tags ? 
                      <p>no tags</p>
                      :
                      tags.map(tag => {
                        return (
                          <span 
                            key={tag.id}
                            className="tag"
                            
                          >
                            <Link to={`${tag.id}/crops-in-tag`}>{tag.name}</Link>
                          </span>
                        )
                      })
                    }
                  </div>           
                  <div className="seasonality crop-details-div full-width">
                    <div className="bold">Seasonality</div>
                    <div className="spans">
                      <span className="on">Jan</span>
                      <span className="on">Feb</span>
                      <span className="on">Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span className="on">Nov</span>
                      <span className="on">Dec</span> 
                    </div>
                  </div>
                  <div className="comments-wrapper">
                    <div className="comments-area">
                      {crop && comments && comments.length > 0 ?
                        <div>
                          <h3 className="bold">Other People Thought:</h3>
                          {comments.map(comment => {
                            return (
                              <div key={comment.id} className="comment-block">
                                <h5 className="comment-author">{comment.owner.username}</h5>
                                <div className="comment-avatar">
                                  {comment.owner.userImage ? 
                                    <img src={comment.owner.profileImage} alt="profile pic" />
                                    :
                                    <img src={profilePlaceholder} alt="profile pic" />
                                  }
                                </div>
                                <div className="comment-text">
                                  <p>{comment.text}</p>
                                  {isOwner(comment.owner.id) && 
                                    <button className="delete-btn" onClick={() => handleCommentDelete(comment.id)}>Delete</button>
                                  }   
                                </div>
                                                
                              </div>
                            )
                          }
                          )}
                        </div>
                        :
                        <div>
                          <h3 className="bold">Reviews:</h3>
                          <p className="no-reviews">No reviews yet...</p>
                        </div>
                      }
                    </div>
                    <div className="create-comment-area">
                      {isLoggedIn ? 
                        <div className="comments">
                          <form onSubmit={handleSubmit}>
                            <div className="bold">
                              <label>Leave a comment if you are growing this variety</label>
                            </div>
                            <textarea
                              className="block-form" {...`input ${errors.text ? 'error-in-form' : ''}`}
                              name="text"
                              type="text"
                              placeholder="Tell us what you thought..."
                              onChange={handleChange}
                              value={formdata.text}
                            />
                            {errors.text && <p className="error-in-form error-message">{errors.text}</p>}
                            <button type="submit" className="submit-btn">Post Comment</button>
                          </form>
                        </div>
                        :
                        <h2><Link to='/register'>Register</Link> or <Link to='/login'>Login</Link> to leave a review!</h2>
                      }
                    </div>
                  </div>
                </div>
                <div className="crop-details-right">
                  <div className="crop-details-div">
                    <h2 className="bold">Details on how to grow {name}</h2>
                    <p className="how-to-grow">{description}</p>
                  </div>
                  <div className="crop-image-block">
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
                </div>
                
              </div>
              
            </div>
          
          }
        </div>
      </section>
    </main>

  )
}

export default CropShow