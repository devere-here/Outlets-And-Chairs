import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FormLabel, Slider } from 'react-native-elements'

const styles = StyleSheet.create({
    formItems: {
      marginLeft: 20,
      marginRight: 20
    }
})

const RatingSlider = ({ label, rating, stateVarName, adjustState }) => (
    <View>
        <FormLabel>{label}: {rating}</FormLabel>
        <Slider
            value={rating}
            animateTransitions={true}
            maximumValue={5}
            step={0.5}
            onValueChange={(value) => adjustState(stateVarName, value)}
            style={styles.formItems}
        />
    </View>
)

export default RatingSlider
