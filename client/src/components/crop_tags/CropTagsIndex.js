import React from 'react'

import { getAllCropTags } from '../../lib/api'



function CropTagsShow() {

  const [tags, setTags] = React.useState([])
  // const isLoggedIn = isAuthenticated()


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
  }, []
  )
  console.log(tags)

  return (
    <main>
      <section className="section central-body crop-show-page">
        <div className="container">
          {!tags ?
            <h8>loading...</h8>
            :
            <div>
              <div>Crop Tags page</div>
              
            </div>
          }
        </div>
      </section>
    </main>
  )

}

export default CropTagsShow