package com.reduxtest.actions;

import android.content.Intent;
import android.content.SharedPreferences;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.reduxtest.utils.AudioFileFunc;
import com.reduxtest.utils.Base64Code;
import com.reduxtest.utils.DataTimeUtils;
import com.reduxtest.utils.IPAddress;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class RecordModule extends ReactContextBaseJavaModule {
    private Callback callback;
    private static final String TAG = RecordModule.class.getSimpleName();
    private ExtAudioRecorder exRecorder = null;
    private ReactApplicationContext context;
    private String WavAudioName;
    private String AudioName;
    private String fileBasePath = "";
    private MediaPlayer mediaPlayer;
    private WritableMap callbackMap;
    private Map<String, MediaPlayer> playerPool = new HashMap<>();
    private Date startDate;
    private Date stopDate;
    private static final String TestEventName = "TestEventName";
    private MediaRecorder mMediaRecorder;

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
        if (!TextUtils.isEmpty(fileName)) {
            fileName = "recordKeyeeApp_" + fileName + "_" + DataTimeUtils.dataString();
        } else {
            fileName = "recordKeyeeApp_" + DataTimeUtils.dataString();
        }
        fileName = AudioFileFunc.getAMRFilePath(fileName);
        fileBasePath = isFileExists();
        if (TextUtils.isEmpty(fileBasePath)) {
            callbackMap.putBoolean("success", false);
            callbackMap.putString("param", "create audioCache failed!");
            callback.invoke(callbackMap);
            return;
        }
        WavAudioName = AudioFileFunc.getAMRFilePath(fileBasePath + fileName);
        AudioName = fileName;
        if (mMediaRecorder == null)
            createMediaRecord(WavAudioName);
        try {
            mMediaRecorder.prepare();
            mMediaRecorder.start();
            startDate = DataTimeUtils.date();
            callbackMap.putBoolean("success", true);
            callbackMap.putString("param", "Successfully started.");
            callbackMap.putString("name", AudioName);
            callback.invoke(callbackMap);
        } catch (IOException ex) {
            ex.printStackTrace();
            callbackMap.putBoolean("success", false);
            callbackMap.putString("param", "create audioCache failed!");
            callback.invoke(callbackMap);
        }
    }

    private void createMediaRecord(String path) {
         /* ①Initial：实例化MediaRecorder对象 */
        mMediaRecorder = new MediaRecorder();
        /* setAudioSource/setVedioSource*/
        mMediaRecorder.setAudioSource(AudioFileFunc.AUDIO_INPUT);//设置麦克风
        /* 设置输出文件的格式：THREE_GPP/MPEG-4/RAW_AMR/Default
         * THREE_GPP(3gp格式，H263视频/ARM音频编码)、MPEG-4、RAW_AMR(只支持音频且音频编码要求为AMR_NB)
         */
        mMediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.RAW_AMR);
         /* 设置音频文件的编码：AAC/AMR_NB/AMR_MB/Default */
        mMediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
        /**
         * 设置录制的音频采样率。
         */
        mMediaRecorder.setAudioSamplingRate(8000);
        /**
         * 设置录制的音频编码比特率
         */
