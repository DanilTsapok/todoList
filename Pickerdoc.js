import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  ImageBackground,
  Linking,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function Pickerdoc({ fileArray }) {
  const [files, setFile] = useState([]);
  console.log("files", files);
  console.log("fileArray", fileArray);

  const selectDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.cancelled) {
      setFile((prevFiles) => [
        ...prevFiles,
        { uri: result.assets[0].uri, name: result.assets[0].name },
      ]);
    }
  };

  const openDocument = (uri) => {
    Linking.openURL(uri);
  };

  const renderFileItem = ({ item }) => (
    <TouchableOpacity onPress={() => openDocument(item.uri)}>
      <ImageBackground
        source={{ uri: item.uri }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{item.name.slice(0, 12)}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Button onPress={() => selectDoc()} title="Add doc" />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <FlatList
          data={files}
          renderItem={renderFileItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>
    </View>
  );
}
