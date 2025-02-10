import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  SocialStyleCallbacks,
  useSocialComments,
  useSocialStyle,
  UseSocialStyleProps,
} from "@replyke/comments-social-react-native";
import { useRouter } from "expo-router";

import useSheetManager from "../../hooks/useSheetManager";
import { cn } from "../../utils/cn";

const CommentSectionSheet = () => {
  const router = useRouter();

  const { commentSetionSheetRef, commmentsEntityId, closeCommentSectionSheet } =
    useSheetManager();

  const snapPoints = useMemo(() => ["100%"], []);
  const [sheetOpen, setSheetOpen] = useState(false);

  const customStyles = useMemo<Partial<UseSocialStyleProps>>(
    () => ({
      newCommentFormProps: {
        verticalPadding: 16,
        paddingLeft: 24,
        paddingRight: 24,
      },
    }),
    []
  );
  const styleConfig = useSocialStyle(customStyles);

  const callbacks: SocialStyleCallbacks = useMemo(
    () => ({
      currentUserClickCallback: () => {
        Keyboard.dismiss();
        closeCommentSectionSheet?.();
        router.navigate("/(tabs)/profile");
      },
      otherUserClickCallback: (userId: string) => {
        Keyboard.dismiss();
        closeCommentSectionSheet?.();
        router.navigate(`/account/${userId}`);
      },
      loginRequiredCallback: () => {
        Alert.alert(
          "Oops! Login Required. Please sign in or create an account to continue."
        );
      },
    }),
    []
  );

  const { CommentSectionProvider, CommentsFeed, NewCommentForm, SortByButton } =
    useSocialComments({
      entityId: commmentsEntityId,
      styleConfig,
      callbacks,
    });

  const commentFormRef = useRef<{ focus: () => void } | null>(null);

  useEffect(() => {
    if (!commmentsEntityId) return;
    const timeout = setTimeout(() => {
      if (commentFormRef.current) {
        commentFormRef.current.focus();
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [commmentsEntityId]);

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
          ref={commentSetionSheetRef}
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
              <CommentSectionProvider>
                <View className="flex-row gap-2 px-4 items-center mb-2">
                  <View className="flex-1" />
                  <SortByButton
                    priority="top"
                    activeView={
                      <Text className="bg-black py-2 px-3 rounded-md text-white text-sm">
                        Top
                      </Text>
                    }
                    nonActiveView={
                      <Text className="bg-gray-200 py-2 px-3 rounded-md text-sm">
                        Top
                      </Text>
                    }
                  />
                  <SortByButton
                    priority="new"
                    activeView={
                      <Text className="bg-black py-2 px-3 rounded-md text-white text-sm">
                        New
                      </Text>
                    }
                    nonActiveView={
                      <Text className="bg-gray-200 py-2 px-3 rounded-md text-sm">
                        New
                      </Text>
                    }
                  />
                </View>

                <CommentsFeed />
                <NewCommentForm ref={commentFormRef} />
              </CommentSectionProvider>
            </BottomSheetView>
          </KeyboardAvoidingView>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default CommentSectionSheet;
