import { Image } from "react-native";
import React from "react";
import { useEntity } from "replyke-expo";

const SinglePost = ({ listHeight }: { listHeight: number }) => {
  const { entity } = useEntity();

  if (!entity) return null;

  return (
    <Image
      source={{ uri: entity.media[0].publicPath }}
      className="flex-1"
      resizeMode="cover"
      style={{ height: listHeight }}
    />
  );
};

export default SinglePost;
