import { db } from './index'

// adjust overall ratings

export const adjustOverallRatings = (newRating, id, longitude) => {

    let cafeRef = db.collection('ratings').doc(this.props.navigation.state.params.id),
    newAverageRatings = {}

    cafeRef.get()
    .then(doc => {
      let data = doc.data()
      if (data){
        let keys = Object.keys(data)

        newAverageRatings = keys.map((field) => {
            if (field !== 'numberOfRatings'){
                return (data[field] * data.numberOfRatings + newRating[field]) / data.numberOfRatings + 1
            }
        })

        newAverageRatings.numberOfRatings += 1

        // this.setState({numberOfRatings: data.numberOfRatings,
        //   averageOverallRating: data.averageOverallRating,
        //   averageSeatingRating: data.averageSeatingRating,
        //   averageOutletRating: data.averageOutletRating,
        //   averageRestroomRating: data.averageRestroomRating})
      } else {
        newAverageRatings = newRating
        newAverageRatings.numberOfRatings = 1
        newAverageRatings.id = id
        newAverageRatings.longitude = longitude
      }

      cafeRef.set(newAverageRatings)

    })

}
