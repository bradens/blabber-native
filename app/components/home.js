import React from 'react-native';
import Feed from './feed';
import Communicator from './communicator';
import Sidebar from './sidebar';
import Drawer from 'react-native-drawer';

const { ScrollView, Component, View, Text, StyleSheet, StatusBarIOS } = React

export default class Home extends Component {
  onOpen() {
    StatusBarIOS.setHidden(true, 'slide');
  }

  onClose() {
    StatusBarIOS.setHidden(false, 'slide');
  }

  _scrollToInput = (inputRef) => {
    var scrollView = this.refs.scrollView.getScrollResponder();
    scrollView.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(inputRef),
      20, // adjust depending on your contentInset
      /* preventNegativeScrollOffset */ true
    );
  }

  onFocused = (inputRef) => {
    this._scrollToInput(inputRef);
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
        <ScrollView ref='scrollView' style={styles.container}>
          <Feed ref='feed' {...this.props} />
          <Communicator onFocused={this.onFocused} {...this.props} />
        </ScrollView>
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
