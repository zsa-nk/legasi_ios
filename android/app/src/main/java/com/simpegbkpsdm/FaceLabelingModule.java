package com.simpegbkpsdm;

//import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
//import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Arguments;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.content.Context;
//import android.media.Image;
import android.net.Uri;
//import android.os.Build;

//import androidx.annotation.RequiresApi;

import android.util.Log;
//import android.util.SparseIntArray;
//import android.view.Surface;

//import java.util.Stack;
import java.util.List;
import java.io.File;
//import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
//import java.nio.ByteBuffer;


//import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
//import com.google.android.gms.tasks.Task;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.label.ImageLabel;
import com.google.mlkit.vision.label.ImageLabeler;
import com.google.mlkit.vision.label.ImageLabeling;
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions;


import static android.graphics.BitmapFactory.decodeFile;

import androidx.annotation.NonNull;

public class FaceLabelingModule extends ReactContextBaseJavaModule {
   Context context;
   private Bitmap mBitmap;
   
   FaceLabelingModule(ReactApplicationContext context) {
    super(context);
    this.context = context.getApplicationContext();
   }

   @Override
   @NonNull
   public String getName() {
    return "FaceLabelingModule";
   }

   @ReactMethod
   public void imageFromPath(String path, Promise promise) {
    int rotationDegree = 0;
    try {
        Uri filePath = Uri.parse(path);
        Log.d("face-labeling:uri", path);
        if(!path.equals("")){
            this.mBitmap = this.resizeImage(new File(filePath.getPath()), filePath.getPath());
            InputImage image = InputImage.fromBitmap(this.mBitmap, rotationDegree);

            ImageLabeler labeler = ImageLabeling.getClient(ImageLabelerOptions.DEFAULT_OPTIONS);
            labeler.process(image)
            .addOnSuccessListener(new OnSuccessListener<List<ImageLabel>>() {
                @Override
                    public void onSuccess(List<ImageLabel> labels) {
                    // [START get_image_label_info]
                    // WritableMap params = Arguments.createMap();
                    // List result = new List();
                    WritableArray result = Arguments.createArray();
                    String keyText = "text";
                    String keyConfidence = "confidence";
                    String keyIndex = "index";

                    for (ImageLabel label : labels) {

                        String text = label.getText();
                        float confidence = label.getConfidence();

                        WritableMap item = Arguments.createMap();
                        item.putString(keyText, String.valueOf(text));
                        item.putDouble(keyConfidence, confidence);
                        item.putDouble(keyIndex, confidence);

                        result.pushMap(item);
                    }

                    promise.resolve(result);
                    // [END get_image_label_info]
                }
            });
        }
    } catch (Exception e) {
        e.printStackTrace();
        promise.reject(e.getMessage());
    }
   }

   public static Bitmap resizeImage(File imageFile, String path) {
       BitmapFactory.Options options = new BitmapFactory.Options();
       options.inJustDecodeBounds = true;
       decodeFile(path, options);   

       int photoW = options.outWidth;
       int photoH = options.outHeight;

       options.inJustDecodeBounds = false;
       options.inSampleSize = Math.min(photoW / 320, photoH / 480);
       return compressImage(imageFile, BitmapFactory.decodeFile(path, options));
   }

   private static Bitmap compressImage(File imageFile, Bitmap bmp) {
    try {
        FileOutputStream fos = new FileOutputStream(imageFile);
        bmp.compress(Bitmap.CompressFormat.JPEG, 80, fos);
        fos.close();
    } catch (IOException e) {
        e.printStackTrace();
    } 
    return bmp;
   }
}