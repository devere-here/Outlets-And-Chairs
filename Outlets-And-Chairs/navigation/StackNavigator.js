import { createStackNavigator} from 'react-navigation'
import AddRatingScreen from '../screens/AddRatingScreen'
import MapScreen from '../screens/MapScreen'
import CafeReviewScreen from '../screens/CafeReviewScreen'
import RatingsTabNav from './RatingsTabNavigator'


const stackNav = createStackNavigator({
    Map: { screen: MapScreen },
    AddRating: { screen: AddRatingScreen },
    RatingsAndReviews: { screen: RatingsTabNav }
})

export default stackNav
