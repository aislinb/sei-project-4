import React from 'react'
import { getSingleCrop, deleteCrop } from '../../lib/api'

import { isOwner } from '../../lib/auth'

import { useParams, Link } from 'react-router-dom'

function CropShow() {

  const [crop, setCrop] = React.useState([])

  // const isLoggedIn = isAuthenticated()

  // const { formdata, handleChange, errors, setErrors  } = useForm({
  //   text: '', 
  //   rating: '',
  //   owner: {}
  // })

  // const history = useHistory()
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

  // De-structured fields from the crop dictionary:
  const { name, binomialName, description, image } = crop

  // ! DELETE Function
  const handleDelete = async () => {
    try {
      await deleteCrop(id)
      history.push('/crops/')
    } catch (err) {
      console.log(err)
    }
  }

  // COMMENTS
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
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     await createEventComment(formdata, event._id)
  //     const { data } = await getSingleEvent(id)
  //     setEvent(data)
  //     formdata.text = ''
  //     e.target[5].value = ''
  //   } catch (err) {
  //     setErrors(err.response.data.errors)
  //   }
  // }



  return (
    <main>
      <div className="flex-div central-body">
        <h1>{name}</h1>
        <h2>{binomialName}</h2>
        <p>{description}</p>
        <figure>
          <img src={image} alt={name} />
        </figure>
        {crop.owner && crop ?
          isOwner(crop.owner._id) && 
          <div>
            <Link to={`${crop._id}/edit/`}><button className="edit-btn">Edit</button></Link>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
          :
          <p>loading...</p>
        }
      </div>
    </main>
    
  )
}

export default CropShow