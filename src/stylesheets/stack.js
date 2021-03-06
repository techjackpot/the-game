import EStyleSheet from 'react-native-extended-stylesheet';
import {Platform} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

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
    withKeyboard: {
        ...(Platform.OS !== 'android' ? {
            marginBottom: 235,
        } : {})
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
        fontSize: 9,
        fontWeight: '700',
        fontFamily: 'Helvetica',
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
    leftAligned: {
        alignItems: 'flex-start',
    },
    rightAligned: {
        alignItems: 'flex-end',
    },
    fieldTrackPointer: {
        position: 'absolute',
        left: -18,
        top: 7,
        width: 7,
        height: 7,
        backgroundColor: '#fff',
        borderRadius: 12,
        zIndex: 199,
    },
    fieldLabelContainer: {
        alignItems: 'flex-start',
    },
    fieldLabel: {
        color: '#919191',
        fontFamily: 'Helvetica',
    },
    fieldBubbleContent: {
        marginVertical: 5,
    },
    fieldLabelContainerBubble: {
        backgroundColor: '#222222',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 32,
        position: 'relative',
        alignSelf: 'flex-start',
    },
    fieldLabelBubble: {
        color: '#858585',
        fontWeight: '900',
        lineHeight: 22,
        fontFamily: 'Helvetica',
    },
    fieldLabelBubbleArrow: {
        backgroundColor: '#222222',
        width: 38,
        height: 24,
        position: 'absolute',
        borderBottomRightRadius: 38,
        bottom: 0,
        left: -16,
    },
    fieldLabelBubbleArrowBox: {
        backgroundColor: '$bgMain',
        width: 16,
        height: 24,
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
        alignSelf: 'flex-end',
    },
    fieldLabelValueBubble: {
        color: '#000000',
        lineHeight: 22,
        fontSize: 12,
        fontFamily: 'Helvetica',
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
    fieldBubbleValueText: {
        fontFamily: 'Helvetica',
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
        paddingVertical: 3,
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    fieldSingleValueText: {
        color: '#ffffff',
        fontSize: 10,
        textAlign: 'center',
        fontFamily: 'Helvetica',
    },
    fieldSingleValueImage: {
        width: 16,
        height: 16,
    },
    fieldShiftImageLabelContainer: {
        marginVertical: 4,
    },
    fieldShiftImage: {
        width: 42,
        height: 42,
        marginRight: 8,
    },
    fieldChoiceValueContainer: {
        justifyContent: 'flex-start',
    },
    fieldChoiceValue: {
        borderWidth: 2,
        borderColor: '#ffffff',
        backgroundColor: 'transparent',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 16,
        alignItems: 'center',
        marginVertical: 6,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
    },
    fieldChoiceValueText: {
        color: '#ffffff',
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Helvetica',
    },
    fieldChoiceValueImage: {
        width: 48,
        height: 48,
        marginRight: 12,
    },
    fieldChoiceValueSelected: {
        borderColor: '#bb0000',
    },
    fieldPathValueContainer: {
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    fieldPathLevelValue: {
        width: '44%',
        borderColor: '#ffffff',
        borderWidth: 2,
        marginHorizontal: 5,
        marginVertical: 5,
        paddingTop: 10,
    },
    fieldPathLevelValueSelected: {
        borderColor: '#bb0000',
    },
    fieldPathLevelText: {
        color: '#ffffff',
        fontWeight: '900',
        textAlign: 'center',
        marginVertical: 5,
        fontFamily: 'Helvetica',
    },
    fieldPathLevelValueImage: {
        width: '100%',
        height: 120,
        marginVertical: 10,
    },
    fieldPathLevelValueIcon: {
        width: 24,
        height: 24,
        marginRight: 6,
    },
    fieldPathLevelNameContainer: {
        backgroundColor: '#212121',
        alignItems: 'center',
        maxHeight: 30,
    },
    fieldPathLevelNameContainerSelected: {
        backgroundColor: '#bb0000',
    },
    fieldPathLevelName: {
        color: '#ffffff',
        fontSize: 9,
        fontFamily: 'Helvetica',
    },
    fieldPathLevelNameSelected: {},


    nextButtonContainer: {
        justifyContent: 'space-around',
        marginBottom: 24,
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
        fontFamily: 'Helvetica',
    },

    addMoreActionButtonContainer: {
        justifyContent: 'space-around',
        marginTop: 16,
    },
    addMoreActionButton: {
        borderWidth: 2,
        borderColor: '#bb0000',
        borderRadius: 32,
    },
    addMoreActionButtonText: {
        color: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 3,
        fontFamily: 'Helvetica',
    },


    valueIndicatorContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        zIndex: 101,
        ...ifIphoneX({
            bottom: 55,
        }, {
            bottom: 0,
        }),
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
        alignItems: 'center',
    },
    valueIndicatorInput: {
        width: '100%',
        color: '#000000',
        paddingVertical: 5,
        textAlignVertical: 'top',
    },
    valueIndicatorInputBoolean: {
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 32,
        marginHorizontal: 12,
        minWidth: 52,
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
    },
    valueIndicatorInputBooleanSelected: {
        borderColor: '#bb0000',
    },
    valueIndicatorInputBooleanText: {
        color: '#000000',
        fontSize: 10,
        textAlign: 'center',
        fontFamily: 'Helvetica',
    },
    valueIndicatorInputBooleanTextSelected: {
        color: '#bb0000',
        fontFamily: 'Helvetica',
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
        fontFamily: 'Helvetica',
    },

    typingLabel: {
        width: 150,
        height: 40,
        backgroundColor: 'transparent',
    },

    overallProgressView: {
        marginBottom: 7,
    },
});

export default styles;
