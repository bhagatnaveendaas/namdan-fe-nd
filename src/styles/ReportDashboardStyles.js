import { StyleSheet } from "react-native";

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
    fontWeight: "bold",
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
