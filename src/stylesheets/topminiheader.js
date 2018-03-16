import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    wrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    },
    date: {
        fontSize: 8,
        fontWeight: '700',
        color: '#626262'
    },
    title: {
        fontSize: 32,
        color: '#ffffff',
        fontWeight: '800',
    },
    avatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
    }
});

export default styles;
