package com.reduxtest.actions;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import android.media.MediaPlayer;
import android.net.Uri;
import android.text.TextUtils;
import android.widget.Toast;
import android.util.Log;

import android.content.Context;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class RecordModule extends ReactContextBaseJavaModule {
    private Callback callback;
    private static final String TAG = RecordModule.class.getSimpleName();
    private ExtAudioRecorder exRecorder = null;
    private Context context;
    private String WavAudioName;
    private String AudioName;
    private String fileBasePath = "";
    private MediaPlayer mediaPlayer;
    private WritableMap callbackMap;
    Map<String, MediaPlayer> playerPool = new HashMap<>();

    public RecordModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        mediaPlayer = new MediaPlayer();
    }

    @Override
    public String getName() {
        return "RecordAudio";
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

    @ReactMethod
    public void startRecord(String fileName, Callback callback) {
        this.callback = callback;
        WritableMap callbackMap = Arguments.createMap();
        if (fileName == null || fileName == "" || fileName.equals("null") || fileName == "null")
            fileName = "recordKeyeeApp_" + data();
        if (!fileName.endsWith(".wav"))
            fileName += ".wav";
        try {
            fileBasePath = "/mnt/sdcard/" + this.getReactApplicationContext().getPackageName() + "/audioCache/";
            // fileBasePath = this.getReactApplicationContext().getFilesDir().getCanonicalPath() + "/audioCache/";
            File fileCreate = new File(fileBasePath);
            if (!fileCreate.exists()) {
                fileCreate.mkdirs();
            }
        } catch (Exception ex) {
            callbackMap.putBoolean("success", false);
            callbackMap.putString("param", "create audioCache failed!");
            callback.invoke(callbackMap);
            return;
        }
        WavAudioName = fileBasePath + fileName;
        AudioName = fileName;
        if (exRecorder != null) {
            exRecorder.release();
            exRecorder = null;
        }
        File file = new File(WavAudioName);
        if (file.exists()) {
            file.delete();
        }
        exRecorder = ExtAudioRecorder.getInstanse(false);
        exRecorder.setOutputFile(WavAudioName);
        exRecorder.prepare();
        exRecorder.start();

        callbackMap.putBoolean("success", true);
        callbackMap.putString("param", "Successfully started.");
        callbackMap.putString("name", AudioName);
        callback.invoke(callbackMap);
    }

    @ReactMethod
    public void stopRecord(Callback callback) {
        WritableMap callbackMap = Arguments.createMap();
        if (exRecorder == null || exRecorder.getState() != ExtAudioRecorder.State.RECORDING) {
            callbackMap.putBoolean("success", false);
            callbackMap.putString("param", "未正确开始录音,或发生错误.");
            callback.invoke(callbackMap);
            return;
        }
        exRecorder.stop();
        exRecorder.release();
        exRecorder = null;
        callbackMap.putBoolean("success", true);
        callbackMap.putString("param", WavAudioName);
        callbackMap.putString("name", AudioName);
        callback.invoke(callbackMap);
    }

    @ReactMethod
    public void clearCache(Callback callback) {
        try {
            fileBasePath = "/mnt/sdcard/" + this.getReactApplicationContext().getPackageName() + "/audioCache/";
            File file = new File(fileBasePath + "/audioCache");
            if (!file.exists()) {
                callback.invoke(true);
                return;
            }
            boolean success = DeleteRecursive(file);
            callback.invoke(success);
        } catch (Exception ex) {
            ex.printStackTrace();
            callback.invoke(false);
        }
    }

    @ReactMethod
    public void playRecord(String playName, final Callback callBack) {
        this.callback = callBack;
        callbackMap = Arguments.createMap();
        MediaPlayer player = this.playerPool.get(playName);
        if (player == null) {
            player = prepare(playName, playName);
        }
        if (player == null) {
            callbackMap.putString("name", "播放创建失败");
            callback.invoke(callbackMap);
            return;
        }
        if (player.isPlaying()) {
            player.stop();
            callbackMap.putString("name", "播放停止");
            callback.invoke(callbackMap);
            return;
        }
        player.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mp) {
                if (!mp.isLooping()) {
                    callbackMap.putString("name", "播放完毕");
                    callback.invoke(callbackMap);
                }
            }
        });
        player.setOnErrorListener(new MediaPlayer.OnErrorListener() {
            @Override
            public boolean onError(MediaPlayer mp, int what, int extra) {
                callbackMap.putString("name", "播放出错");
                callback.invoke(callbackMap);
                return true;
            }
        });
        player.start();
    }

    @ReactMethod
    public void accessFileName(Callback callback) {
        if (TextUtils.isEmpty(fileBasePath))
            fileBasePath = "/mnt/sdcard/" + this.getReactApplicationContext().getPackageName() + "/audioCache/";
        callbackMap = Arguments.createMap();
        File f = new File(fileBasePath);
        File[] files = f.listFiles();// 列出所有文件
        if (files == null) {
            callbackMap.putString("name", "没有数据");
            callback.invoke(callback);
            return;
        }
        String str = "";
        for (int i = 0; i < files.length; i++) {
            str += files[i].getName() + "|";
        }
        str = str.substring(str.length() - 1, str.length()).equals("|") ? str.substring(0, str.length() - 1) : str;
        callbackMap.putString("name", "有数据");
        callbackMap.putString("param", str);
        callback.invoke(callbackMap);
    }

    public MediaPlayer prepare(final String fileName, final String key) {
        MediaPlayer player = createMediaPlayer(fileName);
        if (player == null) {
            return null;
        }
        this.playerPool.put(key, player);
        return player;
    }

    protected MediaPlayer createMediaPlayer(final String fileName) {
        if (TextUtils.isEmpty(fileBasePath))
            fileBasePath = "/mnt/sdcard/" + this.getReactApplicationContext().getPackageName() + "/audioCache/";
        MediaPlayer player = new MediaPlayer();
        File file = new File(fileBasePath, fileName);
        if (file.exists()) {
            try {
                player.reset();
                FileInputStream fis = new FileInputStream(file);
                player.setDataSource(fis.getFD());
                player.prepare();
                return player;
            } catch (IOException e) {
                return null;
            }
        }
        return null;
    }

    private boolean DeleteRecursive(File fileOrDirectory) {
        if (fileOrDirectory.isDirectory()) {
            for (File child : fileOrDirectory.listFiles()) {
                DeleteRecursive(child);
            }
        }
        return fileOrDirectory.delete();
    }

    private String data() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date curDate = new Date(System.currentTimeMillis());//获取当前时间
        String data = formatter.format(curDate);
        return data;
    }
}
