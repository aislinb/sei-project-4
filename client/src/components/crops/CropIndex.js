import React from 'react'
import { getAllCrops } from '../../lib/api'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import Select from 'react-select'

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

  return (
    <main>
      <div className="flex-div central-body index-page">
        <div className="top-banner">
          <figure>
            <img src="https://www.natoora.co.uk/img/pages/our-produce/natoora-ourproduce-banner.jpg" alt="banner-image" />
          </figure>
        </div>
        <div className="index-header">
          <h1>Crop Index page</h1>
          {isAuthenticated ? 
            <Link to="/crops/new/"><button className="link-button" >
              Add a Crop
            </button></Link>
            :
            <h6></h6>
          }
        
          {crops ?
            <div className="all-crops">
              <div>
                <Select 
                  placeholder="Select a category..."
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
                          <h3>{name}</h3>
                          <figure>
                            <img src={image} alt={name} />
                          </figure>
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