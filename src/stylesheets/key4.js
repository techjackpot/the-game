import {
    Platform,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    weekNavigatorContainer: {
        flex: 1,
        maxHeight: 32,
    },
    weekText: {
        fontWeight: '700',
        color: '#323232',
        fontSize: 9,
    },
    weekLabel: {
        marginHorizontal: 10,
    },
    weekNavButton: {
        fontSize: 18,
        lineHeight: 18,
    },
    key4statesContainer: {
        alignSelf: 'stretch',
        marginHorizontal: 3,
        backgroundColor: '#292929',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    topContainer: {
        minHeight: 130,
        maxHeight: 130,
        justifyContent: 'flex-start',
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 6,
        marginBottom: 3,
    },
    subCaption: {
        color: '#686868',
        fontSize: 14,
    },
    image: {
        width: 110,
        height: 110,
    },
    key4AvatarContainer: {
        position: 'absolute',
        width: 130,
        height: 130,
        top: 65,
        left: 'auto',
        right: 'auto',
        zIndex: 99,
    },
    key4Avatar: {
        width: 130,
        height: 130,
        backgroundColor: 'transparent',
        borderRadius: 65,
        borderColor: '#404040',
        borderWidth: 3,
        borderStyle: 'solid',
    },
    key4AvatarOnBorder: {
        ...Platform.OS === 'android' ? {
            borderColor: 'rgba(42, 173, 232, 0.5)',
            backgroundColor: 'rgba(42, 173, 232, 0.2)',
        } : {}
    },
    key4AvatarOffStatus: {
        borderColor: 'transparent',
    },
    key4AvatarImageWrapper: {
        backgroundColor: '#1caceb',
        width: 110,
        minHeight: 110,
        maxHeight: 110,
        borderRadius: 55,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowColor: '#1caceb',
        shadowOffset: { height: 0, width: 0 },
        elevation: 2,
    },
    key4AvatarImageOffStatus: {
        shadowOpacity: 0,
    },
    key4AvatarImage: {
        width: 94,
        height: 94,
        borderRadius: 47,
    },
    middleContainer: {
        backgroundColor: '#1c1c1c',
        minHeight: 130,
        maxHeight: 130,
    },
    scoresContainer: {
        marginHorizontal: 8,
        marginBottom: 6,
        alignItems: 'flex-end',
    },
    scoreWidget: {},
    limitScoreText: {
        flex: 0,
    },
    scoreText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '900',
    },
    maxScoreLabel: {
        fontSize: 11,
        alignSelf: 'baseline',
    },
    scoreLabelText: {
        color: '#747474',
        fontSize: 12,
        marginVertical: 3,
    },
    key4ItemsWrapper: {
    },
    key4ItemsContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingBottom: 60,
    },
    key4Item: {
        width: '100%',
        height: 90,
        marginBottom: 2,
    },
    keyImage: {
        width: 22,
        height: 35,
        marginLeft: 18,
    },
    keyInfo: {
        alignItems: 'flex-start',
        marginLeft: 18,
    },
    keyTitle: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 4,
    },
    keyLabel: {
        fontSize: 13,
        color: '#505050',
    },
    keyDone: {
        position: 'absolute',
        height: 90,
        width: '100%',
    }
});

export default styles;
