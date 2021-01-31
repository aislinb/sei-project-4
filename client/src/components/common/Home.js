import React from 'react'
import { getAllCrops } from '../../lib/api'

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
      <h1>Crop Home page</h1>
    </main>
    
  )

}

export default Home