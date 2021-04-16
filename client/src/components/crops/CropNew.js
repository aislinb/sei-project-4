import React from 'react'
import CropForm from './CropForm'
import useForm from '../../utils/useForm'
import { createCrop } from '../../lib/api'
import { useHistory } from 'react-router-dom'


function CropNew() {
  //  axios get request to populate the tags/companions and then be able to post 
  const history = useHistory()
  const { formdata, handleChange, errors, setErrors } = useForm({
    // this should reflect the data type the API is expecting in this initial state:
    name: '',
    binomialName: '', 
    description: '',
    isPerennial: false,
    image: '',
    growingDays: '',
    sowingMethod: '',
    tags: [],
    owner: ''
    // tags: '', populate with axios.get - write logic to enable people to select multiple tags. when you post data, append tags §
    // companions: ''
    // work out how to find tags and companions by id ^
  })

  
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // console.log(formdata)
      const { data } = await createCrop(formdata)
      // console.log(event.target.type)
      history.push(`/crops/${data.id}/`)
    } catch (err) {
      setErrors(err.response.data)
    }
    
    // window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
  }
  console.log(formdata)

  return (
    <main>
      <section className="section central-body register-page">
        <div className="container">
          <div className="columns new-form-flex">
            <CropForm 
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              // handleMultiSelectChange={handleMultiSelectChange}
              formdata={formdata}
              errors={errors}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default CropNew