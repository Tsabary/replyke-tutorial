import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useCreateEntity, useUploadFile, useUser } from "replyke-rn";
import { useRouter } from "expo-router";
import { CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";

const FinalizePost = ({
  cameraPhoto,
  galleryPhoto,
  setStep,
  resetCreateScreen,
}: {
  cameraPhoto: CameraCapturedPicture | null;
  galleryPhoto: ImagePicker.ImagePickerAsset | null;
  setStep: React.Dispatch<
    React.SetStateAction<"capture" | "preview" | "finalize">
  >;
  resetCreateScreen: () => void;
}) => {
  const router = useRouter();
  const { user } = useUser();
  const uploadFile = useUploadFile();
  const createEntity = useCreateEntity();
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const handleUpload = async (imageUri: string) => {
    if (!imageUri || !user) return;

    setUploading(true);
    try {
      // Extract the file extension from the URI
      const fileExtension = imageUri.substring(imageUri.lastIndexOf(".") + 1);

      // In React Native, we provide the shape {uri, type, name}:
      const rnFile = {
        uri: imageUri,
        type: `image/${fileExtension}`, // Use the extracted extension
        name: `${Date.now()}.${fileExtension}`, // Dynamically include the file extension
      };

      const pathParts = ["posts", user.id];
      const uploadResponse = await uploadFile(rnFile, pathParts, rnFile.name);
      if (uploadResponse) {
        await createEntity({
          title: caption,
          media: [{ ...uploadResponse, fileExtension }],
        });
      }
      router.navigate("/");
      resetCreateScreen();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Pressable
        onPress={() => setStep("preview")}
        className="m-3 px-3 py-2 flex-row items-center gap-2 rounded-xl"
      >
        <AntDesign name="arrowleft" size={16} color="black" />
        <Text className="text-lg tracking-wide">New Post</Text>
      </Pressable>
      <View className="flex-1">
        <View className="h-64">
          <Image
            source={{ uri: (cameraPhoto ?? galleryPhoto)?.uri }}
            className="flex-1"
            resizeMode="cover"
          />
        </View>
        <TextInput
          value={caption}
          onChangeText={(value) => {
            if (value.length > 120) return;
            setCaption(value);
          }}
          className="m-3 text-left border-b border-gray-300"
          placeholder="Add caption.."
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
        />
        <View />
      </View>

      <TouchableOpacity
        onPress={() => handleUpload((cameraPhoto ?? galleryPhoto)!.uri)}
        disabled={uploading}
        className="px-3 py-4 flex-row items-center justify-center gap-2 rounded-xl bg-black m-3 "
      >
        {uploading && <ActivityIndicator />}
        <Text className="text-lg tracking-wide text-white text-center">
          Publish
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinalizePost;
