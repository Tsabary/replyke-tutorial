import { Image, Text, View } from "react-native";
import React from "react";
import { useEntity } from "replyke-expo";
import PostActionsHover from "./PostActionsHover";

const SinglePost = ({ listHeight }: { listHeight: number }) => {
  const { entity } = useEntity();

  if (!entity) return null;

  return (
    <View className="relative flex-1" style={{ height: listHeight }}>
      <Image
        source={{ uri: entity.media[0].publicPath }}
        className="flex-1"
        resizeMode="cover"
      />

      {/* Caption */}
      <View className="px-6 py-4 gap-2 absolute left-0 bottom-0 right-0 bg-black/30">
        <Text className="text-white">{entity.title}</Text>
      </View>

      {/* Actions */}
      <PostActionsHover />
    </View>
  );
};

export default SinglePost;
