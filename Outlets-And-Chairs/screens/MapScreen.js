import RNGooglePlaces from 'react-native-google-places';
import MapView, { Marker } from 'react-native-maps';
import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { H1, Container, Content } from 'native-base'
import Spacer from '../components/Spacer'
import YelpApi from 'v3-yelp-api'

const credentials = {
  appId:"0sWpNh2u9yn5-JKBZGNncA",
  app: "U9tQpj-j-kqELOojcfUWqfMe1Sh6m_M49dwvVu37YdhTBJ_seMzvKjs4D2lmXfO_qSDpedMkdwkhPXm3affy3OV-tbycYAB5pTlNXRj-BUknsK0Q44KFuDtq19gFW3Yx"
}

const yelp = new YelpApi(credentials)

export default class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
      }
      
    }
    this.onRegionChange = this.onRegionChange.bind(this)
    this.openSearchModal = this.openSearchModal.bind(this)
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place)
      })
      .catch(error => console.log(error.message))  // error is a Javascript Error object
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      this.setState({ region: newRegion })

      let params = { phone: '+442073722882' }

      console.log('about to phone search')
 
      yelp.phoneSearch(params)
        .then(data => {
          console.log('the goods', data)
          return data
        })
        .catch(err => {
          console.log('err is', err)
          return err
        })
    })

    //  const client = yelp.client(apiKey)
    //   console.log('about to yelp')

    //   client.search(searchRequest).then(response => {
    //     console.log('in the yelp promise')
    //     const firstResult = response.jsonBody.businesses[0]
    //     const prettyJson = JSON.stringify(firstResult, null, 4)
    //     console.log('prettyJSON', prettyJson)
    //   }).catch(e => {
    //     console.log(e)
    //   })

  }


  onRegionChange(region) {
    console.log('in onRegionChange')
    this.setState({ region })
  }


  render() {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }} >
        <View style={{height: '5%', backgroundColor: 'white'}}><Text>Press Here to Search</Text></View>
          {navigator.geolocation.getCurrentPosition((position) => { console.log('in success', 'latitude', position.coords.latitude, 'longitude', position.coords.longitude) })}
          <MapView
            showsUserLocation = {true}
            followsUserLocation = {true}
            region={this.state.region}
            zoomEnabled = {true}
            mapType="satellite"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/*use markers to find coordinates of all nearby cafes*/}
            <Marker pinColor="yellow" coordinate = {this.state.location} />
          </MapView>
      </View>
    )
  }
}
