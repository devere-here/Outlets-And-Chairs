import React from 'react'
import { View, StyleSheet, TextInput, Alert } from 'react-native'
import { H2 } from 'native-base'
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
  constructor(props) {
    super(props)
    this.state = {
      overallRating: 0,
      seatingRating: 0,
      outletRating: 0,
      restroomRating: 0,
      review: ''
    }
  }

  submitRating = (newRating) => {

    let updatedRating
    const { id } = this.props.navigation.state.params,
      cafeRef = db.collection('ratings').doc(id)

    cafeRef.get()
      .then(doc => {
        updatedRating = this.calculateAverageRating(doc.data(), newRating)
        cafeRef.set(updatedRating, { merge: true })
      })
  }

  calculateAverageRating = (newRating, averageRating) => {

    let updatedRating = {},
      keys

    if (averageRating) {

      keys = Object.keys(newRating)

      keys.forEach((field) => {
        if (field !== 'review') {
          updatedRating[field] = (averageRating[field] * averageRating.numberOfRatings + newRating[field]) / (averageRating.numberOfRatings + 1)
          updatedRating[field] = updatedRating[field].toFixed(1)
        }
      })

      updatedRating.numberOfRatings = averageRating.numberOfRatings + 1

    } else {
      updatedRating = newRating
      updatedRating.numberOfRatings = 1
      updatedRating.id = this.props.navigation.state.params.id
    }

    return updatedRating
  }


  submitReview = () => {

    let date,
      { id } = this.props.navigation.state.params

    if (this.state.review) {
      date = new Date()
      db.collection('reviews').doc(id).collection('reviews')
        .doc()
        .set({
          review: this.state.review,
          date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        })
    }
  }


  handleSubmit = () => {

    const { navigate } = this.props.navigation

    this.submitRating(this.state)
    this.submitReview()

    Alert.alert(
      'Success',
      'Thank you for your review!',
      [{
          text: 'Ok', onPress: () => {
            navigate('Map')
          }
      }],
      { cancelable: false }
    )
  }


  render = () => {
    return (
      <View>
        <H2>{this.props.navigation.state.params.name}</H2>
        <FormLabel>Overall Rating: {this.state.overallRating}</FormLabel>
        <Slider
          value={this.state.overallRating}
          animateTransitions={true}
          maximumValue={5}
          step={0.5}
          onValueChange={(overallRating) => this.setState({ overallRating })}
          style={styles.formItems} />
        <FormLabel>Access to Chairs: {this.state.seatingRating}</FormLabel>
        <Slider
          value={this.state.seatingRating}
          animateTransitions={true}
          maximumValue={5}
          step={0.5}
          onValueChange={(seatingRating) => this.setState({ seatingRating })}
          style={styles.formItems} />
        <FormLabel>Access to Outlets: {this.state.outletRating}</FormLabel>
        <Slider
          value={this.state.outletRating}
          animateTransitions={true}
          maximumValue={5}
          step={0.5}
          onValueChange={(outletRating) => this.setState({ outletRating })}
          style={styles.formItems} />
        <FormLabel>Restrooms: {this.state.restroomRating}</FormLabel>
        <Slider
          value={this.state.restroomRating}
          animateTransitions={true}
          maximumValue={5}
          step={0.5}
          onValueChange={(restroomRating) => this.setState({ restroomRating })}
          style={styles.formItems} />
        <FormLabel>Study Space Review:</FormLabel>
        <TextInput
          style={styles.textBoxInput}
          value={this.state.review}
          multiline={true}
          numberOfLines={8}
          onChangeText={(review) => this.setState({ review })}
        />
        <Button
          title="Add Rating"
          style={styles.addRatingButton}
          onPress={() => this.handleSubmit()} />
      </View>
    )
  }
}
