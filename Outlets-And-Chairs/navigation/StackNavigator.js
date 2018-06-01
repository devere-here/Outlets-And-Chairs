import { createStackNavigator} from 'react-navigation'
import AddRatingScreen from '../screens/AddRatingScreen'
import MapScreen from '../screens/MapScreen'
import CafeRating from '../screens/CafeRatingScreen'
import CafeReviews from '../screens/CafeReviewScreen'

const stackNav = createStackNavigator({
    Map: { screen: MapScreen },
    AddRating: { screen: AddRatingScreen },
    CafeRating: { screen: CafeRating },
    CafeReviews: { screen: CafeReviews }
})

export default stackNav
