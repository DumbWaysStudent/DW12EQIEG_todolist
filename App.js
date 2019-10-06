import React, { Component } from "react"
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Button,
    Text
} from "react-native"

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: "",
            tasks: [
                { key: "work", done: false },
                { key: "swim", done: false },
                { key: "study", done: false },
                { key: "sleep", done: false },
                { key: "run", done: false }
            ]
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        //   this.setState({
        //     text: e.target.value,
        //   });
        // alert(e);
        this.setState({
            text: e
        })
    }

    handleAdd() {
        // alert(this.state.text);
        if (this.state.text !== "") {
            const newTask = { key: this.state.text, done: false }
            this.setState({
                tasks: this.state.tasks.concat(newTask),
                text: ""
            })
        }
        // alert(this.state.tasks);

        // alert('clicked');
    }

    handleDelete(key) {
        this.setState({
            tasks: this.state.tasks.filter(task => task.key !== key)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        placeholder="Add some task"
                        style={styles.input}
                        value={this.state.text}
                        onChangeText={text => {
                            this.handleChange(text)
                        }}
                    />
                    <Button
                        style={styles.button}
                        onPress={this.handleAdd}
                        title="add"
                    />
                    {/* <Icon name="trash" /> */}
                </View>
                <FlatList
                    data={this.state.tasks}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.item}>{item.key}</Text>
                            <Button
                                style={styles.button}
                                onPress={() => this.handleDelete(item.key)}
                                title="delete"
                            />
                            {/* <Button title="update" /> */}
                        </View>
                    )}
                ></FlatList>
            </View>
        )
    }
}

export default App

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        borderBottomWidth: 1
    },
    button: {
        height: 50,
        marginBottom: 30,
        width: 100,
        alignItems: "center",
        backgroundColor: "#2196F3"
    },
    buttonText: {
        textAlign: "center",
        padding: 20,
        color: "white"
    },
    input: {
        height: 50,
        width: 250,
        backgroundColor: "#ffffff",
        paddingLeft: 15,
        paddingRight: 15
    },
    inputContainer: {
        height: 50
    }
})
