import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import HomeScreen from '../screens/HomeScreen'
import MapScreen from '../screens/MapScreen'
import AddRatingScreen from '../screens/AddRatingScreen'


const Tabs = TabNavigator({
    HomeScreen: {
        screen: HomeScreen,
    },
    MapScreen: {
        screen: MapScreen,
    },
    AddRatingScreen: {
        screen: AddRatingScreen,
    }

})

export default Tabs

