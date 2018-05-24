import React from 'react'
import { StyleSheet, Image, View, Button } from 'react-native'
import { H1, Container, Content, Text } from 'native-base'
import Spacer from './components/Spacer'
import Tabs from './config/router'
import nodejs from 'nodejs-mobile-react-native'


export default class App extends React.Component {

  // componentWillMount()
  // {
  //   nodejs.start('main.js')
  //   nodejs.channel.addListener(
  //     'message',
  //     (msg) => {
  //       alert('From node: ' + msg)
  //     },
  //     this
  //   )
  // }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Message Node"
          onPress={() => nodejs.channel.send('A message!')}
        />
        <Tabs />
      {/*<Container style={styles.container} >
        <Content padder>
          <Spacer size={25} />
          <H1>Outlets and Chairs</H1>
          <Spacer size={10} />
          <Image style={{ height: 250 }} source={{ uri: 'https://drive.google.com/uc?export=download&id=10G2m9FwR13OT4Vcl0DsUJx9YtKmWaXMU' }} />
          <Spacer size={20} />
          <Text>
            Have you ever gone to a coffee shop to do work, but then saw that they
            did not have any availiable chairs or outlets? Chairs and
            Outlets is here to make sure that does not happen again. Find all
            coffee shops near you and see which ones have the most chairs and outlets so you spend less time looking for the perfect work spot and more time actually working.
    </Text>*/}

          {/*
        </Content>
      </Container>
          */}

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
