import React from 'react'
import { getAllCrops } from '../../lib/api'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import Select from 'react-select'
import { getAllCropTags } from '../../lib/api'

import RingLoader from 'react-spinners/RingLoader'

function CropIndex() {


  const [crops, setCrops] = React.useState([])
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    
    const getData = async () => {
      try {
        const { data } = await getAllCrops()
        setCrops(data)
        
      } catch (err) {
        console.log(err)
        setHasError(true)
      }
    }
    getData()
    console.log(crops)
    
  }, [])

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


  return (
    <main>
      <div className="flex-div central-body index-page">
        <div className="top-banner">
          <figure>
            <img src="https://www.natoora.co.uk/img/pages/our-produce/natoora-ourproduce-banner.jpg" alt="banner-image" />
          </figure>
        </div>
        <div className="index-header">
          <p>We know the seed, soil and season of everything we source. Each of our radically seasonal fruits and vegetables has its own unique story of craftsmanship which elevates it above the monotonous landscape of industrially-cultivated, year-round produce.</p>
          {isAuthenticated ? 
            <div className="add-button">
              <p>As a member of our community, are you growing something that is not on the list yet?</p>
              <Link to="/crops/new/"><a className="button is-dark add-own">ADD YOUR OWN</a></Link>
            </div>
            :
            <h6></h6>
          }
        
          {crops ?
            <div className="all-crops">
              <div>
                <Select 
                  placeholder="Select a category..."
                  options={tags}
                />
              </div>
              <div className="crops-wrapper">
                <div className="index-list">
                  {crops.map(item => {
                  // De-structured fields from the event object
                    const { id, name, image } = item
                    return (
                      <div className="index-item" key={id}>
                        <Link to={`/crops/${id}`}>
                          <div className="hvrbox">
                            <img src={image} alt={name} className="hvrbox-layer_bottom"/>
                            <div className="hvrbox-layer_top hvrbox-layer_slidedown">
		                          <div className="hvrbox-text">{name}</div>
	                          </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })
                  }
                </div>
              </div>
            </div>
            :
            <div>
              {hasError ? 'Oops something went wrong...'
                :
                <div className="ring-loader">
                  <RingLoader color="purple" size={60} />
                </div>
              }
            </div>
          }
        </div>
      </div>
    </main>
    
  )
}

export default CropIndex