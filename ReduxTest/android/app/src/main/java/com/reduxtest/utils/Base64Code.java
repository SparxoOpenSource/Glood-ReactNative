package com.reduxtest.utils;

import android.util.Base64;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

/**
 * Created by Sparxo_Android on 2016/5/20.
 */
public class Base64Code {
    /**
     * encodeBase64File:(将文件转成base64 字符串)
     *
     * @param path 文件路径
     * @return
     */
    public static String encodeBase64File(String path) {
        try {
            File file = new File(path);
            FileInputStream inputFile = new FileInputStream(file);
            byte[] buffer = new byte[(int) file.length()];
            inputFile.read(buffer);
            inputFile.close();
            return Base64.encodeToString(buffer, Base64.DEFAULT);
        } catch (Exception e) {
            Log.e("encodeBase64File", e.getMessage());
            return "null";
        }
    }

    /**
     * decoderBase64File:(将base64字符解码保存文件). <br/>
     *
     * @param base64Code 编码后的字串
     * @param savePath   文件保存路径
     */
    public static Boolean decoderBase64File(String base64Code, String savePath) {
        try {
            byte[] buffer = Base64.decode(base64Code, Base64.DEFAULT);
            FileOutputStream out = new FileOutputStream(savePath);
            out.write(buffer);
            out.close();
            return true;
        } catch (Exception e) {
            Log.e("decoderBase64File", e.getMessage());
            return false;
        }

    }
}
