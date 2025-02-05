import { useState } from "react";
import { View } from "react-native";
import { useCameraPermissions, CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@replyke/expo";
import { Redirect } from "expo-router";

import PhotoCapture from "../../components/create-post/PhotoCapture";
import PhotoPreview from "../../components/create-post/PhotoPreview";
import RequestPermission from "../../components/create-post/RequestPermission";
import FinalizePost from "../../components/create-post/FinalizePost";

export default function CreatePostScreen() {
  const { user } = useUser();

  const [permission, requestPermission] = useCameraPermissions();

  const [cameraPhoto, setCameraPhoto] = useState<CameraCapturedPicture | null>(
    null
  );
  const [galleryPhoto, setGalleryPhoto] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const [step, setStep] = useState<"capture" | "preview" | "finalize">(
    "capture"
  );

  const resetCreateScreen = () => {
    setCameraPhoto(null);
    setGalleryPhoto(null);
    setStep("capture");
  };

  if (!user) return <Redirect href="/sign-in" />;

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return <RequestPermission requestPermission={requestPermission} />;
  }

  if (step === "finalize" && (cameraPhoto || galleryPhoto)) {
    return (
      <FinalizePost
        setStep={setStep}
        cameraPhoto={cameraPhoto}
        galleryPhoto={galleryPhoto}
        resetCreateScreen={resetCreateScreen}
      />
    );
  }

  if (step === "preview" && (cameraPhoto || galleryPhoto)) {
    return (
      <PhotoPreview
        cameraPhoto={cameraPhoto}
        galleryPhoto={galleryPhoto}
        setStep={setStep}
        resetCreateScreen={resetCreateScreen}
      />
    );
  }

  return (
    <PhotoCapture
      setCameraPhoto={setCameraPhoto}
      setGalleryPhoto={setGalleryPhoto}
      setStep={setStep}
    />
  );
}
