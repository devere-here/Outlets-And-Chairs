import React from 'react'
import { googlePlacesKey } from '../secrets'
import MapScreenUI from '../components/MapScreenUI'

export default class Map extends React.Component {
  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    cafeInfo: []
  }

  componentDidMount = () => {

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      this.getLocalCafes(latitude, longitude)
    })
  }

  processAPIData = (cafeData) => {
    const cafeInfo = []

    cafeData.forEach(cafe => {

      if (cafe.opening_hours) {
        cafeInfo.push({ name: cafe.name, id: cafe.place_id, isOpen: cafe.opening_hours, lat: cafe.geometry.location.lat, lng: cafe.geometry.location.lng })
      }
    })

    return cafeInfo
  }

  updateRegion = (region) => this.setState({region})

  getLocalCafes = (latitude, longitude) => {

      let cafeInfo
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=cafe&key=${googlePlacesKey}`,
        region = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }

      fetch(url)
        .then(res => res.json())
        .then(res => {
          cafeInfo = this.processAPIData(res.results)
          this.setState({ region, cafeInfo })
        })
        .then(err => {
          console.log('err is ', err)
        })
  }

  render = () => {

    const { navigate } = this.props.navigation,
      { region, cafeInfo } = this.state

    return (
      <MapScreenUI
        region={region}
        cafeInfo={cafeInfo}
        updateRegion={this.updateRegion}
        navigate={navigate}
        getLocalCafes={this.getLocalCafes}
      />
    )
  }
}
