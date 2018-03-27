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