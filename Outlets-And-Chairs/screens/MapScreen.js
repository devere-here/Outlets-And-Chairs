import MapView, { Marker, Callout } from 'react-native-maps'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { googlePlacesKey } from '../secrets'
import MarkerCallout from '../components/MarkerCallout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

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
    this.getLocalCafes()
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

  getLocalCafes = () => {
    navigator.geolocation.getCurrentPosition((position) => {

      let cafeInfo
      const { latitude, longitude } = position.coords,
        url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=cafe&key=${googlePlacesKey}`,
        newRegion = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }

      fetch(url)
        .then(res => res.json())
        .then(res => {
          cafeInfo = this.processAPIData(res.results)
          this.setState({ region: newRegion, cafeInfo })
        })
        .then(err => {
          console.log('err is ', err)
        })

    })
  }

  render = () => {

    const { navigate } = this.props.navigation
    return (

      <View style={styles.container} >
        <MapView
          region={this.state.region}
          showsUserLocation={true}
          style={styles.map}
        >
          {
            this.state.cafeInfo.length === 0
              ? null
              : this.state.cafeInfo.map((cafe) => (
                  <Marker
                    key={cafe.id}
                    pinColor={cafe.isOpen.open_now ? 'green' : 'red'}
                    coordinate={{ latitude: cafe.lat, longitude: cafe.lng }}
                  >
                    <Callout>
                      <MarkerCallout cafe={cafe} navigate={navigate} />
                    </Callout>
                  </Marker>
              ))
          }
        </MapView>
      </View>
    )
  }
}

