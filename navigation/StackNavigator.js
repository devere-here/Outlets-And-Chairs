import { createStackNavigator} from 'react-navigation'
import AddRatingScreen from '../screens/AddRatingScreen'
import MapScreen from '../screens/MapScreen'
import RatingAndReviews from '../screens/RatingAndReviewScreen'

const stackNav = createStackNavigator({
    Map: { screen: MapScreen },
    AddRating: { screen: AddRatingScreen },
    RatingAndReviews: { screen: RatingAndReviews }
})

export default stackNav
