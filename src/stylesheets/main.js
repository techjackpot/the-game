import EStyleSheet from 'react-native-extended-stylesheet';
import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bb0000'
    },
    icon: {
        width: 26,
        height: 26,
    },
    topBarTab: {
        justifyContent: 'center',
    },
    topBarIndicator: {
    },
    topBarLabel: {
        fontSize: 9,
    },
    activeTabBarLabel: {
        textDecorationLine: 'underline',
    },
    topBar: {
        backgroundColor: '#0c0c0c',
        height: 40,
        paddingHorizontal: 20,
    },
    bottomIcon: {
        width: 30,
        height: 30,
    }
});

export default styles;
