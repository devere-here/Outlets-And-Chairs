import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import HomeScreen from '../screens/HomeScreen'
import MapScreen from '../screens/MapScreen'
import AddRatingScreen from '../screens/AddRatingScreen'


const Tabs = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        tabBarLabel: 'HomeScreen',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
          
    },
    MapScreen: {
        screen: MapScreen,
        tabBarLabel: 'MapScreen',
        tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        
    },
    AddRatingScreen: {
        screen: AddRatingScreen,
        tabBarLabel: 'AddRatingScreen',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />        
    }

})

export default Tabs

