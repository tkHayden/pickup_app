import React ,{ useContext, useEffect, useState} from 'react'

const LocationContext = React.createContext()

const LocationUpdateContext = React.createContext()

export const useLocation = () => {
  return useContext(LocationContext)
}

export const useLocationUpdate = () =>{
  return useContext(LocationUpdateContext)
}

const LocationProvider = ({children}) => {
  const [location,setLocation] = useState({longitude:0,latitude:0})

  const update = (newLocation) =>{
    setLocation(newLocation)
  }

  return(
    <LocationContext.Provider value={location}>
      <LocationUpdateContext.Provider value= {update}>
        {children}
      </LocationUpdateContext.Provider>
    </LocationContext.Provider>
  )
}

export default LocationProvider