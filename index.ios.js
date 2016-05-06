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
import ConnectView from './App/Common/connect.ios';

var {
    CommunicationManager
} = require('NativeModules');
var Button = require('react-native-button');
var responseData = [{name : 'row one'},{name : 'row two'},{name : 'row three'}];
var hostIp;
var port;

var UserListView = React.createClass({
    
  getInitialState: function(){
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      CommunicationManager.get(this.getFontCallback);
    return {
         dataSource: ds.cloneWithRows([responseData]),
    };
  },  
  getFontCallback: function(results){
      if(results !== null || results !== undefined ||results != ''){
      responseData=[];
      var namestr = results.split(",");
      
      for(var i = 0;i < namestr.length;i++)
      {
          responseData.push({name:namestr[i]});
      }
      console.log(responseData);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource:   ds.cloneWithRows(responseData)  });
      }
      else{
          AlertIOS.alert('没有找到用户！！');
      }
      
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
  CommunicationManager.connect(hostIp, (text) => {
       this.setState({text});
       console.log('4444444444444%s',this.state.text);
       
            // if(this.state.text === 'connect')
            // {
              if(name == '192.168.31.221')
              {
                this.props.navigator.push({
                      component:MessageListView,
                      title: name
                  })
              }
              else
              {
                this.props.navigator.push({
                      component:ConnectView,
                      title: name
                  })
              }
              
            // }
          });
            
            
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
                rightButtonTitle: 'setting!',
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
      textAlign:'left',
      borderRadius:8,
      marginTop:20,
      padding:10,
  },

});

AppRegistry.registerComponent('ReactNativeGlood', () => ReactNativeGlood);

