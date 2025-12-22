import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker";

const useImageMetaData = () => {

    const [imageUri, setImageUri] = useState<string>(undefined);
    const [exifData, setExifData] = useState<any>(undefined);

    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                "Permission required",
                "Permission to access the media library is required."
            );
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            exif: true,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setImageUri(selectedImage.uri);

            const exif = selectedImage.exif;
            setExifData(exif);

        }
    };

    return {
        pickImage,
        imageUri,
        exifData,
    }
}

export default useImageMetaData