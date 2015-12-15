'use strict'
import { Provider } from 'react-redux/native';
import Server from './app/server';
import React from 'react-native';
import configureStore from './app/store/configureStore';
import App from './app/containers/app';

const store = configureStore();
Server.init(store);

var {
  AppRegistry
} = React;

class Blabber extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BlabberNative', () => Blabber);
