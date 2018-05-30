import React from 'react'
import { StyleSheet, TextInput, Text, View } from 'react-native'
import { H2, Container, Content } from 'native-base'
import { FormLabel, Slider, Button } from 'react-native-elements'
import { db } from '../config/firebase'

export default class CafeReviews extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            reviews: []
        }
        console.log('in cafereviews screen')
    }

    componentDidMount(){
        console.log('in component did mount')
        let reviews = []
        db.collection('reviews').doc(this.props.navigation.state.params.id).collection('reviews')
        .get()
        .then(snapshot => {
            console.log('in the then')
            snapshot.forEach(doc => {
                console.log('doc.data()', doc.data())
                reviews.push(doc.data())

            })
            this.setState({reviews})

        })
    }

    render(){
        return (
            <View>
                <Text>Words are great</Text>
                {this.state.reviews.map(ele => {
                    return (
                        <Text>ele.date {ele.date} ele.userReview {ele.userReview}</Text>
                    )

                })}
            </View>


        )
    }


}