//        mMediaRecorder.setAudioEncodingBitRate(4);
        /**
         * 设置录制的音频通道数。
         */
        mMediaRecorder.setAudioChannels(1);
         /* 设置输出文件的路径 */
        File file = new File(path);
        if (file.exists()) {
            file.delete();
        }
        mMediaRecorder.setOutputFile(path);
    }

    @ReactMethod
    public void stopRecord(Callback callback) {
        WritableMap callbackMap = Arguments.createMap();
        if (mMediaRecorder == null) {
            callbackMap.putBoolean("success", false);
            callbackMap.putString("param", "未正确开始录音,或发生错误.");
            callback.invoke(callbackMap);
            return;
        }
        mMediaRecorder.stop();
        mMediaRecorder.release();
        mMediaRecorder = null;
        stopDate = DataTimeUtils.date();
        long date = stopDate.getTime() - startDate.getTime();
        if (TextUtils.isEmpty(WavAudioName)) {
            callbackMap.putBoolean("success", false);
            callbackMap.putString("param", WavAudioName);
            callbackMap.putString("name", AudioName);
            callbackMap.putInt("time", 0);
            callbackMap.putString("Base64", "");
            callback.invoke(callbackMap);
        } else {
            Log.i("WavAudioName发", WavAudioName);
            String temp = Base64Code.encodeBase64File(WavAudioName);
            if (TextUtils.isEmpty(temp)) {
                callbackMap.putBoolean("success", false);
                callbackMap.putString("param", WavAudioName);
                callbackMap.putString("name", AudioName);
                callbackMap.putInt("time", 0);
                callbackMap.putString("Base64", temp);
                callback.invoke(callbackMap);
            }
            callbackMap.putBoolean("success", true);
            callbackMap.putString("param", WavAudioName);
            callbackMap.putString("name", AudioName);
            callbackMap.putDouble("time", (int) date / 1000 + 0.5);
            callbackMap.putString("Base64", temp);
            callback.invoke(callbackMap);
        }
    }

    @ReactMethod
    public void clearCache(Callback callback) {
        try {
            fileBasePath = isFileExists();
            if (TextUtils.isEmpty(fileBasePath)) {
                callback.invoke(true);
                return;
            }
            File file = new File(fileBasePath);
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
        send();
        stopAllRecord();
        MediaPlayer player = this.playerPool.get(playName);
        if (player == null) {
            player = prepare(playName, playName);
        }
        if (player == null) {
            callbackMap = Arguments.createMap();
            callbackMap.putString("name", "播放创建失败");
            callback.invoke(callbackMap);
            return;
        }
        if (player.isPlaying()) {
            player.stop();
            callbackMap = Arguments.createMap();
            callbackMap.putString("name", "播放停止");
            callback.invoke(callbackMap);
            return;
        }
        player.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mp) {
                if (!mp.isLooping()) {
                    callbackMap = Arguments.createMap();
                    callbackMap.putString("name", "播放完毕");
                    callback.invoke(callbackMap);
                }
            }
        });
        player.setOnErrorListener(new MediaPlayer.OnErrorListener() {
            @Override
            public boolean onError(MediaPlayer mp, int what, int extra) {
                callbackMap = Arguments.createMap();
                callbackMap.putString("name", "播放出错");
                callback.invoke(callbackMap);
                return true;
            }
        });
        player.start();
    }

    @ReactMethod
    public void accessFileName(Callback callback) {
        fileBasePath = isFileExists();
        if (TextUtils.isEmpty(fileBasePath)) {
            callbackMap = Arguments.createMap();
            callbackMap.putString("name", "没有数据");
            callback.invoke(callbackMap);
            return;
        }
        File f = new File(fileBasePath);
        if (!f.exists()) {
            f.mkdirs();
        }
        File[] files = f.listFiles();// 列出所有文件
        if (files == null) {
            callbackMap = Arguments.createMap();
            callbackMap.putString("name", "没有数据");
            callback.invoke(callbackMap);
            return;
        }
        WritableArray array = Arguments.createArray();
        for (int i = 0; i < files.length; i++) {
            MediaPlayer prepare = prepare(files[i].getName(), files[i].getName());
            if (prepare != null) {
                String[] temp = files[i].getName().split("_");
                WritableMap str = Arguments.createMap();
                str.putString("name", files[i].getName());
                str.putString("ip", temp[1]);
                str.putDouble("time", prepare.getDuration() / 1000 + 0.5);
                array.pushMap(str);
            }
        }
        if (array.size() > 0) {
            callbackMap = Arguments.createMap();
            callbackMap.putString("name", "有数据");
            callbackMap.putArray("param", array);
        } else {
            callbackMap = Arguments.createMap();
            callbackMap.putString("name", "没有数据");
            callbackMap.putArray("param", array);
        }
        callback.invoke(callbackMap);
    }

    @ReactMethod
    public void recordMsg(String temp) {
        Toast.makeText(getReactApplicationContext(), temp, Toast.LENGTH_SHORT).show();
    }

    public MediaPlayer prepare(final String fileName, final String key) {
        MediaPlayer player = createMediaPlayer(fileName);
        if (player == null) {
            return null;
        }
        this.playerPool.put(key, player);
        return player;
    }

    @ReactMethod
    public void saveRecord(String base64, String ip, Callback callback) {
        String fileName = "recordKeyeeApp_" + ip + "_" + DataTimeUtils.dataString() + ".amr";
        fileBasePath = isFileExists();
        if (TextUtils.isEmpty(fileBasePath)) {
            callbackMap = Arguments.createMap();
            callbackMap.putBoolean("success", false);
            callbackMap.putString("name", fileName);
            callbackMap.putInt("time", 0);
            return;
        }
        if (Base64Code.decoderBase64File(base64, fileBasePath, fileName)) {
            MediaPlayer prepare = prepare(fileName, fileName);
            if (prepare == null) {
                callbackMap = Arguments.createMap();
                callbackMap.putBoolean("success", false);
                callbackMap.putString("name", fileName);
                callbackMap.putInt("time", 0);
                callback.invoke(callbackMap);
                return;
            }
            callbackMap = Arguments.createMap();
            callbackMap.putBoolean("success", true);
            callbackMap.putString("name", fileName);
            callbackMap.putDouble("time", prepare.getDuration() / 1000 + 0.5);
        } else {
            callbackMap = Arguments.createMap();
            callbackMap.putBoolean("success", false);
            callbackMap.putString("name", fileName);
            callbackMap.putInt("time", 0);
        }
        callback.invoke(callbackMap);
    }

    @ReactMethod
    public void getAndroidIpAddress(Callback callback) {
        String result = IPAddress.getAndroidIpAddress(context);
        callbackMap = Arguments.createMap();
        callbackMap.putString("IP", result);
        callback.invoke(callbackMap);
    }

    @ReactMethod
    public void stopAllRecord() {
        if (playerPool == null)
            return;
        for (MediaPlayer value : playerPool.values()) {
            if (value == null)
                return;
            if (value.isPlaying())
                value.stop();
        }
    }

    protected MediaPlayer createMediaPlayer(final String fileName) {
        MediaPlayer player = new MediaPlayer();
        fileBasePath = isFileExists();
        if (TextUtils.isEmpty(fileBasePath)) {
            return null;
        }
        File file = new File(fileBasePath, fileName);
        Log.i("createMediaPlayer", file.getPath());
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

    private String isFileExists() {
        try {
            fileBasePath = "/mnt/sdcard/" + this.getReactApplicationContext().getPackageName() + "/audioCache/";
            File fileCreate = new File(fileBasePath);
            if (!fileCreate.exists()) {
                fileCreate.mkdirs();
            }
            if (!fileCreate.exists()) {
                fileBasePath = this.getReactApplicationContext().getFilesDir().getCanonicalPath() + "/audioCache/";
                fileCreate = new File(fileBasePath);
                if (!fileCreate.exists()) {
                    fileCreate.mkdirs();
                }
            }
            return fileBasePath;
        } catch (IOException e) {
            return "";
        }
    }

    private void send() {
        //发送事件
        WritableMap params = Arguments.createMap();
        params.putString("name", "Jack");
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(TestEventName, params);

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

    @ReactMethod
    public void getNotification(Callback callback) {
        SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences("ACTION", 0);
        if (!TextUtils.isEmpty(sharedPreferences.getString("action", null))) {
            Toast.makeText(getReactApplicationContext(), sharedPreferences.getString("action", null), Toast.LENGTH_SHORT).show();
            WritableMap params = Arguments.createMap();
            params.putString("action", sharedPreferences.getString("action", null));
//            callback.invoke(params);
            sendEvent("FCMNotificationReceived", params);
        }
        sharedPreferences.edit().clear().commit();
    }

    private void sendEvent(String eventName, Object params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
