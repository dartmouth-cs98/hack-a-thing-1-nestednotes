// Adapted from tutorial at https://hellokoding.com/todo-app-with-react-native/
// With assistance from https://facebook.github.io/react-native/docs/getting-started.html

import React, { Component } from 'react';
import Icon from  'react-native-vector-icons/MaterialIcons';

import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import TodoModel from './components/TodoModel';
import OmniBox from './components/OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './components/ListViewItem';
import Utils from './components/Utils';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        // <Text>Open up App.js to start working on your app!</Text>
        // <Text>Changes you make will automatically reload.</Text>
        // <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

let dataList = [
  new TodoModel('Hello Koding'),
  new TodoModel('Make a Todo App with React Native'),
  new TodoModel('Check to complete a todo'),
  new TodoModel('Long press, drag and drop a todo to sort'),
  new TodoModel('Save data with Realm'),
  new TodoModel('Sync data with Firebase')
];

var dataListOrder = getOrder(dataList);

function getOrder(list) {
  return Object.keys(list);
}

function moveOrderItem(listView, fromIndex, toIndex) {
  Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
  if (listView.forceUpdate) listView.forceUpdate();
}

class ListView extends Component {
  constructor(props) {
    super(props);
    this.updateDataList = this.updateDataList.bind(this);
    this.state = {
      dataList: dataList
    }
  }

  updateDataList(dataList) {
    dataListOrder = getOrder(dataList);
    this.setState({
      dataList: dataList
    });
  }

  _onCompletedChange(dataItem, index) {
    // let fromIndex = dataListOrder.indexOf(index);
    // let toIndex = dataItem.completed ? dataListOrder.length - 1 : 0;
    // moveOrderItem(this, fromIndex, toIndex);
  }

  render() {
    let listView = (<View></View>);
    if (this.state.dataList.length) {
      listView = (
        <SortableListView
          ref='listView'
          style={{flex: 1}}
          data={this.state.dataList}
          order={dataListOrder}
          onRowMoved={e => moveOrderItem(this, e.from, e.to)}
          renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} dataIndex={index} />}
        />
      );
    }

    return (
        <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
          <OmniBox
            data={dataList}
            updateDataList={this.updateDataList}/>
          {listView}
        </View>
    )
  }
};

module.exports = ListView;
