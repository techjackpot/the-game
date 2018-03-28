import EStyleSheet from 'react-native-extended-stylesheet';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    devBackground: {
        backgroundColor: '#bb0000'
    },
    flexColumn: {
        flexDirection: 'column',
    },
    flexRow: {
        flexDirection: 'row',
    },
    mainContainer: {
    	flex: 1,
    	backgroundColor: '$bgMain',
    },
    gameContainer: {
    	backgroundColor: '$bgMain',
        flexWrap: 'nowrap',
    },
    topNavContainer: {
    	maxHeight: 80,
        ...ifIphoneX({
            marginTop: 44,
        }, {
            marginTop: 0,
        })
    },
    loadingContainer: {
    	position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
    },
    core4Container: {
    },
    key4Container: {
    },
    stackContainer: {
        alignItems: 'stretch',
    }
});

export default styles;