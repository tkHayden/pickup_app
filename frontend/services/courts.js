const fetchCourts = async() =>{
    console.log('here')
    const response = await fetch('http://192.168.1.13:3001/api/courts')
    const json = await response.json()
    return json
    
  }


  export default {fetchCourts}