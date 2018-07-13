import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import uuid from 'uuid-js'

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    reviewContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 5,
        padding: 8
    }
})

const CafeReviewsUI = ({ reviews }) => (

    <View style={styles.container}>
        {reviews.length === 0
            ? <Text>There are currently no reviews for this cafe</Text>
            :
            (reviews.map(ele => (
                <View key={uuid.create(4)} style={styles.reviewContainer}>
                    <Text>{ele.date}</Text>
                    <Text>{ele.review}</Text>
                </View>
            )))
        }
    </View>
)

export default CafeReviewsUI
