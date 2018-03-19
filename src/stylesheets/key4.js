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
        minHeight: 160,
        maxHeight: 160,
        paddingBottom: 80,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 12,
    },
    subCaption: {
        color: '#686868',
        fontSize: 14,
        marginBottom: 12,
    },
    image: {
        width: 120,
        height: 120,
    },
    key4AvatarContainer: {
        position: 'absolute',
        width: 140,
        height: 140,
        top: -70,
    },
    key4Avatar: {
        width: 140,
        height: 140,
        backgroundColor: 'transparent',
        borderRadius: 70,
        borderColor: '#404040',
        borderWidth: 3,
        borderStyle: 'solid',
    },
    key4AvatarOffStatus: {
        borderColor: 'transparent',
    },
    key4AvatarImageWrapper: {
        backgroundColor: '#1caceb',
        width: 120,
        minHeight: 120,
        maxHeight: 120,
        borderRadius: 60,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowColor: '#1caceb',
        shadowOffset: { height: 0, width: 0 },
    },
    key4AvatarImageOffStatus: {
        shadowOpacity: 0,
    },
    key4AvatarImage: {
        width: 104,
        height: 104,
        borderRadius: 52,
    },
    middleContainer: {
        backgroundColor: '#1c1c1c',
        paddingTop: 80,
        minHeight: 140,
        maxHeight: 140,
    },
    scoresContainer: {
        marginHorizontal: 8,
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
        height: 40,
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
