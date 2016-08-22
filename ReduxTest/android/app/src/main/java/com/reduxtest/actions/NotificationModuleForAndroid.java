package com.reduxtest.actions;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by Sparxo_Android_SSD on 2016/8/17.
 */
public class NotificationModuleForAndroid extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;

    public NotificationModuleForAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        return "NotificationFCM";
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

    @ReactMethod
    public void clickNotification(ReadableMap messageBody) {
        String title = messageBody.getString("title");
        String body = messageBody.getString("body");
    }
}
