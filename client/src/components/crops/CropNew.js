import React from 'react'
import CropForm from './CropForm'
import useForm from '../../utils/useForm'
import { createCrop } from '../../lib/api'
import { useHistory } from 'react-router-dom'


function CropNew() {
  //  axios get request to populate the tags/companions and then be able to post 
  const history = useHistory()
  const { formdata, handleChange, errors, setErrors } = useForm({
    name: '',
    binomialName: '', 
    description: '',
    isPerennial: false,
    image: '',
    growingDays: 7,
    sowingMethod: ''
    // tags: '', populate with axios.get - write logic to enable people to select multiple tags. when you post data, append tags 
    // companions: ''
    // work out how to find tags and companions by id ^
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log(formdata)
      const { data } = await createCrop(formdata)
      
      history.push(`/crops/${data.id}`)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }


  return (
    <main>
      <div className="flex-div central-body new-crop">
        <div className="flex-div">
          <h1 className="form-heading">Add one of your favourite crops to grow</h1>
          <CropForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formdata={formdata}
            errors={errors}
          />
        </div>
      </div>
    </main>
  )
}

export default CropNew