import React from 'react'
import { Alert } from 'react-native'
import { db } from '../firebase'
import AddRatingAndReviewUI from '../components/AddRatingAndReviewUI'


export default class AddRating extends React.Component {
  state = {
    overallRating: 0,
    seatingRating: 0,
    outletRating: 0,
    restroomRating: 0,
    review: ''
  }

  sliderAdjustState = (stateVarName, newValue) => {
    this.setState({ [stateVarName]: newValue })
  }

  submitRating = () => {

    let updatedRating
    const { id } = this.props.navigation.state.params,
      cafeRef = db.collection('ratings').doc(id)

    cafeRef.get()
      .then(doc => {
        updatedRating = this.calculateAverageRating(doc.data())
        cafeRef.set(updatedRating, { merge: true })
      })
  }

  calculateAverageRating = (averageRating) => {

    let updatedRating = {},
      keys

    if (averageRating) {

      keys = Object.keys(this.state)

      keys.forEach((field) => {
        if (field !== 'review') {
          updatedRating[field] = (averageRating[field] * averageRating.numberOfRatings + this.state[field]) / (averageRating.numberOfRatings + 1)
          updatedRating[field] = updatedRating[field].toFixed(1)
        }
      })

      updatedRating.numberOfRatings = averageRating.numberOfRatings + 1

    } else {
      updatedRating = this.state
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

    this.submitRating()
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

  handlePress = () => this.handleSubmit()

  handleTextChange = review => this.setState({ review })


  render = () => {

    const keys = Object.keys(this.state).filter(key => key !== 'review'),
      { name } = this.props.navigation.state.params,
      labels = {
        overallRating: 'Overall Rating',
        seatingRating: 'Access to Chairs',
        outletRating: 'Access to Outlets',
        restroomRating: 'Restrooms'
      }

    return (
      <AddRatingAndReviewUI
        keys={keys}
        name={name}
        labels={labels}
        rating={this.state}
        handleTextChange={this.handleTextChange}
        handlePress={this.handlePress}
        sliderAdjustState={this.sliderAdjustState}
      />
    )
  }
}
