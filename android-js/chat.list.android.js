/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import {styles} from './android-css/chat.list.css';
class ChatProject extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          在线用户列表
        </Text>
        <TextInput style={styles.welcome}/>
      </View>
    );
  }
}
AppRegistry.registerComponent('ChatProject', () => ChatProject);
