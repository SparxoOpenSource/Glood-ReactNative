package com.reduxtest.actions;

import android.content.Context;
import android.content.Intent;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

/**
 * Created by Sparxo_Android on 2016/5/19.
 */
public class AndroidInfoModule extends ReactContextBaseJavaModule {
    private Context context;
    private WritableMap callbackMap;

    @Override
    public String getName() {
        return "AndroidInfo";
    }

    public AndroidInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

    @ReactMethod
    public void getAndroidIpAddress(Callback callback) {
        String result = null;
        try {
            WifiManager wifi = (WifiManager) context
                    .getSystemService(Context.WIFI_SERVICE);
            WifiInfo info = wifi.getConnectionInfo();
            result = intToIp(info.getIpAddress());
        } catch (Exception e) {
            result = null;
        }
        callbackMap = Arguments.createMap();
        callbackMap.putString("IP", result);
        callback.invoke(callbackMap);
    }

    private String intToIp(int i) {
        return (i & 0xFF) + "." +
                ((i >> 8) & 0xFF) + "." +
                ((i >> 16) & 0xFF) + "." +
                (i >> 24 & 0xFF);
    }
    /**
     * 此方法是为了解决返回键退出程序后,ToastAndroid不会消失的bug
     */
    @ReactMethod
    public void onBackPressed() {
        Intent setIntent = new Intent(Intent.ACTION_MAIN);
        setIntent.addCategory(Intent.CATEGORY_HOME);
        setIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getCurrentActivity().startActivity(setIntent);

    }
}
