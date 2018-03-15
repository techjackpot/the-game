import LoginScreen from '../screens/login';
import MainScreen from '../screens/main';

export const RouteConfigs = {
    Login: {
        screen: LoginScreen
    },
    Main: {
        screen: MainScreen,
        navigationOptions: {
            gesturesEnabled: false
        }
    }
};

export const StackNavigatorConfig = {
    initialRouteName: 'Login',
    headerMode: 'none'
};
