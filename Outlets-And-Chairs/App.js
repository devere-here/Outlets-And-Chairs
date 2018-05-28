import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { H1, Container, Content, Text } from 'native-base'
import Spacer from './components/Spacer'
import TabNav from './config/TabNavigator'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TabNav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
