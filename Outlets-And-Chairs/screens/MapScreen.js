import MapView, { Marker, Callout } from 'react-native-maps';
import React from 'react'
import { StyleSheet, Image, Text, View, Button } from 'react-native'
import { H3, Container, Content } from 'native-base'
import Spacer from '../components/Spacer'
import { googlePlacesKey } from '../secrets'

import { db } from '../config/firebase'



export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      cafeInfo: [],
      bool: false
    };
    this.onRegionChange = this.onRegionChange.bind(this)
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
    const { navigate } = this.props.navigation
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }} >
        <View style={{height: '5%', backgroundColor: 'white'}}><Text>Press Here to Search</Text></View>
          {navigator.geolocation.getCurrentPosition((position) => { console.log('in success', 'latitude', position.coords.latitude, 'longitude', position.coords.longitude) })}
          <MapView
            region={this.state.region}
            showsUserLocation = {true}
            style={{
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
  }}
          >
          {
            this.state.cafeInfo.length <= 0
              ? null
              : this.state.cafeInfo.map((ele) => {
    
                  return (
                    <Marker key={ele.id} pinColor={ele.isOpen ? 'green' : 'red'} coordinate={{ latitude: ele.lat, longitude: ele.lng }} onPress={() => {
                     console.log('in onPress')
                     console.log('ele.id is', ele.id)
                     db.collection(ele.id).doc('ratings').get()
                     .then(doc => {
                       if (doc.data()){
                         console.log('in the if doc data is', doc.data())
                         ele.currentOverallRating = doc.data().currentOverallRating
                         ele.currentSeating = doc.data().currentSeating
                         ele.currentOutletAccess = doc.data().currentOutletAccess
                         ele.currentRestrooms = doc.data().currentRestrooms
                       } else {
                         console.log('in the else')
                       }
                       this.setState({bool: !this.state.bool})

                     })
                     

                    }} >
                    <Callout>
                      <View>
                        {console.log('in the view ele is', ele)}
                        <H3>{ele.name}</H3>
                        <Text>{ele.isOpen ? 'Open' : 'Closed'}</Text>
                        <Text>Study Space Rating: {ele.currentOverallRating || 'N/A'}</Text>
                        <Text>Number of Outlets: {ele.currentOutletAccess || 'N/A'}</Text>
                        <Text>Number of Chairs: {ele.currentSeating || 'N/A'}</Text>
                        <Button title="Add Review" onPress={() => navigate('AddRating', { id: ele.id, name: ele.name})} />
                      </View>
                    </Callout>
                    </Marker>
                  )
                })
          }
            
          </MapView>
      </View>
    );
  }
}


// on onPress I'd like to open a new screen where the user can fill out a form on the specified cafe
// to do this i need to 
  // create a fnct that opens a new screen
  // pass name and place id to new screen
  // have submission data be entered in firestore
