import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const SIZES = {
    width,
    height,

    h1: 30,
    h2: 22,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,
    body1: 30,
    body2: 22,
    body3: 18,
    body4: 16,
    body5: 14,
    body6: 12,
};

export const FONTS = {
    h1: { fontFamily: "NotoSans-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "NotoSans-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "NotoSans-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "NotoSans-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "NotoSans-Bold", fontSize: SIZES.h5, lineHeight: 22 },
    h6: { fontFamily: "NotoSans-Bold", fontSize: SIZES.h6, lineHeight: 22 },
    body1: {
        fontFamily: "NotoSans-Regular",
        fontSize: SIZES.body1,
        lineHeight: 36,
    },
    body2: {
        fontFamily: "NotoSans-Regular",
        fontSize: SIZES.body2,
        lineHeight: 30,
    },
    body3: {
        fontFamily: "NotoSans-Regular",
        fontSize: SIZES.body3,
        lineHeight: 22,
    },
    body4: {
        fontFamily: "NotoSans-Regular",
        fontSize: SIZES.body4,
        lineHeight: 22,
    },
    body5: {
        fontFamily: "NotoSans-Regular",
        fontSize: SIZES.body5,
        lineHeight: 22,
    },
    body6: {
        fontFamily: "NotoSans-Regular",
        fontSize: SIZES.body6,
        lineHeight: 22,
    },
};
