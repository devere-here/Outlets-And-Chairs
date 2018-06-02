import React from 'react'
import { Text, View, Button } from 'react-native'
import { H3 } from 'native-base'

const MarkerCallout = ({ cafe, navigate }) => (
    <View>
        <H3>{cafe.name}</H3>
        <Text>{cafe.isOpen.open_now ? 'Open' : 'Closed'}</Text>
        <Button
            title="Add Rating"
            onPress={() => navigate('AddRating', { id: cafe.id, name: cafe.name})} />
        <Button
            title="See Rating"
            onPress={() => navigate('RatingAndReviews', { id: cafe.id, name: cafe.name })} />
    </View>
)

export default MarkerCallout
