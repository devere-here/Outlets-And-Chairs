import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Rating } from 'react-native-elements'
import { H1, H2 } from 'native-base'
import { db } from '../firebase'

const styles = StyleSheet.create({
    heading: {
        marginLeft: 15,
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

export default class CafeRating extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        overallRating: '',
        seatingRating: '',
        outletRating: '',
        restroomRating: '',
      }
    }

    componentDidMount(){

        db.collection('ratings').doc(this.props.navigation.state.params.id).get()
        .then(doc => {
            let data = doc.data()
            if (data){
                this.setState(data)
            }
        })
    }

    render(){
        return (
            <View>
                <H1 style={styles.heading}>{this.props.navigation.state.params.name}</H1>
                {!this.state.overallRating
                ? <Text style={styles.heading} >There are currently ratings for this cafe</Text>
                : (
                    <View style={styles.ratingContainer}>
                        <H2>Overall Rating: {this.state.overallRating}</H2>
                        <Rating
                            type="star"
                            startingValue={+this.state.overallRating}
                            readonly={true}
                            imageSize={60}
                            style={styles.starRating}
                        />
                        <H2>Seating Rating: {this.state.seatingRating}</H2>
                        <Rating
                            type="star"
                            startingValue={+this.state.seatingRating}
                            readonly={true}
                            imageSize={60}
                            style={styles.starRating}
                        />
                        <H2>Outlet Rating: {this.state.outletRating}</H2>
                        <Rating
                            type="star"
                            startingValue={+this.state.outletRating}
                            readonly={true}
                            imageSize={60}
                            style={styles.starRating}
                        />
                        <H2>Restroom Rating: {this.state.restroomRating}</H2>
                        <Rating
                            type="star"
                            startingValue={+this.state.restroomRating}
                            readonly={true}
                            imageSize={60}
                            style={styles.starRating}
                        />
                    </View>
                )}
            </View>
        )
    }
}
