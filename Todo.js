import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends React.Component {

    //생성자를 이용한 state를 props로 초기화.
    constructor(props) { //컨스트럭트에서 props 를 가져오려면 안자()로 props를 받아야한다.
        super(props);
        this.state = {
            isEditing: false,
            isCompleted: false,
            toDoValue: props.text123,
        };
    }
    /*
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: "",
    }
    */
    render() {
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text123 } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.colume}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[
                            styles.circle,
                            isCompleted ? styles.completedCircle : styles.uncompletedCircle,
                        ]} ></View>
                    </TouchableOpacity>
                    {isEditing ?
                        (   //True
                            <TextInput
                                style={[
                                    styles.text,
                                    styles.input,
                                    isCompleted ? styles.completedText : styles.uncompletedText,
                                ]}
                                value={toDoValue}
                                multiline={true}
                                onChangeText={this._controlInput}
                                returnKeyType={"done"}
                                onBlur={this._finishEdting}
                            />
                        ) : ( //False
                            <Text style={[
                                styles.text,
                                isCompleted ? styles.completedText : styles.uncompletedText,]}>
                                {text123}
                            </Text>
                        )
                    }
                </View>
                {isEditing ? (
                    <View style={styles.action}>
                        <TouchableOpacity onPressOut={this._finishEdting}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✔️</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={styles.action}>
                            <TouchableOpacity onPressOut={this._startEdting}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✏️</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        )
    }

    _toggleComplete = () => {
        //this.setState(prevState => ({ isCompleted: !prevState.isCompleted }))
        this.setState(prevState => {
            console.log(prevState);
            return {
                isCompleted: !prevState.isCompleted
            }
        })
    };

    _startEdting = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true
        })
    };

    _finishEdting = () => {
        this.setState({
            isEditing: false
        })
    };
    //important
    _controlInput = (text) => {
        this.setState({ toDoValue: text })
    }

}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        /*가로 가운데 정렬*/
        //justifyContent: "center"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20,
    },
    input: {
        marginVertical: 15,
        width: width / 2,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 30,
    },
    completedCircle: {
        borderColor: "#bbb",
    },
    uncompletedCircle: {
        borderColor: "#F23657",
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through",
    },
    uncompletedText: {
        color: "red",

    },
    colume: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
        justifyContent: "space-between",

    },
    action: {
        flexDirection: 'row',
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
});