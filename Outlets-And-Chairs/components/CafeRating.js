import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Rating } from 'react-native-elements'
import { H1, H2 } from 'native-base'
import { db } from '../firebase'

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
        db.collection('ratings').doc(this.props.id).get()
        .then(doc => {
            let data = doc.data()
            if (data){
                this.setState(data)
            }
        })
    }

    render(){
        const labels = {
                overallRating: 'Overall Rating',
                seatingRating: 'Access to Seating Rating',
                outletRating: 'Access to Outlets Rating',
                restroomRating: 'Restroom Rating',
            },
            keys = Object.keys(labels)

        return (
            <View>
                <H1 style={styles.heading}>{this.props.name}</H1>
                {!this.state.overallRating
                ? <Text style={styles.heading} >There are currently no ratings for this cafe</Text>
                : (
                    <View style={styles.ratingContainer}>
                    {
                        keys.map(stateVarName => (
                            <View key={stateVarName}>
                                <H2>{labels[stateVarName]}: {this.state[stateVarName]}</H2>
                                <Rating
                                    type="star"
                                    startingValue={+this.state[stateVarName]}
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
    }
}
