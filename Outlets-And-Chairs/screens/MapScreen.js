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
      cafeInfo: []
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
          cafeInfo = []
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
            //console.log('cafe is', 'ele.name', ele.name, 'ele.opening_hours', ele.opening_hours.weekday_text[1], 'ele.place_id', ele.place_id, 'ele.vicinity', ele.vicinity)
            //console.log('the cafe is this lat is', ele.geometry.location.lat, 'long is ', ele.geometry.location.lng)
            if (ele.opening_hours){
              cafeInfo.push({name: ele.name, id: ele.place_id, isOpen: ele.opening_hours, lat: ele.geometry.location.lat, lng: ele.geometry.location.lng})
            } else {
              console.log('you just lost a cafe make sure you dont lose too many')
            }
            
          })

        this.setState({ region: newRegion, cafeInfo: cafeInfo})

          
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
          {navigator.geolocation.getCurrentPosition((position) => { console.log('in success', 'latitude', position.coords.latitude, 'longitude', position.coords.longitude) })}
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            style={{
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
  }}
          >
          {
            this.state.cafeInfo.length <= 0
              ? null
              : this.state.cafeInfo.map((ele) => {
                //!ele.isOpen ? console.log('problem child', ele) : console.log('all good')
                  //console.log('cafes hours', ele.isOpen.open_now)

                  let markerColor = ele.isOpen ? 'green' : 'red'
                  return (
                    <Marker key={ele.id} pinColor={ele.isOpen ? 'green' : 'red'} coordinate={{ latitude: ele.lat, longitude: ele.lng }} title={ele.name} description={`Is currently ${ele.isOpen ? 'open' : 'closed'}. Number of Outlets: N/A \n Number of Chairs: N/A`} />
                  )
                })
          }
            
          </MapView>
      </View>
    );
  }
}


