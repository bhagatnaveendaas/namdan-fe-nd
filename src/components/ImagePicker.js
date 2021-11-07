import React, { forwardRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    PermissionsAndroid,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import theme from "../constants/theme";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const galleryIcon = require("../../assets/icons/gallery.png");
const cameraIcon = require("../../assets/icons/camera.png");

const ImagePicker = forwardRef(({ onImageSelected, onClose }, ref) => {
    const options = [
        {
            name: "Take from camera",
            icon: cameraIcon,
            onPress: () => takePictureFromCamera(),
        },
        {
            name: "Choose from Gallery",
            icon: galleryIcon,
            onPress: () => chooseImageFromGallery(),
        },
        {
            name: "Cancel",
            onPress: () => onClose(),
        },
    ];

    const takePictureFromCamera = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchCamera(
                    {
                        mediaType: "photo",
                        storageOptions: {
                            skipBackup: true,
                            path: "images",
                        },
                        maxWidth: 500,
                        maxHeight: 500,
                        quality: 0.5,
                    },
                    (response) => {
                        if (response.didCancel) {
                            console.log("User cancelled image picker");
                        } else if (response.errorCode) {
                            console.error(
                                `Error with status ${response.errorCode} and message: ${response.errorMessage}`
                            );
                        } else {
                            const uri = response.assets[0].uri;
                            onImageSelected(response.assets[0]);
                        }
                    }
                );
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const chooseImageFromGallery = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchImageLibrary(
                    {
                        mediaType: "photo",
                        storageOptions: {
                            skipBackup: true,
                            path: "images",
                        },
                        maxWidth: 500,
                        maxHeight: 500,
                        quality: 0.5,
                    },
                    (response) => {
                        if (response.didCancel) {
                            console.log("User cancelled image picker");
                        } else if (response.errorCode) {
                            console.error(
                                `Error with status ${response.errorCode} and message: ${response.errorMessage}`
                            );
                        } else {
                            // const uri = response.assets[0].uri;
                            onImageSelected(response.assets[0]);
                        }
                    }
                );
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <RBSheet
            ref={ref}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType={"slide"}
            openDuration={1000}
            closeDuration={1000}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(60, 60, 60, 0.3)",
                },
                container: {
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    backgroundColor: "white",
                    height: 250,
                },
                draggableIcon: {
                    backgroundColor: "#000",
                },
            }}
        >
            <View style={{ paddingTop: 20 }}>
                {options.map(({ name, icon, onPress }, index) => {
                    return (
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingVertical: 10,
                                marginHorizontal: 20,
                                paddingHorizontal: 20,
                                marginBottom: 15,
                                borderRadius: 50,
                                backgroundColor: "#EBEBEB",
                            }}
                            onPress={onPress}
                            key={index}
                        >
                            {icon && (
                                <Image
                                    source={icon}
                                    style={{
                                        width: 30,
                                        height: 25,
                                        marginRight: 10,
                                        tintColor: theme.colors.primary,
                                    }}
                                />
                            )}
                            <Text
                                style={{
                                    fontSize: 15,
                                    lineHeight: 22,
                                    fontFamily: theme.fonts.poppins.semiBold,
                                    color: theme.colors.primary,
                                }}
                            >
                                {name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </RBSheet>
    );
});

export default ImagePicker;
