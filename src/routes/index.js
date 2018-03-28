import LoginScreen from '../screens/login';
import MainScreen from '../screens/main';
import AuthLoadingScreen from '../screens/AuthLoading';

export const RouteConfigs = {
    Auth: {
        screen: AuthLoadingScreen
    },
    Login: {
        screen: LoginScreen
    },
    Main: {
        screen: MainScreen,
        navigationOptions: {
            gesturesEnabled: false
        }
    },
};

export const StackNavigatorConfig = {
    initialRouteName: 'Auth',
    headerMode: 'none'
};
