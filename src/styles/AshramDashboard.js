import { StyleSheet } from 'react-native';
import theme from '../constants/theme';

export default StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  scoreBoard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10
  },
  prathamDiv: {
    alignContent: 'center',
    alignSelf: 'center',
    color: theme.colors.white
  }
});
