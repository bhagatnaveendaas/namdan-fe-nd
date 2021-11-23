import React from 'react';
import { View, Text, Pressable, PixelRatio, StyleSheet } from 'react-native';

const RadioButton = ({
    borderColor,
    color = '#444',
    containerStyle,
    disabled = false,
    id,
    label,
    labelStyle,
    layout = 'row',
    onPress,
    selected = false,
    size = 24,
}) => {
    const borderWidth = PixelRatio.roundToNearestPixel(size * 0.1);
    const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.5);
    const sizeFull = PixelRatio.roundToNearestPixel(size);

    let orientation = { flexDirection: 'row' },
        margin = { marginLeft: 10 };

    if (layout === 'column') {
        orientation = { flexDirection: 'column' };
        margin = { marginTop: 10 };
    }

    const handlePress = () => {
        if (disabled) return null;
        if (onPress) onPress(id);
    };
    return (
        <Pressable
            onPress={handlePress}
            style={[
                styles.container,
                orientation,
                { opacity: disabled ? 0.2 : 1 },
                containerStyle,
            ]}
        >
            <View
                style={[
                    styles.border,
                    {
                        borderColor: borderColor || color,
                        borderWidth,
                        width: sizeFull,
                        height: sizeFull,
                        borderRadius: sizeHalf,
                    },
                ]}
            >
                {selected && (
                    <View
                        style={{
                            backgroundColor: color,
                            width: sizeHalf,
                            height: sizeHalf,
                            borderRadius: sizeHalf,
                        }}
                    />
                )}
            </View>
            {Boolean(label) && (
                <Text style={[margin, labelStyle]}>{label}</Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    border: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RadioButton;
