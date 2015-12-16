import React from 'react-native';
import Sidebar from './sidebar';
import Drawer from 'react-native-drawer';
import Dimensions from 'Dimensions';
import Messenger from 'react-native-gifted-messenger';

const { PixelRatio, ScrollView, Component, View, Text, StyleSheet, StatusBarIOS } = React

export default class Home extends Component {
  onOpen() {
    StatusBarIOS.setHidden(true, 'slide');
  }

  onClose() {
    StatusBarIOS.setHidden(false, 'slide');
  }

  onSendMessage = (message, user) => {
    if (message.text === '' || !message.text)
      return

    this.props.sendMessage(this.props.currentUser, message.text);
  }

  render() {
    return (
      <Drawer
        openDrawerOffset={100}
        tapToClose={true}
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.4, shadowRadius: 3}}}
        tweenHandler={Drawer.tweenPresets.parallax}
        content={<Sidebar onFocused={this.onFocused} { ...this.props } />}
        onOpen={this.onOpen}
        onClose={this.onClose}>
        <Messenger
          ref={c => this._Messenger = c}
          messages={this.props.messages.map(m => { return { text: m.body, name: m.user.username, position: this.props.currentUser.user_id === m.user.user_id ? 'right' : 'left' } })}
          handleSend={this.onSendMessage}
          maxHeight={Dimensions.get('window').height - 20}
          senderImage={null}
          autoFocus={false}
          styles={{
            rowContainer: {
              flex: 1,
              flexDirection: 'row',
              marginBottom: 10,
            },
            container: {
              flex: 1,
              backgroundColor: '#fff',
              paddingTop: 24
            },
            textInputContainer: {
              height: 40,
              borderColor: '#ddd',
              flexDirection: 'row',
              paddingLeft: 10,
              paddingRight: 10,
              borderTopWidth: 1,
            },
            bubbleLeft: {
              backgroundColor: '#e6e6eb',
              marginRight: 120,
              marginLeft: 10,
              flex: 0
            },
            name: {
              color: '#aaaaaa',
              fontSize: 12,
              marginLeft: 10,
              marginBottom: 5,
            },
            bubbleRight: {
              backgroundColor: '#007aff',
              marginLeft: 120,
              marginRight: 10,
              flex: 0,
            },
            sendButton: {
              height: 40,
              padding: 10,
              marginLeft: 10
            },
            imagePosition: {
              width: 5
            }
          }} />
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});
