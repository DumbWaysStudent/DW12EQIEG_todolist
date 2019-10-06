import React, {Component} from 'react';
import {StyleSheet, View, FlatList, CheckBox} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Item,
  Body,
  Title,
  Input,
  Button,
  Text,
  Icon,
} from 'native-base';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      update: false,
      updateKey: '',
      tasks: [
        {key: 'work', done: false},
        {key: 'swim', done: true},
        {key: 'study', done: false},
        {key: 'sleep', done: true},
        {key: 'run', done: false},
      ],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  handleChange(e) {
    //   this.setState({
    //     text: e.target.value,
    //   });
    // alert(e);
    this.setState({
      text: e,
    });
  }

  handleAdd() {
    // alert(this.state.text);
    if (this.state.text !== '') {
      const newTask = {key: this.state.text, done: false};
      this.setState({
        tasks: this.state.tasks.concat(newTask),
        text: '',
      });
    }
    // alert(this.state.tasks);

    // alert('clicked');
  }

  handleDelete(key) {
    this.setState({
      tasks: this.state.tasks.filter(task => task.key !== key),
    });
  }
  handleCheck(key) {
    this.setState(({taks}) => ({
      tasks: this.state.tasks.map(task => {
        if (task.key === key) {
          task.done = !task.done;
          if (task.done) {
            alert('Sudah beres');
          } else {
            alert('kok?');
          }
          return task;
        }
        return task;
      }),
    }));
  }

  handleUpdate(key) {
    if (!this.state.update) {
      this.handleChange(key);
    } else {
      this.handleChange('');
    }
    this.setState({
      update: !this.state.update,
      updateKey: key,
    });
  }

  updateTask() {
    if (this.state.text !== '') {
      this.setState(({taks}) => ({
        tasks: this.state.tasks.map(task => {
          if (task.key === this.state.updateKey) {
            task.key = this.state.text;
            this.handleChange('');
            this.state.update = false;
            this.state.updateKey = '';
            alert('berhasil diubah');
            return task;
          }
          return task;
        }),
      }));
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Todo App</Title>
          </Body>
        </Header>
        <Content>
          <Item>
            {/* <View style={{flexDirection: 'row'}}> */}
            <Item rounded style={{width: 250}}>
              <Input
                placeholder="Add some task"
                value={this.state.text}
                onChangeText={text => {
                  this.handleChange(text);
                }}
              />
            </Item>
            {this.state.update === true ? (
              <Button warning onPress={this.updateTask} style={{width: 100}}>
                <Text>Update</Text>
              </Button>
            ) : (
              <Button light onPress={this.handleAdd} style={{width: 100}}>
                <Icon
                  type="FontAwesome"
                  name="plus"
                  style={{fontSize: 20, color: 'black'}}
                />
                <Text style={styles.buttonText}>Add</Text>
              </Button>
            )}
            {/* </View> */}
          </Item>

          <FlatList
            data={this.state.tasks}
            renderItem={({item}) => (
              <Card>
                <CardItem>
                  <CheckBox
                    value={item.done}
                    onValueChange={() => this.handleCheck(item.key)}
                  />
                  <Text style={styles.item}>{item.key}</Text>
                  <Button
                    primary
                    style={styles.button}
                    onPress={() => this.handleUpdate(item.key)}>
                    <Icon
                      type="FontAwesome"
                      name="edit"
                      style={{fontSize: 20, color: 'white'}}
                    />
                  </Button>
                  <Button
                    danger
                    style={styles.button}
                    onPress={() => this.handleDelete(item.key)}>
                    {/* <Text>Delete</Text> */}
                    <Icon
                      type="FontAwesome"
                      name="trash"
                      style={{fontSize: 20, color: 'white'}}
                    />
                  </Button>
                </CardItem>
              </Card>
            )}></FlatList>
        </Content>
      </Container>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    width: '60%',
    // margin: 5
  },
  button: {
    width: '15%',
    alignItems: 'center',
  },
  buttonText: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    width: 250,
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputContainer: {
    height: 50,
  },
});
