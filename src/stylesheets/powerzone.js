import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    opacity: .9,
    backgroundColor: '#000000'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxHeight: 50,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 8,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  column_slider: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 32,
    color: '#ffffff',
  },
  header: {
    alignSelf: 'flex-end',
    fontSize: 18,
    color: '#03A9F4',
    borderWidth: 1,
    borderColor: '#03A9F4',
    borderRadius: 10,
    padding: 6,
    width: 100,
    textAlign: 'center'
  },
  header_noborder : {
    borderWidth: 0
  },
  y_labels: {
    fontSize: 20,
    color: '#999999',
    height: 68,
    paddingTop: 8
  },
  active: {
    fontSize: 20,
    color: '#03A9F4',
  },
  score: {
    fontSize: 36,
    color: '#ffffff',
    minHeight: 68,
    textAlign: 'center'
  },
  slider: {
    width: 460,
    height: 40,
    transform: [
       { rotateZ : '-90deg' },
    ],
    marginTop: -20
  },
  close: {
    fontSize: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#0288D1',
    color: '#0288D1',
    width: 30,
    height: 30,
    padding: 2,
    paddingLeft: 10
  }
});
export default styles;
