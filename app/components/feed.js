import React from 'react-native';
import _ from 'lodash';

const { Component, Text, StyleSheet, View, ScrollView } = React;

export default class Feed extends Component {
  // Use this to keep our list always scrolled to the bottom
  componentDidUpdate() {
    let innerScrollView = this._scrollView.refs.InnerScrollView;
    let scrollView = this._scrollView.refs.ScrollView;

    requestAnimationFrame(() => {
      innerScrollView.measure((innerScrollViewX, innerScrollViewY, innerScrollViewWidth, innerScrollViewHeight) => {
        scrollView.measure((scrollViewX, scrollViewY, scrollViewWidth, scrollViewHeight) => {
          var scrollTo = innerScrollViewHeight - scrollViewHeight + innerScrollViewY;

          if (innerScrollViewHeight < scrollViewHeight) {
              return;
          }

          this._scrollView.scrollTo(scrollTo);
        });
      });
    });
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
      <ScrollView
        ref={component => this._scrollView = component }
        style={styles.feed}
        showsHorizontalScrollIndicators={false}>
        { this.props.messages.map((message, i) => this.renderMessage(message, i)) }
      </ScrollView>
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
