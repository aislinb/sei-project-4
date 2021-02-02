import React from 'react'
import { getAllCrops } from '../../lib/api'
import HeroCarousel from 'react-hero-carousel'

function Home() {

  const [crops, setCrops] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllCrops()
        setCrops(data)
        console.log(crops)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <main>
      <div className="central-body">
        <section className="hero-carousel">
          <HeroCarousel interval={3000}>
            <img
              src="https://www.natoora.co.uk/img/pages/homepage/Homepage-banner_homedelivery.jpg"

            />
            <img
              src="https://www.natoora.co.uk/img/pages/homepage/Homepage-banner-winter-tomatoes.jpg"
            />
            <img
              src="https://www.natoora.co.uk/img/pages/homepage/nyc/Homepage-banner_homedelivery.jpg"
            />
            <img
              src="https://www.natoora.co.uk/img/pages/homepage/Homepage-banner-earthworks.jpg"
            />
          </HeroCarousel>
        </section>
      </div>
    </main>
    
  )

}

export default Home