import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  boxShadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {height: 2, width: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  wFull: {
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  jutBetween: {
    justifyContent: 'space-between',
  },
  pageBg: {
    backgroundColor: '#fcfcfc',
  },
  themeBorderColor: {
    borderColor: '#2a2c30',
  },
  primaryColor: {
    color: '#e45828',
  },
  themeColor: {
    color: '#2a2c30',
  },
  themeBgColor: {
    backgroundColor: '#2a2c30',
  },
  mt30: {
    marginTop: 30,
  },
});
export default commonStyles;
