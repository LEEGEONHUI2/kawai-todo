import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ToDo from "./Todo";

const { hight, width } = Dimensions.get("window");

export default class App extends React.Component {

  state = {
    newToDo: ""
  }

  render() {
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai Todo</Text>
        <View style={styles.card}>
          {/*   placeholderTextColor={"#000000"}  */}
          <TextInput
            style={styles.input}
            placeholder={"New Todo Test"}
            underlineColorAndroid='transparent'
            value={newToDo}
            onChangeText={this._controlNewTodo}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo />
          </ScrollView>
        </View>
      </View>
    );
  }

  /*
  _controlNewTodo = text => {
    this.setState({
      newToDo: text
    })
  }
  */

  //auto onChangeText bind. =>
  _controlNewTodo = text => {
    //객체를 리턴하려면.. {} 로 묶어야합니다. '다만 한 줄 일때' { return~ 이 문장을 ( 로 대처할 수 있습니다.
    this.setState(() => {
      console.log(text)
      return { newToDo: text }
    });
    //this.setState(() => ({ newToDo: text }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
    //justifyContent: 'center', //세로 가운대
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          hight: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,

  },

  toDos: {
    alignItems: "center",
  },
});
