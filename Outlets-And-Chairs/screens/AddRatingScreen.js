import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { H1, Container, Content } from 'native-base'
import Spacer from '../components/Spacer'
import t from 'tcomb-form-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


const Cafe = t.struct({
  rating: t.Number,
  outlets: t.Number,
  chairs: t.Number,
  comments: t.Boolean
});

export default class AddRating extends React.Component {
  someFunction(){
    console.log('somefunction')
  }
  render() {
    console.log('addratingscreen')
    return (
      <Container>
        <Content padder>
          <H1>Add Rating</H1>
          <FormLabel>Rating:</FormLabel>
          <FormInput onChange={this.someFunction} />
          <FormLabel>Number of Chairs:</FormLabel>
          <FormInput onChange={this.someFunction} />
          <FormLabel>Number of Outlets:</FormLabel>
          <FormInput onChange={this.someFunction} />
        </Content>
      </Container>
    )
  }
}

