import React from 'react'
import { Image, Text, StyleSheet } from 'react-native'
import { H1, Container, Content } from 'native-base'

const styles = StyleSheet.create({
    spacing: {
        marginTop: 30,
        marginRight: 'auto',
        marginLeft: 'auto',
        color: 'blue',
    },
    image: {
        marginTop: 30,
        height: 250
    }
})

const Home = () => (
    <Container>
        <Content padder>
            <H1 style={styles.spacing}>Outlets and Chairs</H1>
            <Image style={styles.image} source={{ uri: 'https://drive.google.com/uc?export=download&id=10G2m9FwR13OT4Vcl0DsUJx9YtKmWaXMU' }} />
            <Text style={styles.spacing}>
                Have you ever gone to a coffee shop to do work, but then saw that they
                did not have any availiable chairs or outlets? Chairs and
                Outlets is here to make sure that does not happen again. Find all
                coffee shops near you and see which ones have the most chairs and outlets so you spend less time looking for the perfect work spot and more time actually working.
            </Text>
        </Content>
    </Container>
)

export default Home
