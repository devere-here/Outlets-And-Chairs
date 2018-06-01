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

const calculateNewAverageRatings = (state) => {
  let newState = {}

  newState.averageOverallRating = (state.averageOverallRating * state.numberOfRatings + state.userOverallRating) / (state.numberOfRatings + 1)

  newState.averageSeatingRating = (state.averageSeatingRating * state.numberOfRatings + state.userSeatingRating) / (state.numberOfRatings + 1)

  newState.averageOutletRating = (state.averageOutletRating * state.numberOfRatings + state.userOutletRating) / (state.numberOfRatings + 1)

  newState.averageRestroomRating = (state.averageRestroomRating * state.numberOfRatings + state.userRestroomRating) / (state.numberOfRatings + 1)

  newState.numberOfRatings = state.numberOfRatings + 1

  return newState

}

export default class AddRating extends React.Component {
  constructor(props){
    super(props)
    this.state = {
     
      userOverallRating: 0,
      userSeatingRating: 0,
      userOutletRating: 0,
      userRestroomRating: 0,
      numberOfRatings: 0,
      //what the user alters
      userReview: '',
      averageOverallRating: 0,
      averageSeatingRating: 0,
      averageOutletRating: 0,
      averageRestroomRating: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitRating = this.submitRating.bind(this)
    this.submitReview = this.submitReview.bind(this)

  }

  submitRating(){
    let newAverageRatings = calculateNewAverageRatings(this.state)
    db.collection('ratings').doc(this.props.navigation.state.params.id)
    .set({
      averageOverallRating: newAverageRatings.averageOverallRating.toFixed(1),
      averageSeatingRating: newAverageRatings.averageSeatingRating.toFixed(1),
      averageOutletRating: newAverageRatings.averageOutletRating.toFixed(1),
      averageRestroomRating: newAverageRatings.averageRestroomRating.toFixed(1),
      numberOfRatings: newAverageRatings.numberOfRatings,
      latitude: this.props.navigation.state.params.latitude,
      longitude: this.props.navigation.state.params.longitude,
      id: this.props.navigation.state.params.id
    })

  }

  submitReview(){
    if (this.state.userReview) {
      let date = new Date()
      console.log('this.state.userReview', this.state.userReview, 'date', `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)
      db.collection('reviews').doc(this.props.navigation.state.params.id).collection('reviews')
      .doc()
      .set({userReview: this.state.userReview,
            date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`})
    }
  }


  handleSubmit(){

    const { navigate } = this.props.navigation

    this.submitRating()
    this.submitReview()

    Alert.alert(
      'Thank You',
      'We appreciate that you were able to submit a review',
      [
        {text: 'Ok', onPress: () => navigate('Map')}
      ],
      { cancelable: false }
    )

  }

  componentDidMount(){
    db.collection('ratings').doc(this.props.navigation.state.params.id).get()
    .then(doc => {
      let data = doc.data()
      if (data){
        this.setState({numberOfRatings: data.numberOfRatings,
          averageOverallRating: data.averageOverallRating,
          averageSeatingRating: data.averageSeatingRating,
          averageOutletRating: data.averageOutletRating,
          averageRestroomRating: data.averageRestroomRating})
      }
    })
  }

  render() {

    return (
      <Container>
        <Content padder>
          <H2>{this.props.navigation.state.params.name}</H2>
          <FormLabel>Overall Rating: {this.state.userOverallRating}</FormLabel>
          <Slider
            value={this.state.userOverallRating}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(userOverallRating) => this.setState({userOverallRating})}
            style={styles.formItems} />
          <FormLabel>Access to Chairs: {this.state.userSeatingRating}</FormLabel>
          <Slider
            value={this.state.userSeatingRating}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(userSeatingRating) => this.setState({userSeatingRating})}
            style={styles.formItems} />
          <FormLabel>Access to Outlets: {this.state.userOutletRating}</FormLabel>
          <Slider
            value={this.state.userOutletRating}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(userOutletRating) => this.setState({userOutletRating})}
            style={styles.formItems} />
          <FormLabel>Restrooms: {this.state.userRestroomRating}</FormLabel>
          <Slider
            value={this.state.userRestroomRating}
            animateTransitions = {true}
            maximumValue = {5}
            step = {0.5}
            onValueChange={(userRestroomRating) => this.setState({userRestroomRating})}
            style={styles.formItems} />
          <FormLabel>Study Space Review:</FormLabel>
          <TextInput
            style={styles.textBoxInput}
            value = {this.state.userReview}
            multiline={true}
            numberOfLines = {8}
            onChangeText = {(userReview) => this.setState({userReview})}      
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
