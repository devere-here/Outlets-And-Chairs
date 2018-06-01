import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { H2 } from 'native-base'
import { db } from '../firebase'
import uuid from 'uuid-js'

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20
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

export default class CafeReviews extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            reviews: []
        }
    }

    componentDidMount(){
        let reviews = []
        db.collection('reviews').doc(this.props.navigation.state.params.id).collection('reviews')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                reviews.push(doc.data())
            })
            this.setState({reviews})
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <H2>{this.props.navigation.state.params.name} Reviews</H2>
                {
                    this.state.reviews.length === 0
                    ? <Text>There are currently no reviews for this cafe</Text>
                    : (
                        this.state.reviews.map(ele => {
                            return (
                                <View key={uuid.create(4)} style={styles.reviewContainer}>
                                    <Text>{ele.date}</Text>
                                    <Text>{ele.userReview}</Text>
                                </View>
                            )
                        })
                    )
                }
            </View>
        )
    }
}
