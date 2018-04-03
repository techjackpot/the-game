import EStyleSheet from 'react-native-extended-stylesheet';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {
    Platform,
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
        height: 0,
    },
    topBarLabel: {
        fontSize: 9,
        marginTop: Platform.OS === 'android' ? 7 : 0,
    },
    activeTabBarLabel: {
        textDecorationLine: 'underline',
        fontSize: 11,
        color: '#1fb9fc',
    },
    topBar: {
        backgroundColor: '#0c0c0c',
        height: 40,
        paddingHorizontal: 20,
        ...ifIphoneX({
            paddingTop: 34,
        }, {
            paddingTop: 0,
        })
    },
    bottomIcon: {
        width: 25,
        height: 25,
    },
    gameIconContainer: {
        borderColor: '#1fb9fc',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 25,
        width: 45,
        height: 45,
        minHeight: 45,
        maxHeight: 45,
    }
});

export default styles;
