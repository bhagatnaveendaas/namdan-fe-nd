import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import theme from '../constants/theme';

const PaginationButtons = ({ total, paginate, activeId }) => {
    const pageNumbers = new Array(Number(Math.ceil(total / 10)))
        .fill(null)
        .map((_, i) => i + 1);

    return (
        <View
            style={{
                marginBottom: 30,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {pageNumbers.map((item, i) => (
                <TouchableOpacity
                    onPress={() => paginate(item)}
                    style={{
                        height: 34,
                        width: 34,
                        borderColor: theme.colors.primaryLight,
                        borderWidth: 1,
                        marginHorizontal: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        backgroundColor:
                            item === activeId
                                ? theme.colors.primary
                                : 'transparent',
                    }}
                    key={i}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color:
                                item === activeId
                                    ? theme.colors.white
                                    : theme.colors.primary,
                        }}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default PaginationButtons;
