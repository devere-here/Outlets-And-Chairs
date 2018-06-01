import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import HomeScreen from '../screens/HomeScreen'
import StackNav from './StackNavigator'


const TabNav = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        tabBarLabel: 'HomeScreen',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    },
    MapScreen: {
        screen: StackNav,
        tabBarLabel: 'MapScreen',
        tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    }
})

export default TabNav

