import RNGooglePlaces from 'react-native-google-places';
import MapView, { Marker } from 'react-native-maps';
import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { H1, Container, Content } from 'native-base'
import Spacer from '../components/Spacer'
import { googlePlacesKey } from '../secrets'


export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      cafeLocationsState: []
    };
    this.onRegionChange = this.onRegionChange.bind(this)
    this.openSearchModal = this.openSearchModal.bind(this)
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place);
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
  }


  componentDidMount() {
    console.log('in the componentDidMOunt')
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude,
          longitude = position.coords.longitude,
          cafeLocations = []
      const newRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=cafe&key=${googlePlacesKey}`

      console.log('about to fetch')
      fetch(url)
        .then(res => res.json())
        .then(res => {
          res.results.forEach(ele => {
            console.log('the cafe is this lat is', ele.geometry.location.lat, 'long is ', ele.geometry.location.lng)
            cafeLocations.push({lat: ele.geometry.location.lat, lng: ele.geometry.location.lng})
          })

        this.setState({ region: newRegion, cafeLocationsState: cafeLocations})

          
        })
        .then(err => {
          console.log('err is ', err)
        })
    })
  }


  onRegionChange(region) {
    console.log('in onRegionChange')
    this.setState({ region })
  }


  render() {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }} >
        <View style={{height: '5%', backgroundColor: 'white'}}><Text>Press Here to Search</Text></View>
          {navigator.geolocation.getCurrentPosition((position) => { console.log('in success', 'latitude', position.coords.latitude, 'longitude', position.coords.longitude); })}
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            style={{
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
  }}
          >
          {
            this.state.cafeLocationsState.length <= 0
              ? null
              : this.state.cafeLocationsState.map((ele) => {
                  return (
                    <Marker pinColor="blue" coordinate={{ latitude: ele.lat, longitude: ele.lng }} title="foo title" description="foo description" />
                  )
                })
          }
            
          </MapView>
      </View>
    );
  }
}


