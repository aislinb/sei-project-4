import React from 'react'
import CropForm from './CropForm'
import useForm from '../../utils/useForm'
import { createCrop } from '../../lib/api'
import { useHistory } from 'react-router-dom'


function cropNew() {
  const history = useHistory()
  const { formdata, handleChange, errors, setErrors } = useForm({
    name: '', 
    // Get ISO formatted dated from user selection. need to restrict date to only 2020
    binomialName: '', 
    description: '',
    isPerennial: '',
    image: '',
    growingDays: '',
    sowingMethod: '',
    tags: '',
    companions: ''
    // work out how to find tags and companions by id ^
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await createCrop(formdata)
      history.push(`/crops/${data.id}`)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }


  return (
    <main>
      <h1 className="form-heading">Add one of your favourite crops to grow</h1>
      <CropForm 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formdata={formdata}
        errors={errors}
      />
    </main>
  )
}

export default cropNew