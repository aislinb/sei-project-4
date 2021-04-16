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
      <section className="section flex-div central-body index-page">
        <div className="box">
          <img src="https://www.natoora.co.uk/img/pages/our-produce/natoora-ourproduce-banner.jpg" alt="banner-image" />
          <div className="title">
            Produce
          </div>
          <div className="subtitle">
            What to Grow
          </div>
          <p className="overlay-text">Every plant has its own season, with subtle shifts that happen every day.
            We follow flavour through these microseasons.</p>
        </div>
        <div className="index-header">
          <p>We know the seed, soil and season of everything we source. Each of our radically seasonal fruits and vegetables has its own unique story of craftsmanship which elevates it above the monotonous landscape of industrially-cultivated, year-round produce.</p>
          
        </div>
        {crops ?
          <div className="all-crops">
            <div className="add-select">
              {isAuthenticated ? 
                <div className="add-button">
                  <p>Is there something that you&apos;re growing that is not on the list yet?</p>
                  <Link to="/crops/new/"><a className="button is-dark add-own">ADD YOUR OWN</a></Link>
                </div>
                :
                <h6></h6>
              }
              <Select 
                placeholder="Select a category..."
                options={tags}
                className="select-fields"
              />
            </div> 
            <div className="crops-wrapper">
              <div className="index-list">
                {crops.map(item => {
                  // De-structured fields from the event object
                  const { id, name, image } = item
                  return (
                    <div className="index-item box" key={id}>                        
                      <img src={image}></img>
                      <div className="text">
                        <h1>{name}</h1>
                        <hr></hr>
                        <Link to={`/crops/${id}`} className="read-more">
                              Read More
                        </Link>
                      </div>
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
        
      </section>
    </main>
    
  )
}

export default CropIndex