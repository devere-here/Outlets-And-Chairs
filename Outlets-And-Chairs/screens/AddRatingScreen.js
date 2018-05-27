import React from 'react'
import { StyleSheet, Image, Text, View, TextInput } from 'react-native'
import { H2, Container, Content } from 'native-base'
import Spacer from '../components/Spacer'
import t from 'tcomb-form-native'
import { FormLabel, FormInput, FormValidationMessage, Slider, CheckBox, Button } from 'react-native-elements'


const Cafe = t.struct({
  rating: t.Number,
  outlets: t.Number,
  chairs: t.Number,
  comments: t.Boolean
})

export default class AddRating extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      overallRating: 0,
      seating: 0,
      outletAccess: 0,
      restrooms: false,
      review: ''
    }
    this.someFunction = this.someFunction.bind(this)
  }

  someFunction(evt){

    console.log('target is', evt.target)

  }

  render() {
    console.log('props are', this.props.navigation.state)
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
          <CheckBox
            title="Are there bathrooms?"
            checked={this.state.restrooms}
            style = {{backgroundColor: 'gray'}}
            onPress={() => this.setState({restrooms: !this.state.restrooms})}
          />
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
            // check that I have place id
            // bring state to firestore
            // redirect / show a card / empty rating fields
          }}/>
        </Content>
      </Container>
    )
  }
}

