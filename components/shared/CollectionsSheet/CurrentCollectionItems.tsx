import React from "react";
import { Image, View, FlatList } from "react-native";
import { useLists } from "@replyke/expo";
import { Skeleton } from "@replyke/ui-core-react-native";

function CurrentCollectionItems() {
  const { currentList } = useLists();

  return (
    <View>
      {currentList ? (
        <FlatList
          data={currentList?.entities}
          keyExtractor={(item) => item.id!}
          renderItem={({ item: entity }) => (
            <Image
              source={{ uri: entity.media?.[0].publicPath }}
              className="size-20 rounded-xl"
              resizeMode="cover"
            />
          )}
          contentContainerStyle={{ padding: 14 }}
        />
      ) : (
        <FlatList
          data={[1, 2]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => (
            <View className="flex-row gap-3 px-4 py-2.5 items-center">
              <Skeleton
                style={{
                  height: 36,
                  width: 36,
                  borderRadius: 20,
                  backgroundColor: "#d1d5db",
                }}
              />
              <Skeleton
                style={{
                  height: 10,
                  width: "70%",
                  borderRadius: 6,
                  backgroundColor: "#d1d5db",
                }}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

export default CurrentCollectionItems;
