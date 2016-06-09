package com.reduxtest.actions;

import android.view.View;

import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.reduxtest.view.WaveformViewY;

/**
 * Created by Sparxo_Android on 2016/6/7.
 */
public class ReactWaveManager extends SimpleViewManager<WaveformViewY> {
    public static final String REACT_CLASS = "RCTWaveView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WaveformViewY createViewInstance(ThemedReactContext reactContext) {
        WaveformViewY waveformViewY = new WaveformViewY(reactContext);
        return waveformViewY;
    }

    @ReactProp(name = "backgroundColor", defaultFloat = 0f)
    public void setBackgroundColor(WaveformViewY view, int backgroundColor) {
        super.setBackgroundColor(view, backgroundColor);
    }

}
