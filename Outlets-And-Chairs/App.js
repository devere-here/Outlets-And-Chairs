import React from 'react'
import { StyleSheet, View } from 'react-native'
import TabNav from './config/TabNavigator'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const App = () => (
  <View style={styles.container}>
    <TabNav />
  </View>
)

export default App
