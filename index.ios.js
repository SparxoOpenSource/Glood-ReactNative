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
  TextInput,
  ListView,
  NavigatorIOS,
  AlertIOS,
} from 'react-native';

import MessageListView  from './App/Common/messageList.ios';

var Button = require('react-native-button');
var responseData = [{name : 'row one'},{name : 'row two'},{name : 'row three'}];

var UserListView = React.createClass({
    
  getInitialState: function(){
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1,row2)=>row1 !== row2,
      }).cloneWithRows(responseData),
      loaded: false,
    };
  },
  
  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItemHostname}
        style={styles.ListViewStyle}
      />
    );
  },
  renderItemHostname: function(hostname){
    return(
      <View style={styles.container}>                               
        <View style={styles.rightContainer}>
        <Button style={styles.submit} onPress = {this._submitMessage.bind(this,hostname.name)}>
            {hostname.name}
        </Button>
        </View>
      </View>
      );
  },
  

_submitMessage : function (name){
            this.props.navigator.push({
                component:MessageListView,
                title: name
            })
            
    }
});


var ReactNativeGlood = React.createClass({
    onRightButtonPress: function() {
        // this.refs.nav.push({
        //     title: '消息列表页面',
        //     component:MessageListView
        // })
        AlertIOS.alert('setting!!!!!!!');
    },
  render: function() {
    return (
        <NavigatorIOS  ref="nav"
            style={styles.navigator}
            initialRoute={{
                component: UserListView,
                title: '用户列表页面',
                rightButtonTitle: 'SETTING!',
                onRightButtonPress: this.onRightButtonPress
            }}
        />
    );
  }
});


var styles = StyleSheet.create({
    navigator:{
      flex:1,
      height:49,
      backgroundColor:'#F5FCFF',
  },
  container: {
    flex: 2,  
    justifyContent: 'center',  
    alignItems: 'center',      
    flexDirection : 'row',  
  },

  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop : 10,
  },

  ListViewStyle:{
    paddingTop: 20,
  },
  submit:{
      height:40,
      width:300,
      borderColor:'red',
      borderWidth:2,
      textAlign:'center',
      borderRadius:8,
      marginTop:20,
      padding:10,
  },

});

AppRegistry.registerComponent('ReactNativeGlood', () => ReactNativeGlood);

