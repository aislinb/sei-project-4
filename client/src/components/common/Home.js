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
      <section className="central-body section register-page hero-carousel is-full-height-with-navbar">
        <HeroCarousel interval={3000}>
          <img
            src="https://www.natoora.co.uk/img/pages/homepage/Homepage-banner_homedelivery.jpg"
            alt="Blood oranges image"

          />
          <img
            src="https://www.natoora.co.uk/img/pages/homepage/Homepage-banner-winter-tomatoes.jpg"
            alt="Winter tomatoes image"
          />
          <img
            src="https://www.natoora.co.uk/img/pages/homepage/nyc/Homepage-banner_homedelivery.jpg"
            alt="Home delivery box image"
          />
          <img
            src="https://www.natoora.co.uk/img/pages/homepage/Homepage-banner-earthworks.jpg"
            alt="Earthworks image"
          />
        </HeroCarousel>
      </section>
    </main>
    
  )

}

export default Home