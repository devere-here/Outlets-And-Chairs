import MapView, { Marker, Callout } from 'react-native-maps'
import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { H3 } from 'native-base'
import { googlePlacesKey } from '../secrets'
import { db } from '../config/firebase'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }

})

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
    }
  }

  componentDidMount() {
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


      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=cafe&key=${googlePlacesKey}`

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

  render() {
    const { navigate } = this.props.navigation
    return (

      <View style={styles.container} >
        <MapView
          region={this.state.region}
          showsUserLocation = {true}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
        {
          this.state.cafeInfo.length === 0
            ? null
            : this.state.cafeInfo.map((ele) => {

                return (
                  <Marker
                    key={ele.id}
                    pinColor={ele.isOpen ? 'green' : 'red'} 
                    coordinate={{ latitude: ele.lat, longitude: ele.lng }} 
                    onPress={() => {
                      db.collection(ele.id).doc('ratings').get()
                      .then(doc => {
                        if (doc.data()){
                          console.log('in the if doc data is', doc.data())
                          ele.averageOverallRating = doc.data().averageOverallRating
                          ele.averageSeatingRating = doc.data().averageSeatingRating
                          ele.averageOutletRating = doc.data().averageOutletRating
                          ele.averageRestroomRating = doc.data().averageRestroomRating
                        } else {
                          console.log('in the else')
                        }
                        this.setState({bool: !this.state.bool})
                      })
                    }} >
                  <Callout>
                    <View>
                      <H3>{ele.name}</H3>
                      <Text>{ele.isOpen ? 'Open' : 'Closed'}</Text>
                      <Text>Study Space Rating: {ele.averageOverallRating || 'N/A'}</Text>
                      <Text>Outlet Access: {ele.averageOutletRating || 'N/A'}</Text>
                      <Text>Seating Access: {ele.averageSeatingRating || 'N/A'}</Text>
                      <Text>Reastrooms: {ele.averageRestroomRating || 'N/A'}</Text>
                      <Button title="Add Review" onPress={() => navigate('AddRating', { id: ele.id, name: ele.name})} />
                    </View>
                  </Callout>
                  </Marker>
                )
              })
        }
        </MapView>
      </View>
    )
  }
}

