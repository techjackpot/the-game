import EStyleSheet from 'react-native-extended-stylesheet';
import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    gameIconContainer: {
        borderColor: '#1fb9fc',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 45,
        width: 45,
        minHeight: 45,
        maxHeight: 45,
    }
});

export default styles;
