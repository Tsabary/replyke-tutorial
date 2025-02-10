import React, { useCallback, useMemo, useState } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import useSheetManager from "../../hooks/useSheetManager";
import { cn } from "../../utils/cn";

const CollectionsSheet = () => {
  const { collectionsSheetRef } = useSheetManager();

  const snapPoints = useMemo(() => ["100%"], []);

  const [sheetOpen, setSheetOpen] = useState(false);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  return (
    <SafeAreaView
      className={cn(
        "flex-1 absolute inset-0",
        sheetOpen ? "" : "pointer-events-none"
      )}
    >
      <View className="flex-1 relative">
        <BottomSheet
          ref={collectionsSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          onChange={(state) => {
            setSheetOpen(state > -1);
            if (state === -1) {
              Keyboard.dismiss();
            }
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <BottomSheetView className="flex-1">
              <Text>Collections Sheet</Text>
            </BottomSheetView>
          </KeyboardAvoidingView>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default CollectionsSheet;
