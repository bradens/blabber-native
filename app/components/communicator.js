import React, { Component, View, StyleSheet, TextInput, PropTypes } from 'react-native';

export default class Communicator extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    onFocused: PropTypes.func.isRequired
  }

  state = { message: '' }

  onChange = (text, e) => {
    this.setState({ message: text })
  }

  sendMessage = () => {
    if (this.state.message === "" || !this.state.message)
      return

    this.props.sendMessage(this.props.currentUser, this.state.message);
    this.setState({ message: null })
  }

  render() {
    return (
      <View style={styles.communicator}>
        <TextInput
          ref="input"
          onFocus={() => this.props.onFocused(this.refs.input)}
          value={this.state.message}
          style={styles.input}
          onChangeText={this.onChange}
          blurOnSubmit={false}
          placeholder='Enter a message'
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={this.sendMessage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  communicator: {
    flex: 0,
  },
  input: {
    height: 38,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15
  }
});
