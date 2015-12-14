import React from 'react-native';
import { Provider } from 'react-redux/native';
import Server from './server';
import configureStore from './store/configureStore';

const { Component, View, Text } = React

const store = configureStore();
Server.init(store);

export default class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}
