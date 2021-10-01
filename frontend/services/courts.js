const fetchCourts = async() =>{
    const response = await fetch('http://192.168.1.13:3001/api/courts')
    const json = await response.json()
    return json
    
  }

  const fetchCourtPhotos = async(id) =>{
    const response = await fetch(`http://192.168.1.13:3001/api/courts/photos/${id}`)
    const json = await response.json()

    return json
  }


  export default {fetchCourts,fetchCourtPhotos}