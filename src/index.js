import { StackNavigator } from 'react-navigation';
import SigninScreen from './screens/signin';
import MainNavScreen from './screens/mainnav';

const WarriorGame = StackNavigator({
    Signin: {
        screen: SigninScreen
    },
    Main: {
        screen: MainNavScreen,
        navigationOptions: {
            gesturesEnabled: false
        }
    }
}, {
    initialRouteName: 'Signin',
    headerMode: 'none'
});

export default WarriorGame;