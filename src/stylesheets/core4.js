import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    dateNavigation: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 75,
        minHeight: 75,
        width: '100%',
    },
    dateNavigationSeparator: {
        width: 0.5,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#585858',
    },
    dateOption: {
        color: '#808080',
        fontWeight: 'bold',
        fontSize: 11
    },
    activeDateOption: {
        color: '#1caceb',
    },
    statusPanel: {
        paddingVertical: 12,
        marginTop: 22,
        minHeight: 200,
    },
    scoreBoard: {
        // alignSelf: 'flex-start'
    },
    statusBoard: {
        alignSelf: 'flex-start'
    },
    core4Scores: {
        flex: 0
    },
    addonScores: {},
    addonScoreArea: {},
    addonScoreLabel: {
        backgroundColor: '#000000',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        marginBottom: 12,
    },
    addonScoreLabelText: {
        color: '#3d3d3d',
        fontWeight: '900',
        fontSize: 10,
    },
    scoreText: {
        color: '#ffffff',
        fontWeight: '900',
    },
    totalScore: {
        fontSize: 54,
        lineHeight: 54,
    },
    maxScore: {
        fontSize: 34,
        lineHeight: 34,
        fontWeight: '800',
        alignSelf: 'baseline'
    },
    addonScore: {
        fontSize: 34,
        lineHeight: 34,
    },
    horizontalBar: {
        width: '80%',
        height: 1,
        backgroundColor: '#434343',
        marginTop: 10,
        marginBottom: 16,
    },
    statusLevel: {
        width: '80%',
        height: '100%',
    },
    elitesContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        marginHorizontal: 12,
        marginVertical: 24,
        paddingBottom: 60,
    },
    eliteContainer: {
        width: '48%',
        height: 50,
        marginVertical: 7,
    },
    eliteBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    backgroundWhiteSpace: {
        width: 50,
        height: 50,
        backgroundColor: '#ffffff',
    },
    eliteBackgroudImage: {
        flex: 1,
        height: 50,
    },
    eliteActive: {
        backgroundColor: 'transparent',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#1caceb',
        shadowOffset: { height: 0, width: 0 },
        elevation: 1,
    },
    eliteInactive: {
        backgroundColor: 'rgba(32, 32, 32, 0.9)'
    },
    eliteCategoryContainer: {
        width: '100%',
        alignItems: 'flex-start',
        borderRadius: 8,
        overflow: 'hidden'
    },
    eliteCategory: {
        width: 24,
        height: 24,
        backgroundColor: '#000000',
        borderRadius: 20,
        margin: 13,
    },
    eliteCategoryIcon: {
        width: 12,
        height: 12,
    },

    dudeContainer: {
        width: '100%',
        minHeight: 120,
        maxHeight: 150,
    },
});

export default styles;
