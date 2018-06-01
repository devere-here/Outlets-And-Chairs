import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Rating } from 'react-native-elements'
import { H1, H2} from 'native-base'
import { db } from '../firebase'

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
                <H1>{this.props.navigation.state.params.name}</H1>
                {!this.state.overallRating
                ? <Text>There are currently ratings for this cafe</Text>
                : (
                    <View>
                        <H2>Overall Rating: {this.state.overallRating}</H2>
                        <Rating
                            showRating
                            type="star"
                            fractions={1}
                            startingValue={+this.state.overallRating}
                            readonly={true}
                            imageSize={40}
                            ratingBackgroundColor="grey"
                            showReadOnlyText={false}
                            style={{ paddingVertical: 10 }}
                        />
                        <H2>Seating Rating: {this.state.seatingRating}</H2>
                        <Rating
                            showRating
                            type="star"
                            fractions={1}
                            startingValue={+this.state.seatingRating}
                            readonly={true}
                            imageSize={40}
                            ratingBackgroundColor="grey"
                            showReadOnlyText={false}
                            style={{ paddingVertical: 10 }}
                        />
                        <H2>Outlet Rating: {this.state.outletRating}</H2>
                        <Rating
                            showRating
                            type="star"
                            fractions={1}
                            startingValue={+this.state.outletRating}
                            readonly={true}
                            imageSize={40}
                            ratingBackgroundColor="grey"
                            showReadOnlyText={false}
                            style={{ paddingVertical: 10 }}
                        />
                        <H2>Restroom Rating: {this.state.restroomRating}</H2>
                        <Rating
                            showRating
                            type="star"
                            fractions={1}
                            startingValue={+this.state.restroomRating}
                            readonly={true}
                            imageSize={40}
                            ratingBackgroundColor="grey"
                            showReadOnlyText={false}
                            style={{ paddingVertical: 10 }}
                        />
                    </View>

                )}
                
            </View>
        )
    }
}
