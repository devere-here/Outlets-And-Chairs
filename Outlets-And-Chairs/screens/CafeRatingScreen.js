import React from 'react'
import { StyleSheet, View } from 'react-native'
import { H1, H2} from 'native-base'
import { db } from '../firebase'

export default class CafeRating extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        overallRating: 'N/A',
        seatingRating: 'N/A',
        outletRating: 'N/A',
        restroomRating: 'N/A',
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
                <H2>Overall Rating: {this.state.overallRating}</H2>
                <H2>Seating Rating: {this.state.seatingRating}</H2>
                <H2>Outlet Rating: {this.state.outletRating}</H2>
                <H2>Restroom Rating: {this.state.restroomRating}</H2>
            </View>
        )
    }
}
