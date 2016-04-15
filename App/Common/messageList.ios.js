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
  Image,
  ListView,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  Easing,
} from 'react-native';


var Button = require('react-native-button');
var viewWidth;

var headImageData = [{headImageIcon : 'http://localhost:8081/App/Common/head01.jpg',name:'Simon',audiolength:20},
                     {headImageIcon : 'http://localhost:8081/App/Common/head02.jpg',name:'Lily',audiolength:60},
                     {headImageIcon : 'http://localhost:8081/App/Common/head03.jpg',name:'Lucy',audiolength:34},
                     {headImageIcon : 'http://localhost:8081/App/Common/head04.jpg',name:'Body',audiolength:25},
                     {headImageIcon : 'http://localhost:8081/App/Common/head05.jpg',name:'Andrson',audiolength:80}];

var MessageListView = React.createClass({
    
    getInitialState: function(){
    return {
        fadeInOpacity: new Animated.Value(0), //设置动画的初始值
        
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1,row2)=>row1 !== row2,
      }).cloneWithRows(headImageData),
      loaded: false,
    };
  },
  
  componentDidMount() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1, // 目标值
            duration: 1500, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start();
    },
  
  render() {
    return (
      <View style={styles.container}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItemMessage}
        style={styles.ListViewStyle}
        />
        <View style = {styles.bottomView}>
            <TouchableOpacity onPress={this._auto}>
                <Image style = {styles.playIcon} source = {require('./player.png')}/>
            </TouchableOpacity>
            <Text style = {{height:30,width:50,marginLeft:10,marginTop:62}}>
            auto
            </Text>
           
            <TouchableOpacity onPress={this._writeMessage}>
                <Image style = {styles.submitIcon} source={require('./sendmessage.jpg')}/>
            </TouchableOpacity>
        </View>
      </View>
    );
  },
  
  renderItemMessage: function(headImage){
      console.log(headImage.headImageIcon);
      viewWidth = 60+headImage.audiolength*3;
    return(
      <View style={styles.meesageCellView}>   
        <Image style = {{height:66,width:viewWidth,borderRadius:33,}} source={require('./messagebackgroundimage.png')}>
            <Animated.View style={[styles.demo, {opacity: this.state.fadeInOpacity}]}>
                <Image style = {{height:60,width:60,borderRadius:30,backgroundColor:'rgba(216,216,216,0.4)',marginTop:3,marginLeft:(viewWidth-60)/2,}}>
                    <TouchableHighlight onPress={this._readMessage.bind(this,headImage.name)}>
                        <Image style = {{height:60,width:60,borderRadius:30,backgroundColor:'green'}} source={{uri:headImage.headImageIcon}}/>
                    </TouchableHighlight>
                </Image>
            </Animated.View>
          </Image>
        <Text style = {styles.username}>
        {headImage.name}
        </Text>
      </View>
      );
  },
  _auto(){
      console.log('**********_auto');
  },
  _writeMessage(){
      console.log('**********_writeMessage');
  },
  _readMessage(name){
      console.log('**********'+name);
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottomView:{
      flex:1.5,
      flexDirection:'row',
      height:120,
      width:375,
  },
  submitIcon:{
      height:80,
      width:80,
      borderRadius:40,
      marginLeft:50,
      marginTop:15,
  },
  playIcon:{
      height:30,
      width:30,
      marginLeft:5,
      marginTop:55,
  },
  ListViewStyle:{
      flex:8.5,
      marginTop:50,
  },
  meesageCellView:{
      height:100,
      width:375,
      justifyContent:'center',
      alignItems:'center',
  },
//   messagebackview:{
//       height:66,
//       width:viewWidth,
    //   backgroundColor:'rgba(230,230,230,0.8)',
    //   borderWidth:10,
    //   borderLeftColor:'rgba(0,0,0,0.1)',
    //   borderRightColor:'rgba(255,255,255,0.1)',
//       borderRadius:33,
//   },
//   headImageStyle:{
//       height:60,
//       width:60,
//       borderRadius:30,
//       backgroundColor:'green',
//       marginTop:3,
//       marginLeft:(viewWidth-60)/2,
//   },
  username:{
      height:20,
      width:300,
      textAlign:'center',
      
  }
});
export default MessageListView;
