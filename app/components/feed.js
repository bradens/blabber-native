import InvertibleScrollView from 'react-native-invertible-scroll-view';
import React from 'react-native';
import _ from 'lodash';

const { Component, Text, StyleSheet, View, ScrollView } = React;

export default class Feed extends Component {
  // use this to keep our list always scrolled to the bottom
  componentDidUpdate() {
    window.scroller = this.refs.feed
    this.refs.feed.scrollTo(0);
  }

  renderMessage = (message, index) => {
    let messageStyles = [styles.message]
    index !== this.props.messages.length ? messageStyles.push({ borderBottomWidth: 1, borderBottomColor: '#eee' }) : null;
    return (
      <View key={index} style={messageStyles}>
        <Text style={styles.messageUser}>{ message.user.username }</Text>
        <Text style={styles.messageContent}>{ message.body }</Text>
      </View>
    );
  }

  render() {
    return (
      <InvertibleScrollView
        ref='feed'
        style={styles.feed}
        renderScrollView={
          (props) => <InvertibleScrollView {...props} inverted />
        }
        showsHorizontalScrollIndicators={false}>
        { this.props.messages.map((message, i) => this.renderMessage(message, i)) }
      </InvertibleScrollView>
    );
  }
}

const styles = StyleSheet.create({
  feed: {
    flex: 1
  },
  message: {
    backgroundColor: 'whitesmoke',
    padding: 10
  },
  messageContent: {
    color: '#666'
  },
  messageUser: {
    fontWeight: 'bold'
  }
});
