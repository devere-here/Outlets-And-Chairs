import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import HomeScreen from '../screens/HomeScreen'
import StackNav from './StackNavigator'


const TabNav = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: () => <Icon name="list" size={35} color="blue" />
        }
    },
    MapScreen: {
        screen: StackNav,
        navigationOptions: {
            tabBarLabel: 'Map Screen',
            tabBarIcon: () => <Icon name="map" size={35} color="blue" />
        }
    }
})

export default TabNav

