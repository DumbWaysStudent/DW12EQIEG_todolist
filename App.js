import React, { Component } from "react"
import {
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Button,
    Text,
    CheckBox
} from "react-native"

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: "",
            update: false,
            updateKey: "",
            tasks: [
                { key: "work", done: false },
                { key: "swim", done: true },
                { key: "study", done: false },
                { key: "sleep", done: true },
                { key: "run", done: false }
            ]
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateTask = this.updateTask.bind(this)
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
    handleCheck(key) {
        this.setState(({ taks }) => ({
            tasks: this.state.tasks.map(task => {
                if (task.key === key) {
                    task.done = !task.done
                    if (task.done) {
                        alert("Sudah beres")
                    } else {
                        alert("Belum beres")
                    }
                    return task
                }
                return task
            })
        }))
    }

    handleUpdate(key) {
        if (!this.state.update) {
            this.handleChange(key)
        } else {
            this.handleChange("")
        }
        this.setState({
            update: !this.state.update,
            updateKey: key
        })
    }

    updateTask() {
        if (this.state.text !== "") {
            this.setState(({ taks }) => ({
                tasks: this.state.tasks.map(task => {
                    if (task.key === this.state.updateKey) {
                        task.key = this.state.text
                        this.handleChange("")
                        this.state.update = false
                        this.state.updateKey = ""
                        alert("berhasil diubah")
                        return task
                    }
                    return task
                })
            }))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        placeholder="Add some task"
                        style={styles.input}
                        value={this.state.text}
                        onChangeText={text => {
                            this.handleChange(text)
                        }}
                    />
                    {this.state.update === true ? (
                        <Button
                            style={styles.button}
                            onPress={this.updateTask}
                            title="update"
                        />
                    ) : (
                        <Button
                            style={styles.button}
                            onPress={this.handleAdd}
                            title="add"
                            color="green"
                        />
                    )}

                    {/* <Button
                        style={styles.button}
                        onPress={this.handleAdd}
                        title="add"
                        color="green"
                    /> */}
                    {/* <Icon name="trash" /> */}
                </View>
                <FlatList
                    data={this.state.tasks}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row" }}>
                            <CheckBox
                                value={item.done}
                                onValueChange={() => this.handleCheck(item.key)}
                            />
                            <Text style={styles.item}>{item.key}</Text>
                            <Button
                                style={styles.button}
                                onPress={() => this.handleUpdate(item.key)}
                                title="Update"
                            />
                            <Button
                                style={styles.button}
                                onPress={() => this.handleDelete(item.key)}
                                title="delete"
                                color="darkred"
                            />
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
        width: "60%",
        borderBottomWidth: 1
        // margin: 5
    },
    button: {
        height: 50,
        width: "15%",
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
