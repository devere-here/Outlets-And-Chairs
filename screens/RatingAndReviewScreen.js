import React from 'react'
import { ScrollView } from 'react-native'
import CafeRating from '../components/CafeRating'
import CafeReviews from '../components/CafeReviews'

const RatingAndReviews = (props) => {
    const { id, name } = props.navigation.state.params
    return (
        <ScrollView>
            <CafeRating id={id} name={name} />
            <CafeReviews id={id} name={name} />
        </ScrollView>
    )
}

export default RatingAndReviews
