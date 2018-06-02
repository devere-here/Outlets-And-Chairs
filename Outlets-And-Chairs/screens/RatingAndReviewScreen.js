import React from 'react'
import { View } from 'react-native'
import CafeRating from '../components/CafeRating'
import CafeReviews from '../components/CafeReviews'

const RatingAndReviews = (props) => {
    const { id, name } = props.navigation.state.params
    return (
        <View>
            <CafeRating id={id} name={name} />
            <CafeReviews id={id} name={name} />
        </View>
    )
}

export default RatingAndReviews
