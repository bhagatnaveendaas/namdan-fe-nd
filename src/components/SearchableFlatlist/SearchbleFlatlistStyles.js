import { StyleSheet } from "react-native";

import theme from "../../constants/theme";


export default StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: "110%",
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    width: "100%",
    zIndex: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    height:
      sortedItems.length === 1
        ? 50
        : sortedItems.length === 2
          ? 100
          : 200,
    elevation: 5,
    paddingVertical: 5,

  }
});