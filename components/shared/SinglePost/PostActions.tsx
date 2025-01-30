import React from "react";
import { View, TouchableOpacity, Text, Pressable } from "react-native";
import { useEntity, UserAvatar } from "replyke-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

function PostActions() {
  const { entity } = useEntity();

  if (!entity) return null;

  return (
    <View
      className="absolute right-4 bottom-20 z-50 items-center gap-6 bg-black/30 p-3 pb-4 rounded-2xl"
      style={{ columnGap: 12 }}
    >
      {/* User avatar and follow button */}
      <Pressable>
        <UserAvatar user={entity.user} size={46} borderRadius={8} />
      </Pressable>

      {/* LIKE BUTTON */}
      <TouchableOpacity className="items-center gap-1.5">
        <AntDesign name="heart" size={36} color="white" />

        <Text className="text-white overflow-visible">
          {entity?.upvotes.length}
        </Text>
      </TouchableOpacity>

      {/* OPEN COMMNENT SECTION */}
      <TouchableOpacity className="items-center gap-1.5">
        <Ionicons name="chatbubble" size={36} color="#ffffff" />

        {(entity.repliesCount || 0) > 0 && (
          <Text className="text-[#9ca3af]">{entity.repliesCount}</Text>
        )}
      </TouchableOpacity>

      {/* BOOKMARK BUTTON */}
      <TouchableOpacity>
        <FontAwesome name="bookmark" size={32} color="#ffffff99" />
      </TouchableOpacity>
    </View>
  );
}

export default PostActions;
