import { StyleSheet } from "react-native";

export const reportDashboardStyles = StyleSheet.create({
  body: {
    flex: 1
  },
  listWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: .5
  },
  boldRow: {
    fontWeight: "bold",
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 10
  },
  row: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 10
  }
});
