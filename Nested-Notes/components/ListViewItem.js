import React, {Component} from 'react';
import {TouchableHighlight, View, Text, TextInput} from 'react-native';
import CheckBox from './checkbox';
import IndentButton from './indentButton';

class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
    this._onIndentPressed = this._onIndentPressed.bind(this);
    this.state = {
      data: this.props.data,
      indentImage: 'arrow-right',
      indentNum: 0,
      note: false,
      noteText: ''
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    })
  }

  _onCheckBoxPressed() {
    var data = this.state.data;
    data.completed = !data.completed;
    this.setState({
      data: data
    });

  }

  _onTap() {
    this.setState({
      note: true
    })
  }

  _onIndentPressed() {
    console.log("in indent pressed")
    if(this.state.indentImage == 'arrow-right') {
      console.log("in if");
      this.setState({
        indentImage: 'arrow-left',
        indentNum: 20
      });
    }
    else {
      console.log("in else")
      this.setState({
        indentImage: 'arrow-right',
        indentNum: 0
      });
    }

  }

  render() {
    let data = this.state.data;
    let color = data.completed ? '#C5C8C9' : '#000';
    let noteText = this.state.noteText;

    var indentIcon = this.state.indentImage;
    let indentNum = this.state.indentNum;

    if(this.state.note == true) {

    }

    return (
      <TouchableHighlight underlayColor={'#eee'} style={{paddingTop: 6, paddingBottom: 6, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}} {...this.props.sortHandlers}>
        <View style= {{paddingLeft: indentNum }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed}></CheckBox>
              <Text style={{fontSize:18, color: color}}>{data.title}</Text>
            </View>
            <IndentButton iconName={indentIcon} onIndentPressed={this._onIndentPressed} style={{alignItems:'right'}}></IndentButton>
          </View>
          <TextInput placeholder="Type your note here" style={{paddingLeft: 10}} multiline onChangeText={(text) => this.setState({noteText})}/>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = ListViewItem;
