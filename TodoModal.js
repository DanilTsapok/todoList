import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "./Colors";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import Pickerdoc from "./Pickerdoc";
export default class TodoModal extends React.Component {
  state = {
    newTodo: "",
    file: null,
  };

  updateFileState = (newFiles) => {
    this.setState({ file: newFiles });
  };

  todoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  };

  addFiles = (index, file) => {
    let list = this.props.list;
    list.todos[index].file.push(file);
    this.props.updateList(list);
  };
  addTodo = () => {
    let list = this.props.list;
    list.todos.push({
      title: this.state.newTodo,
      completed: false,
    });
    this.props.updateList(list);
    this.setState({ newTodo: "" });
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);
    this.props.updateList(list);
  };

  renderFile = (item) => {
    return (
      <View>
        <Text color={"black"}>{item}</Text>
      </View>
    );
  };
  renderTodo = (todo, index) => {
    // console.log("state", this.state);
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(_, dragX) => this.rightActions(dragX, index)}
        >
          <View style={styles.todoContainer}>
            <TouchableOpacity onPress={() => this.todoCompleted(index)}>
              <Ionicons
                name={todo.completed ? "ios-square" : "ios-square-outline"}
                size={24}
                color={Colors.grey}
                style={{ width: 32 }}
              />
            </TouchableOpacity>
            <View style={styles.blockTitleImg}>
              <View>
                <Text
                  style={[
                    styles.todo,
                    {
                      textDecorationLine: todo.completed
                        ? "line-through"
                        : "none",
                      color: todo.completed ? "green" : "red",
                    },
                  ]}
                >
                  {todo.title}
                </Text>
              </View>
              <View>
                <Pickerdoc
                  fileArray={this.state.file}
                  updateFileState={this.updateFileState}
                  addFiles={this.addFiles}
                  index={index}
                  list={this.props.list}
                />
              </View>
            </View>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };
  rightActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-50, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp",
    });
    const opacity = dragX.interpolate({
      inputRange: [-50, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={() => this.deleteTodo(index)}>
        <Animated.View style={[styles.deleteButton, { opacity: opacity }]}>
          <Animated.Text
            style={{
              color: Colors.white,
              fontWeight: "800",
              transform: [{ scale }],
            }}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 32, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color={Colors.black} />
          </TouchableOpacity>
          <View style={[styles.section, styles.header]}>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount}
            </Text>
          </View>
          <View style={[styles.section, { flex: 3, marginTop: 16 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(item) => item.title}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: Colors.yellow }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: Colors.yellow }]}
              onPress={() => this.addTodo()}
            >
              <AntDesign name="plus" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  section: {
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
    borderColor: Colors.blue,
    paddingTop: 16,
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: Colors.grey,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginHorizontal: 10,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    display: "flex",

    alignItems: "center",
    paddingLeft: 32,
    marginHorizontal: 10,
  },

  todo: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "700",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },

  Imgbody: {
    display: "flex",
    maxHeight: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    zIndex: -1,
    justifyContent: "space-between",
  },
});
