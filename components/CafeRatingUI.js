import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Rating } from 'react-native-elements'
import { H1, H2 } from 'native-base'

const styles = StyleSheet.create({
    heading: {
        marginLeft: 20,
        marginTop: 15
    },
    ratingContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 15,
        padding: 12
    },
    starRating: {
        paddingVertical: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})


const CafeRatingUI = ({ name, rating, keys, labels }) => (

    <View>
        <H1 style={styles.heading}>{name}</H1>
        {!rating.overallRating
        ? <Text style={styles.heading} >There are currently no ratings for this cafe</Text>
        : (
            <View style={styles.ratingContainer}>
            {
                keys.map(stateVarName => (
                    <View key={stateVarName}>
                        <H2>{labels[stateVarName]}: {rating[stateVarName]}</H2>
                        <Rating
                            type="star"
                            startingValue={+rating[stateVarName]}
                            readonly={true}
                            imageSize={60}
                            style={styles.starRating}
                        />
                    </View>
                ))
            }
            </View>
        )}
    </View>
)


export default CafeRatingUI
