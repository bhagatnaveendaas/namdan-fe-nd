import { StyleSheet } from "react-native";
import theme from "../constants/theme";

export const reportDashboardStyles = StyleSheet.create({
  body: {
    flex: 1
  },
  listWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: "2%",
  },
  rowWrapper: {
    backgroundColor: "white",
    padding: "2%",
    margin: "1%",
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
  },
  boldRow: {
    flex: 1,
    paddingHorizontal: 2,
    paddingTop: 10,
    paddingBottom: 2,
    fontFamily:theme.fonts.poppins.semiBold,
    textTransform:"capitalize"
  },
  row: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 10,
    fontFamily:theme.fonts.poppins.regular,
    textTransform:"capitalize"
  }
});
