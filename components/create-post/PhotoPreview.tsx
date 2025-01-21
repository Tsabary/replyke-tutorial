import { Image, Pressable, Text, View } from "react-native";
import { CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";

function PhotoPreview({
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
}) {
  return (
    <View className="flex-1 bg-black">
      <Image
        source={{ uri: (cameraPhoto ?? galleryPhoto)?.uri }}
        className="flex-1"
        resizeMode="cover"
      />
      <View className="flex-1 absolute top-0 left-0 right-0 z-50 flex-row justify-between p-3">
        <Pressable
          onPress={() => {
            resetCreateScreen();
          }}
          className="px-3 py-2 bg-blue-500 flex-row items-center gap-2 rounded-xl"
        >
          <AntDesign name="arrowleft" size={16} color="white" />
          <Text className="text-lg tracking-wide text-white">Preview</Text>
        </Pressable>
        <Pressable
          onPress={() => setStep("finalize")}
          className="px-3 bg-blue-500 flex-row items-center gap-2 rounded-xl"
        >
          <Text className="text-lg tracking-wide text-white">Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default PhotoPreview;
