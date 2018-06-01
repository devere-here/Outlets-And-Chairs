import MapView, { Marker, Callout } from 'react-native-maps'
import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { H3 } from 'native-base'
import { googlePlacesKey } from '../secrets'
import { db } from '../firebase'

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
      idArr: [],
    }
    this.getLocalCafes = this.getLocalCafes.bind(this)
    this.getCafeRatings = this.getCafeRatings.bind(this)
  }

  componentDidMount(){
    this.getLocalCafes()
    this.getCafeRatings()
  }

  getCafeRatings(){

    db.collection('ratings')
      .where('longitude', '>=', +this.state.region.longitude - 1)
      .where('longitude', '<=', +this.state.region.longitude + 1)
    .get()
    .then(snapshot => {
      // creates a shallow copy of cafeInfo
      console.log('did it work')
      let newCafeInfoArr = this.state.cafeInfo.slice(0)
      console.log('cafe info', this.state.cafeInfo)
      console.log('idArr is', this.state.idArr)
      snapshot.forEach(doc => {
        // checks to see if snapshot id is in idxArr
        // since I added data to idxArr and cafeInfo at the same time
        // if the id is in idxArr then that cafe's data is in cafeInfo
        let idx = this.state.idArr.indexOf(doc.data().id)
        console.log('doc.data().id', doc.data().id)
        if (idx !== -1){
          let combinedObj = Object.assign(doc.data(), newCafeInfoArr[idx])
          newCafeInfoArr[idx] = combinedObj
          console.log('our new object is', combinedObj)
        }

      })
      // after altering our shallow copy of cafeInfo we set that copy to be our new cafeInfo
      console.log('newCafeInfoArr', newCafeInfoArr)
      this.setState({cafeInfo: newCafeInfoArr})
      console.log('set state is finished')

    })

  }

  getLocalCafes() {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude,
          longitude = position.coords.longitude,
          cafeInfo = [],
          idArr = []

      const newRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },
        url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=cafe&key=${googlePlacesKey}`

      fetch(url)
        .then(res => res.json())
        .then(res => {
          res.results.forEach(ele => {

            if (ele.opening_hours){
              cafeInfo.push({name: ele.name, id: ele.place_id, isOpen: ele.opening_hours, lat: ele.geometry.location.lat, lng: ele.geometry.location.lng})
              idArr.push(ele.place_id)
            } else {
              console.log('you just lost a cafe make sure you dont lose too many')
            }

          })

        this.setState({ region: newRegion, cafeInfo, idArr})

        })
        .then(err => {
          console.log('err is ', err)
        })
    })
  }

  render() {
    console.log('in the mapScreen render')
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
                    pinColor={ele.isOpen.open_now ? 'green' : 'red'}
                    coordinate={{ latitude: ele.lat, longitude: ele.lng }}
                    onPress={() => {
                      db.collection('ratings').doc(ele.id).get()
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
                      })
                    }} >
                    <Callout>
                      <View>
                        <H3>{ele.name}</H3>
                        <Text>{ele.isOpen.open_now ? 'Open' : 'Closed'}</Text>
                        <Text>Study Space Rating: {ele.averageOverallRating || 'N/A'}</Text>
                        <Text>Outlet Access: {ele.averageOutletRating || 'N/A'}</Text>
                        <Text>Seating Access: {ele.averageSeatingRating || 'N/A'}</Text>
                        <Text>Reastrooms: {ele.averageRestroomRating || 'N/A'}</Text>
                        <Button title="Add Rating" onPress={() => navigate('AddRating', { id: ele.id, name: ele.name, latitude: ele.lat, longitude: ele.lng})} />
                        <Button title="See Reviews" onPress={() => navigate('CafeReviews', { id: ele.id })} />
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

