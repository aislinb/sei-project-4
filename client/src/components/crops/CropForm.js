import React from 'react'
import Select from 'react-select'
// import { getAllCropTags } from '../../lib/api'

function CropForm({ handleChange, handleSubmit, formdata, errors }) {
  
  // const [tags, setTags] = React.useState([])

  // const selectOptions = () => {
  //   {tags ?
  //     tags.map(tag => {
  //       return (
          
  //         <option key={tag.id} value={tag.id} label={tag.name}>{tag.name}</option>
  //       )
  //     })
  //     :
  //     <option>No options available</option>
  //   }
  // }
  const tags = [ 
    { label: 'Herbs', value: 1 },
    { label: 'Salad', value: 2 },
    { label: 'Annuals', value: 3 },
    { label: 'Italian', value: 4 },
    { label: 'Tomatoes', value: 5 },
    { label: 'Citrus', value: 6 },
    { label: 'Heirloom', value: 7 },
    { label: 'Leafy Greens', value: 8 },
    { label: 'Fruit', value: 9 },
    { label: 'Root vegetables', value: 10 },
    { label: 'Squash', value: 11 }
  ]

  const handleMultiSelectChange = (selected, name) => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    handleChange({ target: { name, value: selectedItems } })
  }

  // React.useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await getAllCropTags()
  //       setTags(data)
  //       const selectOptions = [tags]
  //       console.log(tags)
  //       console.log(selectOptions)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [])

  console.log('Errors: ', errors)
  console.log('Formdata: ', formdata)
  
  return (
    <form className="add-crop-form register-form column is-half is-offset-one-quarter box" onSubmit={handleSubmit}>
      <h1 className="form-heading">Something not on the list? <br></br><br></br>Let us know what you&apos;ve been enjoying growing RECENTLY.</h1>
      <label className="block-form label">Name</label>
      <input 
        className="block-form" 
        type="text" 
        name="name"  
        placeholder="Crop Name" 
        onChange={handleChange} 
        value={formdata.name}
      />
      {errors ? 
        <div>
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        :
        <div></div>
      }
      <label className="block-form label">Binomial Name</label>
      <input 
        className="block-form" 
        type="text" 
        name="binomialName"  
        placeholder="Binomial Name" 
        onChange={handleChange} 
        value={formdata.binomialName}
      />
      {errors ?
        <div>
          {errors.binomialName && <p className="error-message">{errors.binomialName}</p>}
        </div>
        :
        <div></div>
      }
      <label className="block-form label">Perennial</label>
      <input 
        className="block-form checkbox"
        type="checkbox" 
        name="isPerennial"
        onChange={handleChange}
        checked={formdata.isPerennial}
      />
      <label className="block-form label">Description</label>
      <textarea 
        className="block-form"
        name="description" 
        maxLength="400"
        placeholder="A perfect crop for first-timers to grow." 
        onChange={handleChange} 
        value={formdata.description}
      />
      {errors ? 
        <div>
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>
        :
        <div></div>
      }
      <label className="block-form label">Image URL</label>
      <input 
        className="block-form"
        type="text" 
        name="image" 
        placeholder="E.g. https://secure.i.telegraph.co.uk/multimedia/archive/02591/killers_2591613b.jpg" 
        onChange={handleChange} 
        value={formdata.image}
      />
      {errors ? 
        <div>
          {errors.image && <p className="error-message">{errors.image}</p>}
        </div>
        :
        <div></div>
      }
      <label className="block-form label">Sowing method</label>
      <textarea 
        className="block-form"
        name="sowingMethod" 
        maxLength="400"
        placeholder="Scatter seeds sparingly on well drained potting compost and leave on a sunny windowsill" 
        onChange={handleChange} 
        value={formdata.sowingMethod}
      />
      {errors ? 
        <div>
          {errors.sowingMethod && <p className="error-message">{errors.sowingMethod}</p>}
        </div>
        :
        <div></div>
      }
      <label className="block-form label">Growing Days</label>
      <input 
        className="block-form" 
        type="number" 
        name="growingDays"  
        placeholder="Growing Days" 
        onChange={handleChange} 
        value={formdata.growingDays}
      />
      {errors ? 
        <div>
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        :
        <div></div>
      }      
      <label className="block-form label">Tags</label>
      {/* <select className="block-form select"
        onChange={handleChange} 
        name="tags"
        value={formdata.tags}
      >
        <option value="" disabled>Select a tag</option>
        {tags ?
          tags.map(tag => {
            return (
              <option key={tag.id} value={tag.id} label={tag.name}>{tag.name}</option>
            )
          })
          :
          <option>No options available</option>
        }
      </select> */}
      <Select
        className="block-form back-color tag-styles" 
        options={tags}
        isMulti
        name='tags'
        onChange={selected => handleMultiSelectChange(selected, 'tags')}
      />
      <div className="block-form field">
        <button type="submit" className="block-form button is-fullwidth form-submit-button">Submit</button>
      </div>
    </form>
  )

}

export default CropForm