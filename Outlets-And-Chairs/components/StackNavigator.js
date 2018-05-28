import React, { Component } from 'react'
import { createStackNavigator} from 'react-navigation'
import AddRatingScreen from '../screens/AddRatingScreen'
import MapScreen from '../screens/MapScreen'

const stackNav = createStackNavigator({
    Map: { screen: MapScreen },
    AddRating: { screen: AddRatingScreen }
})

export default stackNav
