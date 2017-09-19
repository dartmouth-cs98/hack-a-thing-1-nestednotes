//Adapted from tutorial at https://hellokoding.com/todo-app-with-react-native/


import React, { Component } from 'react';
import { TextInput } from 'react-native';
import TodoModel from './TodoModel';
import Utils from './Utils';

class OmniBox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillMount() {
    this.setState({
      newValue: ''
    });
  }

  onChange(event){
    var title = event.nativeEvent.text;

    this.setState({
      newValue: title
    });
  }

  onKeyPress(event){
    if (event.nativeEvent.key == 'Enter' && this.state.newValue) {

      text = this.state.newValue.substring(0, 20);

      var newDataItem = new TodoModel(text);

      var dataList = this.props.data;

      dataList.unshift(newDataItem);

      this.setState({
        newValue: ''
      });
      this.props.updateDataList(dataList);
    }
  }

  render() {
    return (
      <TextInput style={{height: 36, padding: 4, marginBottom: 0, fontSize: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fff'}}
        placeholder='Add a todo'
        blurOnSubmit={false}
        value={this.state.newValue}
        onKeyPress={this.onKeyPress}
        onChange={this.onChange}>
      </TextInput>
    );
  }
}

module.exports = OmniBox;
