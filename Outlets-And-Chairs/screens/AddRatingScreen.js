import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { H2, Container, Content } from 'native-base'
import { FormLabel, Slider, Button } from 'react-native-elements'
import { db } from '../config/firebase'

const styles = StyleSheet.create({
  formItems: {
    marginLeft: 20,
    marginRight: 20
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
      userReview: '',
      numberOfRatings: 0,
      averageOverallRating: 0,
      averageSeatingRating: 0,
      averageOutletRating: 0,
      averageRestroomRating: 0
    }
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
            multiline={true}
            numberOfLines = {4}
            value = {this.state.userReview}
            onChangeText = {(userReview) => this.setState({userReview})}
            style={styles.formItems}
          />
          <Button title="Add Rating" onPress={() => {
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

            if (this.state.userReview) {
              let date = new Date()
              console.log('this.state.userReview', this.state.userReview, 'date', `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)
              db.collection('reviews').doc(this.props.navigation.state.params.id).collection('reviews')
              .doc()
              .set({userReview: this.state.userReview,
                    date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`})
            }

          }} />
        </Content>
      </Container>
    )
  }
}
