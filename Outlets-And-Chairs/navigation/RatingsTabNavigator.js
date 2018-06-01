import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import CafeRating from '../screens/CafeRatingScreen'
import CafeReviews from '../screens/CafeReviewScreen'


const RatingsTabNav = createBottomTabNavigator({
    RatingsScreen: {
        screen: CafeRating,
        tabBarLabel: 'CafeRatingsScreen',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    },
    ReviewScreen: {
        screen: CafeReviews,
        tabBarLabel: 'CafeReviewScreen',
        tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    }
})

export default RatingsTabNav
