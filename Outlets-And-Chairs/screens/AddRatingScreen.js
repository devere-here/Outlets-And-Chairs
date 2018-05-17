import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { H1, Container, Content } from 'native-base'
import Spacer from '../components/Spacer'

export default class AddRating extends React.Component {
  render() {
    console.log('addratingscreen')
    return (
      <Container>
        <Content padder>
          <H1>Add Rating</H1>
        </Content>
      </Container>
    )
  }
}

