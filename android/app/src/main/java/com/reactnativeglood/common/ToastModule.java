package com.reactnativeglood.common;

import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.MapBuilder;

import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by Sparxo_Android on 2016/4/19.
 */
public class ToastModule extends ReactContextBaseJavaModule {
    private Context context;
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    public ToastModule(ReactApplicationContext reactContext, Context context) {
        super(reactContext);
        this.context = context;
    }

    /**
     * 获取wifi地址
     *
     * @return
     */
    @ReactMethod
    public String show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
        return message;
    }

    @ReactMethod
    public String wifi() {
        String result = null;
        try {
            WifiManager wifi = (WifiManager) context
                    .getSystemService(Context.WIFI_SERVICE);

            WifiInfo info = wifi.getConnectionInfo();
            result = info.getMacAddress();
        } catch (Exception e) {
            result = null;
        }
        return result;
    }

    @Override
    public String getName() {
        return "ToastAndroid";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = MapBuilder.newHashMap();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

    @ReactMethod
    public void gotoIM(Callback callback) {
        callback.invoke("我是毁掉");
    }
}
