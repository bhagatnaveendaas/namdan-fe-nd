import React from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    Animated,
    Image,
    TouchableOpacity,
} from "react-native";
const successIcon = require("../../../assets/success.png");
import { FONTS } from "../../constants/fonts";
import theme from "../../constants/theme";

const Success = ({ visible, message }) => {
    const [show, setShow] = React.useState(visible);
    const scale = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        toggle();
    }, [visible]);
    const toggle = () => {
        if (visible) {
            setShow(true);
            Animated.spring(scale, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShow(false), 300);
            Animated.timing(scale, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal onRequestClose={toggle} transparent visible={show}>
            <View style={styles.bg}>
                <Animated.View
                    style={[styles.container, { transform: [{ scale }] }]}
                >
                    <Text style={styles.heading} allowFontScaling={false}>
                        {message}
                    </Text>
                    <Image
                        source={successIcon}
                        style={{
                            height: 80,
                            width: 80,
                            marginTop: 30,
                            marginBottom: 20,
                        }}
                    />
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "80%",
        backgroundColor: "white",
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        width: "100%",
        height: 40,
    },
    heading: {
        ...FONTS.h3,
        textAlign: "center",
        fontSize: 18,
        color: theme.colors.primary,
    },
});

export default Success;
