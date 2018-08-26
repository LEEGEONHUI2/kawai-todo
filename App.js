import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import ToDo from "./Todo";
import uuidv1 from "uuid/v1";

const { hight, width } = Dimensions.get("window");

export default class App extends React.Component {

  state = {
    newToDo: "",
    loadedToDo: false,
  }
  //componentDidMount() {}
  componentDidMount = () => {
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedToDo } = this.state;

    if (!loadedToDo) {
      return <AppLoading />
    }

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
            onSubmitEditing={this._addTodo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text123={"Hello I'm a To Do"} />
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
  };

  _loadToDos = () => {
    this.setState({ loadedToDo: true })
  };
  _addTodo = () => {
    const { newToDo } = this.state;

    if (newToDo !== "") {

      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoOject = { //객체 오브젝트
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now()
          },
          
        }; //end object

        //I don't know...
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoOject
          }
        };

        return {...newState}
      }) //end setstate


    }
  };
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
