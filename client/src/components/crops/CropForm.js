import React from 'react'
import { getAllCropTags } from '../../lib/api'

function CropForm({ handleChange, handleSubmit, formdata, errors }) {
  const [tags, setTags] = React.useState([])

  

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllCropTags()
        setTags(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  console.log('Errors: ', errors)
  
  return (
    <form className="add-crop-form" onSubmit={handleSubmit}>
      <label className="block-form">Name</label>
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
      <label className="block-form">Binomial Name</label>
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
      <label className="block-form">Perennial</label>
      <input 
        className="block-form"
        type="checkbox" 
        name="isPerennial"
        onChange={handleChange} 
        value={formdata.isPerennial}
      />
      <label className="block-form">Description</label>
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
      <label className="block-form">Image URL</label>
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
      <label className="block-form">Sowing method</label>
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
      <label className="block-form">Tags</label>
      <select className="block-form"
        onChange={handleChange} 
        name="tags"
        value={formdata.venue}
      >
        <option disabled>Select a tag</option>
        {tags ?
          tags.map(tag => {
            return (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            )
          })
          :
          <option>No options available</option>
        }
      </select>
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  )

}

export default CropForm