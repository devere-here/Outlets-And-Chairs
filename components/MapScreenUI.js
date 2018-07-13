import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import MarkerCallout from './MarkerCallout'
import MapView, { Marker, Callout } from 'react-native-maps'

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
    },
    button: {
      backgroundColor: 'blue',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '40%',
      borderRadius: 10,
      marginTop: 10
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      left: '75%',
      marginTop: 17
    }
})


const MapScreenUI = ({region, cafeInfo, updateRegion, navigate, getLocalCafes}) => (
    <View style={styles.container} >
        <MapView
          region={region}
          onRegionChangeComplete={updateRegion}
          showsUserLocation={true}
          style={styles.map}
        >
            {
            cafeInfo.length === 0
                ? null
                : cafeInfo.map((cafe) => (
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
            <TouchableOpacity
                style={styles.button}
                onPress = {() => {
                    const {latitude, longitude } = region
                    getLocalCafes(latitude, longitude)
                }}
            >
                <Text style={styles.buttonText}>Search Here</Text>
            </TouchableOpacity>
        </MapView>
    </View>
)

export default MapScreenUI
