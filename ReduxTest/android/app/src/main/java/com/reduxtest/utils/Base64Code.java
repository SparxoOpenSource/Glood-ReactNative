package com.reduxtest.utils;

import android.content.Context;
import android.util.Base64;
import android.util.Log;

import com.reduxtest.encoder.BASE64Decoder;
import com.reduxtest.encoder.BASE64Encoder;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

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
            Log.i("encodeBase64File", buffer.toString());
            inputFile.read(buffer);
            inputFile.close();
            String temp = Base64.encodeToString(buffer, Base64.DEFAULT);
            ;
            return temp;
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
    public static boolean decoderBase64File(String base64Code, String savePath, String fileName) {
        try {
//            byte[] buffer = new BASE64Decoder().decodeBuffer(base64Code);
            byte[] buffer = Base64.decode(base64Code, Base64.DEFAULT);
            FileOutputStream out = new FileOutputStream(savePath + fileName);
            out.write(buffer);
            out.close();
            return true;
        } catch (IOException e) {
            return false;
        }
//        try {
//            byte[] data = Base64.decode(base64Code, Base64.DEFAULT);
//            File dirFile = new File(savePath + fileName + ".wav");
//            if (!dirFile.exists()) {
//                dirFile.mkdirs();
//            }
//            if (!dirFile.createNewFile())
//                return false;
//            dirFile = byteToFile(data, dirFile.getAbsolutePath());
//            return true;
//        } catch (Exception e) {
//            return false;
//        }
    }

    //将byte写入文件
    public static File byteToFile(byte[] buf, String filePath) throws Exception {
        BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        file = new File(filePath);
        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }
        if (!file.exists()) {
            file.createNewFile();
        }
        fos = new FileOutputStream(file);
        bos = new BufferedOutputStream(fos);
        bos.write(buf);
        if (bos != null) {
            bos.close();
        }
        if (fos != null) {
            fos.close();
        }
        return file;
    }


    public static String getFileToByte(String path) {
        File file = new File(path);
        byte[] by = new byte[(int) file.length()];
        try {
            InputStream is = new FileInputStream(file);
            ByteArrayOutputStream bytestream = new ByteArrayOutputStream();
            byte[] bb = new byte[2048];
            int ch;
            ch = is.read(bb);
            while (ch != -1) {
                bytestream.write(bb, 0, ch);
                ch = is.read(bb);
            }
            by = bytestream.toByteArray();
            return Base64.encodeToString(by, Base64.DEFAULT);
        } catch (Exception ex) {
            ex.printStackTrace();
            Log.e("文件转换byte失败", ex.getMessage());
            return null;
        }
    }
}
