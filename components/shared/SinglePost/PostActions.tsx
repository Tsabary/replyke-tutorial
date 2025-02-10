import React from "react";
import { View, TouchableOpacity, Text, Pressable, Alert } from "react-native";
import { useEntity, useUser } from "@replyke/expo";
import { UserAvatar } from "@replyke/ui-core-react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import useSheetManager from "../../../hooks/useSheetManager";

function PostActions() {
  const router = useRouter();
  const { user } = useUser();
  const { entity, userUpvotedEntity, upvoteEntity, removeEntityUpvote } =
    useEntity();
  const { openCommentSectionSheet, openCollectionsSheet } = useSheetManager();

  if (!entity) return null;

  return (
    <View
      className="absolute right-4 bottom-20 z-50 items-center gap-6 bg-black/30 p-3 pb-4 rounded-2xl"
      style={{ columnGap: 12 }}
    >
      {/* User avatar and follow button */}
      <Pressable
        onPress={() =>
          entity.user!.id === user?.id
            ? router.navigate("/(tabs)/profile")
            : router.navigate(`/account/${entity.user!.id}`)
        }
      >
        <UserAvatar user={entity.user} size={46} borderRadius={8} />
      </Pressable>

      {/* LIKE BUTTON */}
      <TouchableOpacity
        onPress={() => {
          if (!user) {
            Alert.alert(
              "Oops! Login Required. Please sign in or create an account to continue."
            );
            return;
          }
          if (userUpvotedEntity) {
            removeEntityUpvote?.();
          } else {
            upvoteEntity?.();
          }
        }}
        className="items-center gap-1.5"
      >
        <AntDesign name="heart" size={36} color="white" />

        <Text className="text-white overflow-visible">
          {entity?.upvotes.length}
        </Text>
      </TouchableOpacity>

      {/* OPEN COMMNENT SECTION */}
      <TouchableOpacity
        onPress={() => openCommentSectionSheet?.(entity.id)}
        className="items-center gap-1.5"
      >
        <Ionicons name="chatbubble" size={36} color="#ffffff" />

        {(entity.repliesCount || 0) > 0 && (
          <Text className="text-[#9ca3af]">{entity.repliesCount}</Text>
        )}
      </TouchableOpacity>

      {/* BOOKMARK BUTTON */}
      <TouchableOpacity onPress={() => openCollectionsSheet?.(entity.id)}>
        <FontAwesome name="bookmark" size={32} color="#ffffff99" />
      </TouchableOpacity>
    </View>
  );
}

export default PostActions;
