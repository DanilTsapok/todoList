import React from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "./Colors";
import tempData from "./tempData";

export default class AddTodoModal extends React.Component {
  state = {
    name: "",
  };

  createTodo = () => {
    const { name } = this.state;

    const list = { name, color: Colors.yellow };
    this.props.addList(list);
    this.setState({ name: "" });
    this.props.closeModal();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={{ position: "absolute", top: 32, right: 32 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Create Todo list</Text>
          <TextInput
            placeholder="List name"
            style={styles.input}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <TouchableOpacity style={styles.create} onPress={this.createTodo}>
            <Text style={{ color: Colors.white }}>Create</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    alignSelf: "center",
    color: Colors.black,
  },
  input: {
    borderColor: Colors.blue,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  create: {
    backgroundColor: Colors.blue,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
  },
});
