import React, { useCallback, useState } from "react";
import { EntityProvider, Skeleton, useFeed } from "replyke-expo";
import { RefreshControl, View, Text, FlatList } from "react-native";
import { SinglePost } from "../shared/SinglePost";

function Feed() {
  const { entities, loadMore, resetEntities, loading } = useFeed();
  const [listHeight, setListHeight] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await resetEntities?.();
    setRefreshing(false);
  }, [resetEntities]);

  const initialLoading = loading && (!entities || entities.length === 0);

  if (initialLoading)
    return (
      <Skeleton
        style={{
          height: listHeight,
          width: "100%",
        }}
      />
    );

  return (
    <View
      className="flex-1"
      onLayout={(event) => {
        if (event.nativeEvent.layout.height > listHeight)
          setListHeight(event.nativeEvent.layout.height);
      }}
    >
      <FlatList
        data={entities!}
        renderItem={({ item: entity }) => (
          <EntityProvider entity={entity}>
            <SinglePost listHeight={listHeight} />
          </EntityProvider>
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={2}
        ListFooterComponent={null}
        ListEmptyComponent={
          loading ? null : (
            <View
              className="flex-1"
              style={{
                height: listHeight,
                backgroundColor: "white",
                justifyContent: "center",
              }}
            >
              <Text className="text-center text-xl font-medium text-gray-400">
                No Results
              </Text>
              <Text className="text-center text-lg text-gray-400 mt-2">
                Try expanding your search
              </Text>
            </View>
          )
        }
        ItemSeparatorComponent={() => (
          <View className="h-[0.5px] bg-gray-200" />
        )}
        pagingEnabled
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        scrollEventThrottle={16}
        bounces={false}
      />
    </View>
  );
}

export default Feed;
