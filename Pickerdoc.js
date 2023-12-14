import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  ImageBackground,
  Linking,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

export default function Pickerdoc({ updateFileState, addFiles, index, list }) {
  const [files, setFile] = useState([]);

  const [selectImg, setSelectImg] = useState([]);

  console.log(list.todos[index].file);
  const selectDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.cancelled) {
      addFiles(index, result.assets[0].uri);
    }
  };
  const [activeModal, setActiveModal] = useState(false);

  const deleteImg = () => {
    if (selectImg !== null) {
      // setFile((prevImages) =>
      //   prevImages.filter((item) => item.uri !== selectImg.uri)
      // );
      setActiveModal(false);
    }
  };
  // renderFileItem = (item) => {
  //   console.log(item);
  //   return (
  //     <View>
  //       <TouchableOpacity onPress={() => setActiveModal(!activeModal)}>
  //         <ImageBackground
  //           source={{ uri: item.uri }}
  //           style={{ width: 100, height: 100 }}
  //         />
  //         {/* <Text>{item.name.slice(0, 12)}</Text> */}
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <Modal
        visible={activeModal}
        animationType="slide"
        onRequestClose={() => setActiveModal(false)}
      >
        <View>
          <View>
            <TouchableOpacity
              onPress={() => setActiveModal(false)}
              style={{
                position: "absolute",
                right: 0,
              }}
            >
              <AntDesign
                name="close"
                size={20}
                style={{
                  margin: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            {selectImg && selectImg.uri ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "75%",
                  marginVertical: 100,
                }}
              >
                <Image
                  source={{ uri: selectImg }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <Text>{selectImg.name.slice(0, 36)}</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    width: "50%",
                    height: 60,
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                  }}
                  onPress={() => deleteImg()}
                >
                  <Text style={{ color: "#fff", fontSize: 16 }}>Delete</Text>
                </TouchableOpacity>
              </View>
            ) : (
              ""
            )}
          </View>
        </View>
      </Modal>

      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {list.todos[index].file.map((fileArray, index) => (
          <TouchableOpacity
            onPress={() => {
              setActiveModal(!activeModal);
              setSelectImg(fileArray);
            }}
          >
            <ImageBackground
              key={index}
              source={{ uri: fileArray }}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => selectDoc()}>
        <Text style={{ color: "white" }}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    width: 100,
  },
});
