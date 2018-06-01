import React from 'react'
import { StyleSheet, TextInput, Alert } from 'react-native'
import { H2, Container, Content } from 'native-base'
import { FormLabel, Slider, Button } from 'react-native-elements'
import { db } from '../firebase'

const styles = StyleSheet.create({
  formItems: {
    marginLeft: 20,
    marginRight: 20
  },
  textBoxInput: {
    marginLeft: 20,
    marginRight: 20,
    height: 150
  },
})


export default class AddRating extends React.Component {
  constructor(props){
    super(props)
    this.state = {

      overallRating: 0,
      seatingRating: 0,
      outletRating: 0,
      restroomRating: 0,
      review: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitRating = this.submitRating.bind(this)
    this.submitReview = this.submitReview.bind(this)

  }

  submitRating(newRating){

    let cafeRef = db.collection('ratings').doc(this.props.navigation.state.params.id),
    newAverageRatings = {}

    cafeRef.get()
    .then(doc => {

      let data = doc.data()

      if (data){

        let keys = Object.keys(newRating)

        keys.forEach((field) => {
            if (field !== 'review'){
              newAverageRatings[field] = (data[field] * data.numberOfRatings + newRating[field]) / (data.numberOfRatings + 1)
              newAverageRatings[field] = newAverageRatings[field].toFixed(1)
            }
        })

        newAverageRatings.numberOfRatings = data.numberOfRatings + 1

      } else {
        newAverageRatings = newRating
        newAverageRatings.numberOfRatings = 1
        newAverageRatings.id = this.props.navigation.state.params.id
        newAverageRatings.longitude = this.props.navigation.state.params.longitude
      }

      cafeRef.set(newAverageRatings, { merge: true })

    })

  }

  submitReview(){
    if (this.state.review) {
      let date = new Date()
      console.log('this.state.review', this.state.review, 'date', `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)
      db.collection('reviews').doc(this.props.navigation.state.params.id).collection('reviews')
      .doc()
      .set({review: this.state.review,
            date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`})
    }
  }


  handleSubmit(){

    this.submitRating(this.state)
    this.submitReview()

    Alert.alert(
      'Thank You',
      'We appreciate that you were able to submit a review',
      [
        {text: 'Ok', onPress: () => this.props.navigation.navigate('Map')}
      ],
      { cancelable: false }
    )

  }

  render() {

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
            style={styles.formItems} />
          <FormLabel>Access to Chairs: {this.state.seatingRating}</FormLabel>
          <Slider
            value={this.state.seatingRating}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(seatingRating) => this.setState({seatingRating})}
            style={styles.formItems} />
          <FormLabel>Access to Outlets: {this.state.outletRating}</FormLabel>
          <Slider
            value={this.state.outletRating}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(outletRating) => this.setState({outletRating})}
            style={styles.formItems} />
          <FormLabel>Restrooms: {this.state.restroomRating}</FormLabel>
          <Slider
            value={this.state.restroomRating}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(restroomRating) => this.setState({restroomRating})}
            style={styles.formItems} />
          <FormLabel>Study Space Review:</FormLabel>
          <TextInput
            style={styles.textBoxInput}
            value = {this.state.review}
            multiline={true}
            numberOfLines = {8}
            onChangeText = {(review) => this.setState({review})}      
          />
          <Button
            title="Add Rating"
            style={styles.addRatingButton}
            onPress={() => this.handleSubmit()} />
        </Content>
      </Container>
    )
  }
}
