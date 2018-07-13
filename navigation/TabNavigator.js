import { createBottomTabNavigator } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import StackNav from './StackNavigator'

const TabNav = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
        }
    },
    MapScreen: {
        screen: StackNav,
        navigationOptions: {
            tabBarLabel: 'Map',
        },
    }
},
{
    tabBarOptions: {
        activeTintColor: 'blue',
        labelStyle: {
            fontSize: 22,
        }
    }
})


export default TabNav

