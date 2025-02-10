import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

function CreateNewCollection({
  isCreateCollectionView,
  setIsCreateCollectionView,
  newCollectionName,
  setNewCollectionName,
}: {
  isCreateCollectionView: boolean;
  setIsCreateCollectionView: (state: boolean) => void;
  newCollectionName: string;
  setNewCollectionName: (value: string) => void;
}) {
  return (
    <View className="border-t border-b border-gray-300 p-3 mt-3">
      {isCreateCollectionView ? (
        <TextInput
          value={newCollectionName}
          onChangeText={setNewCollectionName}
          placeholder="Create a collection.."
          placeholderTextColor="#9ca3af"
          className="bg-gray-200 rounded-2xl p-4 text-gray-600"
        />
      ) : (
        <TouchableOpacity onPress={() => setIsCreateCollectionView(true)}>
          <Text className="text-lg font-medium text-blue-500 m-2">
            Create a new collection
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CreateNewCollection;
