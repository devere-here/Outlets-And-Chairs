import React from 'react'
import { StyleSheet, Image, Text, View, TextInput } from 'react-native'
import { H2, Container, Content } from 'native-base'
import Spacer from '../components/Spacer'
import t from 'tcomb-form-native'
import { FormLabel, FormInput, Slider, Button } from 'react-native-elements'
import { db } from '../config/firebase'

// right now this is a monstrosity

const calculateNewRatings = (state) => {
  let newState = {}

  newState.currentOverallRating = (state.currentOverallRating * state.currentReviewNumber + state.overallRating) / (state.currentReviewNumber + 1)

  newState.currentSeating = (state.currentSeating * state.currentReviewNumber + state.seating) / (state.currentReviewNumber + 1)

  newState.currentOutletAccess = (state.currentOutletAccess * state.currentReviewNumber + state.outletAccess) / (state.currentReviewNumber + 1)

  newState.currentRestrooms = (state.currentRestrooms * state.currentReviewNumber + state.restrooms) / (state.currentReviewNumber + 1)

  newState.currentReviewNumber = state.currentReviewNumber + 1

  return newState

}

export default class AddRating extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      overallRating: 0,
      seating: 0,
      outletAccess: 0,
      restrooms: 0,
      review: '',
      currentReviewNumber: 0,
      currentOverallRating: 0,
      currentSeating: 0,
      currentOutletAccess: 0,
      currentRestrooms: 0
    }
  }

  componentDidMount(){
    db.collection(this.props.navigation.state.params.id).doc('ratings').get()
    .then(doc => {
      console.log('iin compdidmount doc is', doc)
      if (doc.data()){
        console.log('in compDidMount if')
        let data = doc.data()
    
        this.setState({currentReviewNumber: data.currentReviewNumber,
          currentOverallRating: data.currentOverallRating,
          currentSeating: data.currentSeating,
          currentOutletAccess: data.currentOutletAccess,
          currentRestrooms: data.currentRestrooms
        })
      } else {
        console.log('in compDidMount else')
      }

    })
  }

  

  render() {
    console.log('props are', this.props.navigation.state)
    console.log('state is', this.state)
    return (
      <Container>
        <Content padder>
          <H2>{this.props.navigation.state.params.name}</H2>
          <FormLabel>Overall Rating: {this.state.overallRating}</FormLabel>
          <Slider
            value={this.state.overallRating}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(overallRating) => this.setState({overallRating})}
            style={{marginLeft: 20, marginRight: 20 }} />
          <FormLabel>Access to Chairs: {this.state.seating}</FormLabel>
          <Slider
            value={this.state.seating}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(seating) => this.setState({seating})}
            style={{marginLeft: 20, marginRight: 20 }} />
          <FormLabel>Access to Outlets: {this.state.outletAccess}</FormLabel>
          <Slider
            value={this.state.outletAccess}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(outletAccess) => this.setState({outletAccess})}
            style={{marginLeft: 20, marginRight: 20 }} />
          <FormLabel>Restrooms: {this.state.restrooms}</FormLabel>
          <Slider
            value={this.state.restrooms}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(restrooms) => this.setState({restrooms})}
            style={{marginLeft: 20, marginRight: 20 }} />
          <FormLabel>Study Space Review:</FormLabel>
          <TextInput
            multiline={true}
            numberOfLines = {4}
            value = {this.state.review}
            onChangeText = {(review) => this.setState({review})}
            style={{height: 100, marginLeft: 20, marginRight: 20 }}
          />
          <FormInput onChangeText={this.someFunction} />
          <Button title="Add Rating" onPress={() => {
            // check that I have place id --> this.props.navigation.state.params.id
            // bring state to firestore
            // redirect / show a card / empty rating fields
            console.log('in the onPress')
            let currentRatings = calculateNewRatings(this.state)
            let cafeRef = db.collection(this.props.navigation.state.params.id).doc('ratings')


            console.log('currentRatings', currentRatings)

            cafeRef
            .set({
              currentOverallRating: currentRatings.currentOverallRating.toFixed(1),
              currentSeating: currentRatings.currentSeating.toFixed(1),
              currentOutletAccess: currentRatings.currentOutletAccess.toFixed(1),
              currentRestrooms: currentRatings.currentRestrooms.toFixed(1),
              currentReviewNumber: currentRatings.currentReviewNumber
            })


            if (this.state.review) { 
              console.log('in the if')
              cafeRef.collection('reviews').doc()
              .set({review: this.state.review})
            } else {
              console.log('in the else')
            }

   
          }} />
        </Content>
      </Container>
    )
  }
}


// how should i organize the firestore???
//

