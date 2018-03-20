import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    stackContainer: {
        position: 'relative',
    },
    container: {
        alignItems: 'stretch',
    },
    fieldTrackBar: {
        position: 'absolute',
        left: 17,
        top: 0,
        width: 0.5,
        height: '100%',
        backgroundColor: '#323232',
        zIndex: 98,
    },
    stackPhasesContainer: {
        alignItems: 'stretch',
        marginBottom: 60,
        backgroundColor: '$bgMain',
    },
    withIndicator: {
        paddingBottom: 80,
    },
    phasesContainer: {
        marginVertical: 6,
        alignItems: 'stretch',
        position: 'relative',
        zIndex: 99,
    },
    phaseContainer: {
        marginVertical: 6,
        marginTop: 22,
        alignItems: 'stretch',
    },
    phaseLabel: {
        backgroundColor: '#818181',
        borderRadius: 10,
        alignSelf: 'center',
    },
    phaseLabelText: {
        color: '#000',
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 6,
        fontWeight: '700',
    },
    stepsContainer: {
        alignItems: 'stretch',
        marginVertical: 4,
    },
    stepContainer: {
        alignItems: 'stretch',
        marginVertical: 4,
    },
    fieldsContainer: {
        alignItems: 'stretch',
        marginVertical: 4,
    },
    fieldContainer: {
        position: 'relative',
        alignItems: 'stretch',
        marginVertical: 4,
        paddingHorizontal: 8,
        marginLeft: 32,
        marginRight: 24,
        zIndex: 99,
    },
    fieldTrackPointer: {
        position: 'absolute',
        left: -18,
        top: 7,
        width: 7,
        height: 7,
        backgroundColor: '#fff',
        borderRadius: 12,
        zIndex: 99,
    },
    fieldLabelContainer: {
        alignItems: 'flex-start',
    },
    fieldLabel: {
        color: '#919191',
    },
    fieldLabelContainerBubble: {
        backgroundColor: '#222222',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 32,
        position: 'relative',
    },
    fieldLabelBubble: {
        color: '#858585',
        fontWeight: '900',
        lineHeight: 22,
    },
    fieldLabelBubbleArrow: {
        backgroundColor: '#222222',
        width: 38,
        height: 32,
        position: 'absolute',
        borderBottomRightRadius: 38,
        bottom: 0,
        left: -16,
    },
    fieldLabelBubbleArrowBox: {
        backgroundColor: '$bgMain',
        width: 16,
        height: 32,
        borderBottomRightRadius: 32,
    },
    fieldLabelValueContainer: {
        alignItems: 'flex-start',
        marginTop: 12,
    },
    fieldLabelValueContainerBubble: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 32,
        position: 'relative',
    },
    fieldLabelValueBubble: {
        color: '#000000',
        lineHeight: 22,
    },
    fieldLabelValueBubbleArrow: {
        backgroundColor: '#ffffff',
        width: 38,
        height: 20,
        position: 'absolute',
        borderBottomLeftRadius: 38,
        bottom: 0,
        right: -16,
    },
    fieldLabelValueBubbleArrowBox: {
        backgroundColor: '$bgMain',
        width: 16,
        height: 20,
        alignSelf: 'flex-end',
        borderBottomLeftRadius: 32,
    },
    fieldValueContainer: {
        marginVertical: 8,
    },
    fieldValueSelected: {
        backgroundColor: '#bb0000',
    },
    fieldInputValueContainer: {
    },
    fieldInputValue: {
        borderBottomWidth: 1,
        borderBottomColor: '#2c2c2c',
        color: '#ffffff',
    },
    fieldInputValueBig: {
        fontSize: 32,
        fontWeight: '300',
    },
    fieldSingleValueContainer: {
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    fieldSingleValue: {
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 32,
        marginRight: 10,
        marginBottom: 6,
        minWidth: 52,
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
    },
    fieldSingleValueText: {
        color: '#ffffff',
        fontSize: 7,
        textAlign: 'center',
    },
    fieldSingleValueImage: {
        width: 14,
        height: 14,
    },



    nextButtonContainer: {
        justifyContent: 'space-around',
    },
    nextButton: {
        borderWidth: 2,
        borderColor: '#bb0000',
        borderRadius: 32,
    },
    nextButtonText: {
        color: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 3,
    },


    valueIndicatorContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        zIndex: 101,
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: 46,
        minHeight: 46,
        paddingHorizontal: 8,
    },
    valueIndicator: {
        minHeight: 32,
        maxHeight: 32,
        paddingHorizontal: 8,
        borderColor: '#cdcdcd',
        borderWidth: 1,
        borderRadius: 12,
        marginRight: 12,
    },
    valueIndicatorInput: {
        width: '100%',
        color: '#000000',
    },
    moveToNextFieldButtonContainer: {
        flex: 0,
    },
    moveToNextFieldButton: {
        backgroundColor: '#222222',
        minHeight: 32,
        maxHeight: 32,
        minWidth: 32,
        maxWidth: 32,
        borderRadius: 16,
    },
    moveToNextFieldButtonText: {
        color: '#ffffff',
        fontSize: 8,
        fontWeight: '900',
    }
});

export default styles;
