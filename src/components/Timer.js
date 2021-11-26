import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FONTS } from "../constants/fonts";
const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

const Timer = ({ time, start, onPress, color }) => {
    const [remainingSecs, setRemainingSecs] = useState(time);
    const [isActive, setIsActive] = useState(start);
    const { mins, secs } = getRemaining(remainingSecs);

    useEffect(() => {
        let interval = null;
        if (isActive && remainingSecs > 0) {
            interval = setInterval(() => {
                setRemainingSecs((remainingSecs) => remainingSecs - 1);
            }, 1000);
        } else {
            clearInterval(interval);
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingSecs]);
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {remainingSecs !== 0 && (
                <Text
                    allowFontScaling={false}
                    style={{ color, ...FONTS.body4 }}
                >{`${mins > 0 ? `${mins}:` : ""}${secs}s `}</Text>
            )}
            <TouchableOpacity
                disabled={remainingSecs !== 0}
                onPress={() => {
                    onPress();
                    setRemainingSecs(time);
                    setIsActive(true);
                }}
            >
                <Text
                    allowFontScaling={false}
                    style={{
                        color: remainingSecs === 0 ? color : "gray",
                        ...FONTS.body4,
                    }}
                >
                    Resend
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Timer;
