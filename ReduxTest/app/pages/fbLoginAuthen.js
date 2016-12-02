import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  WebView
} from 'react-native';
import { getObtain_local_access_token, postJsonSignup_external,getJsonEvents_url,getQueryString } from '../utils/NetUtil';
import { Common } from "./common";
import { LoadingView } from "../components/LoadingView";
import Singleton from '../utils/Singleton';
var singleton = new Singleton();
const {width, height} = Dimensions.get('window');
var isLoaded = false;
var _this = this;
export class FbLoginAuthen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: true
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Common  />
        <WebView
          ref="webviewbridge"
          startInLoadingState={true}
          renderLoading={this._renderLoading.bind(this)}
          onLoad={this._onLoad.bind(this)}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          javaScriptEnabled={true}
          source={{
            method: "get",
            uri: "https://identity.sparxo.com/oauth2/external_login?provider=Facebook&redirect_uri=https://a.sparxo.com&client_id=1"
            // uri: "https://www.baidu.com"
          }} />
      </View>
    );
  }
  _renderLoading() {
    return (<LoadingView />);
  }
  _onNavigationStateChange(obj) {
    if (isLoaded) {
      let url = obj.url;
      console.log("_onNavigationStateChange obj ", obj);
      let external_access_token =getQueryString(url).external_access_token;
      let provider = getQueryString(url).provider;
      let has_local_account = getQueryString(url).has_local_account;
      let hasAccount = true;
      if (has_local_account) {
        hasAccount = (has_local_account != "False");
      }
      console.log("_onNavigationStateChange obj ", obj);
      console.log("_onNavigationStateChange url ", url);
      console.log("external_access_token ", external_access_token);
      console.log("provider ", provider);
      console.log("&has_local_account ", has_local_account, "hasAccount", hasAccount);
      if (external_access_token && provider && hasAccount) {//存在 账户
        let client_id = "1";
        let params = "external_access_token=" + external_access_token + "&provider=" + provider + "&client_id=" + client_id
        getObtain_local_access_token(params, (sData) => {
          console.log("getObtain_local_access_token sData", sData);
          let access_token = sData.result.access_toFken;
          console.log("getObtain_local_access_token access_token", access_token);
          singleton.setAccessToken(access_token);
          singleton.setTitle("Crazy May Fest 2017");
          singleton.getNav().replace({
            name: "DrawerMe"
          });
        },
          (eData) => { console.log("external_access_token eData", eData); });
      } else if (external_access_token && provider) {//不存在账户去注册
        let params = {};
        params.external_access_token = external_access_token;
        params.provider = provider;
        postJsonSignup_external(params, (sData) => {
          console.log("postJsonSignup_external sData", sData);
          if (sData.success) {
            let client_id = "1";
            let params = "external_access_token=" + external_access_token + "&provider=" + provider + "&client_id=" + client_id
            _this.NetUtil.getObtain_local_access_token(params, (sData) => { console.log("getObtain_local_access_token sData", sData); }, (eData) => { console.log("external_access_token eData", eData); });
          } else {
            console.log("postJsonSignup_external success is false");
          }
        }, (eData) => { console.log("postJsonSignup_external eData", eData); });
      } else {//多次navigationstateChange need onloaded turn on "isLoaded" is false
        isLoaded = false;
      }
    } else {//还在加载中
      // this.setState({
      //   isLoading: true
      // });
    }
  }
  _onLoad(obj) {
    // this.setState({
    //   isLoading: false
    // });
    isLoaded = true;
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 7,
    flexDirection: "column",
    width: width,
    height: height,
  }
});    

// module.exports = FbLoginAuthen; //这句代码坑惨了我