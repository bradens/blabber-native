import _ from 'lodash';
import Dimensions from 'Dimensions';

import React, {
  Component,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  PropTypes,
  TextInput,
  ScrollView,
  PixelRatio
} from 'react-native';

const window = Dimensions.get('window');

export default class Sidebar extends Component {
  static propTypes = {
    users: PropTypes.array,
    currentUser: PropTypes.object
  }

  state = {
    changingCurrentUser: false,
    username: ''
  }

  toggleChangingCurrentUser = () => {
    this.setState({ changingCurrentUser: !this.state.changingCurrentUser })
  }

  onKeyPress = (e) => {
    let key = e.nativeEvent.key
    // Esc
    if (key === 'Esc')
      this.toggleChangingCurrentUser()
    // Enter
    else if (key === 'Enter') {
      // Can't steal someone's username
      if (_.find(this.props.users, (u) => u.username === this.state.username)) return false
      this.props.setCurrentUser({ user_id: this.props.currentUser.id, username: this.state.username })
      this.toggleChangingCurrentUser();
    }
  }

  onChangeUsername = (text) => {
    this.setState({ username: text });
  }

  render() {
    return (
      <View style={styles.sidebar}>
        <Text style={styles.header}>Members</Text>
        <ScrollView style={styles.membersList}>
          { this.props.users.map((u, i) => {
              return (
                <View key={i} style={styles.membersListItem}>
                  <Text style={styles.membersListItemText}>{ u.username }</Text>
                  <View style={styles.membersListItemOrb}></View>
                </View>
              );
          })}
        </ScrollView>
        <View style={styles.setUser}>
          { this.state.changingCurrentUser ?
            <View >
              <TextInput
                style={styles.input}
                onChangeText={this.onChangeUsername}
                autoFocus={true}
                onBlur={this.toggleChangingCurrentUser}
                value={this.state.username}
                onKeyPress={this.onKeyPress} />
            </View>
            :
              <View style={styles.wrapper}>
                <Text style={styles.currentUser}>{ this.props.currentUser.username || 'anonymous' }</Text>
                <TouchableHighlight onPress={this.toggleChangingCurrentUser} style={styles.changeUserButton}>
                  <Text style={{ color: '#3498db' }}>Change</Text>
                </TouchableHighlight>
              </View>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#454545',
    height: window.height,
    width: window.width,
    paddingTop: 10
  },
  header: {
    fontSize: 20,
    color: '#efefef',
    flex: 0,
    paddingHorizontal: 5,
    paddingBottom: 10
  },
  membersList: {
    flex: 1,
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)'
  },
  membersListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    flex: 1,
  },
  membersListItemText: {
    color: '#efefef',
  },
  membersListItemOrb: {
    marginLeft: 5,
    height: 12 / PixelRatio.get(),
    width: 12 / PixelRatio.get(),
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#efefef',
    backgroundColor: '#27ae60',
    borderRadius: 6 / PixelRatio.get()
  },
  setUser: {
    flex: 0,
    height: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)'
  },
  wrapper: {
    height: 40,
    padding: 10,
    flexDirection: 'row'
  },
  input: {
    height: 40,
    color: '#efefef',
    paddingLeft: 10
  },
  currentUser: {
    color: '#efefef',
    marginRight: 5
  }
});
