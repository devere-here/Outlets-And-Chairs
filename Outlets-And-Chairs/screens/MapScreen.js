import RNGooglePlaces from 'react-native-google-places'
import MapView, { Marker } from 'react-native-maps'
import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { H1, Container, Content } from 'native-base'
import Spacer from '../components/Spacer'
import nodejs from 'nodejs-mobile-react-native'

import yelp  from 'yelp-fusion'



// const apiKey = 'U9tQpj-j-kqELOojcfUWqfMe1Sh6m_M49dwvVu37YdhTBJ_seMzvKjs4D2lmXfO_qSDpedMkdwkhPXm3affy3OV-tbycYAB5pTlNXRj-BUknsK0Q44KFuDtq19gFW3Yx'

// const searchRequest = {
//   term:'Four Barrel Coffee',
//   location: 'san francisco, ca'
// };




export default class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
    }
    this.onRegionChange = this.onRegionChange.bind(this)
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)
    this.openSearchModal = this.openSearchModal.bind(this)
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place)
      })
      .catch(error => console.log(error.message))
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('in componentDidMount new location is latitude', position.coords.latitude, 'longitude', position.coords.longitude)
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      this.setState({ region: newRegion })
    })

    // const client = yelp.client(apiKey);
    // console.log('about to yelp')

    // client.search(searchRequest).then(response => {
    //   console.log('in the yelp promise')
    //   const firstResult = response.jsonBody.businesses[0]
    //   const prettyJson = JSON.stringify(firstResult, null, 4)
    //   console.log(prettyJson)
    // }).catch(e => {
    //   console.log(e)
    // });

    console.log('yelped')

  }


  onRegionChange(region) {
    this.setState({ region })
    console.log('new region', region)

  }

  onRegionChangeComplete(region) {
    this.setState({ region })
    console.log('new region', region)
  }


  render() {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }} >
        <View style={{height: '5%', backgroundColor: 'white'}}><Text>Press Here to Search</Text></View>
          {navigator.geolocation.getCurrentPosition((position) => { console.log('in success', 'latitude', position.coords.latitude, 'longitude', position.coords.longitude) })}
          <MapView
            region={this.state.region}
            onRegionChangeComplete={this.onRegionChangeComplete}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Marker coordinate={this.state.region} pinColor="green" />
          </MapView>
      </View>
    )
  }
}

