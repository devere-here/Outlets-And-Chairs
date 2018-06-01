import { createStackNavigator} from 'react-navigation'
import AddRatingScreen from '../screens/AddRatingScreen'
import MapScreen from '../screens/MapScreen'
import CafeReviewScreen from '../screens/CafeReviewScreen'


const stackNav = createStackNavigator({
    Map: { screen: MapScreen },
    AddRating: { screen: AddRatingScreen },
    CafeReviews: {screen: CafeReviewScreen }
})

export default stackNav
