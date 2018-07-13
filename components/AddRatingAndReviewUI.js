import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { H2 } from 'native-base'
import { FormLabel, Button } from 'react-native-elements'
import RatingSlider from '../components/RatingSlider'

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

const AddRatingAndReviewUI = ({keys, name, labels, rating, handleTextChange, handlePress, sliderAdjustState}) => {
    return (
        <View>
            <H2>{name}</H2>
            {
            keys.map(stateVarName => (
                <RatingSlider
                    key={stateVarName}
                    label={labels[stateVarName]}
                    rating={rating[stateVarName]}
                    stateVarName={stateVarName}
                    adjustState={sliderAdjustState}
                />
            ))
            }
            <FormLabel>Study Space Review:</FormLabel>
            <TextInput
                style={styles.textBoxInput}
                value={rating.review}
                multiline={true}
                numberOfLines={8}
                onChangeText={handleTextChange}
            />
            <Button
                title="Add Rating"
                style={styles.addRatingButton}
                onPress={handlePress}
            />
        </View>
    )
}

export default AddRatingAndReviewUI
