import React from 'react'
import { getSingleCrop, deleteCrop, createCropComment } from '../../lib/api'
import useForm from '../../utils/useForm'
import { isOwner, isAuthenticated } from '../../lib/auth'

import { useParams, Link, useHistory } from 'react-router-dom'

function CropShow() {

  const [crop, setCrop] = React.useState([])

  const isLoggedIn = isAuthenticated()

  const { formdata, handleChange, errors, setErrors  } = useForm({
    text: '', 
    owner: {}
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
  const { name, binomialName, description, image, tags } = crop
  console.log(crop)
  console.log(tags)

  // ! DELETE Function
  const handleDelete = async () => {
    try {
      await deleteCrop(id)
      history.push('/crops/')
    } catch (err) {
      console.log(err)
    }
  }

  

  // // COMMENTS
  // const handleCommentDelete = async (commentId) => {
  //   try {
  //     await deleteCropComment(id, commentId)
  //     const { data } = await getSingleCrop(id)
  //     setCrop(data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  // // * Submit Reviews
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createCropComment(formdata, crop.id)
      const { data } = await getSingleCrop(id)
      setCrop(data)
      formdata.text = ''
      console.log(formdata)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }
  console.log(crop.tags)
  console.log(tags)


  return (
    <main>
      <div className="flex-div central-body flex-div">
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
                  return <div key={tag.id} className="tag">{tag.name}</div>
                })
              }              
              <p></p>
              <figure>
                <img src={image} alt={name} />
              </figure>
            </div>
            <div className="owner-buttons">
              {crop.owner && crop ?
                isOwner(crop.owner._id) && 
                <div>
                  <Link to={`${crop._id}/edit/`}><button className="edit-btn">Edit</button></Link>
                  <button className="delete-btn" onClick={handleDelete}>Delete</button>
                </div>
                :
                <p>.</p>
              }
            </div>
            <div className="comments-area">
              {isLoggedIn ? 
                <div className="comments">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>Write Your Review</label>
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
                <h2><Link to='/register/'>Register</Link> or <Link to='/login/'>Login</Link> to leave a review!</h2>
              }
            </div>
          </div>
          
        }
      </div>
    </main>

  )
}

export default CropShow