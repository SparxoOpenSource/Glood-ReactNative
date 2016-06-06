#import "RecordAudio.h"
#import "RCTLog.h"
#import "AppDelegate.h"
#import "ShowMessage.h"
#import "NSString+Base64.h"

#import <ifaddrs.h>
#import <arpa/inet.h>

@implementation RecordAudio {
    
    AVAudioSession *recordSession;
    AVAudioRecorder *audioRecorder;
    NSString *pathForFile;
    NSString *newFileName;
    AVAudioPlayer *audioPlayer;
    NSTimer *nstimer;
    NSString *startStr;
    NSString *endStr;
    NSData *wavdata;
}

// Expose this module to the React Native bridge
RCT_EXPORT_MODULE()


- (NSString *)getCachePath
{
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
//    return [NSString stringWithFormat:@"%@/audioCache", documentsDirectory];
    return [NSString stringWithFormat:@"%@", documentsDirectory];
}

+ (void)countDownWithTime:(int)time
           countDownBlock:(void (^)(int timeLeft))countDownBlock
                 endBlock:(void (^)())endBlock
{
  __block int timeout = time; //倒计时时间
  dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
  dispatch_source_t _timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0,queue);
  dispatch_source_set_timer(_timer,dispatch_walltime(NULL, 0),1.0*NSEC_PER_SEC, 0); //每秒执行
  dispatch_source_set_event_handler(_timer, ^{
    if(timeout<=0){ //倒计时结束，关闭
      dispatch_source_cancel(_timer);
      dispatch_async(dispatch_get_main_queue(), ^{
        if (endBlock) {
          endBlock();
        }
      });
    } else {
      dispatch_async(dispatch_get_main_queue(), ^{
        timeout--;
        if (countDownBlock) {
          countDownBlock(timeout);
        }
      });
    }
  });
  dispatch_resume(_timer);
}

// Persist data
#pragma mark ======== 开始录音 ============
RCT_EXPORT_METHOD(startRecord:(NSString *)fileName
                  callback:(RCTResponseSenderBlock)successCallback) {
  
    startStr = @"";
    startStr = [self getTimeNow];
    fileName = @"";
    fileName = [NSString stringWithFormat:@"IOS-%@",[self getTimeNow]];
  
    // Validate the file name has positive length
//    if ([fileName length] < 1 || [fileName isEqualToString:@""] || [fileName isEqualToString:@"null"] || fileName == nil) {
//      fileName = @"";
//      fileName = [NSString stringWithFormat:@"IOS:%@",[self getTimeNow]];
//        // Show failure message
//        NSDictionary *resultsDict = @{
//                                      @"success" : @NO,
//                                      @"param"  : @"Your file does not have a name.",
//                                      };
//        
//        // Javascript error handling
//        successCallback(@[resultsDict]);
//        return;
//        
//    }
  
    NSRange isRangeWav = [fileName rangeOfString:@".wav" options:NSCaseInsensitiveSearch];
    
    if (isRangeWav.location == NSNotFound) {
        fileName = [NSString stringWithFormat:@"%@.wav",fileName];
    }
    
    NSString *cachePath = [self getCachePath];
    BOOL isDir = NO;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    BOOL existed = [fileManager fileExistsAtPath:cachePath isDirectory:&isDir];
    if ( !(isDir == YES && existed == YES) )
    {
        [fileManager createDirectoryAtPath:cachePath withIntermediateDirectories:YES attributes:nil error:nil];
    }
    
    // Create the path that the file will be stored at
    pathForFile = [NSString stringWithFormat:@"%@/%@", cachePath, fileName];
    
    NSURL *audioFileURL = [NSURL fileURLWithPath:pathForFile];
    
    NSDictionary *recordSettings  = [NSDictionary dictionaryWithObjectsAndKeys:
                          [NSNumber numberWithFloat:44100.0],AVSampleRateKey,
                          [NSNumber numberWithInt:2],AVNumberOfChannelsKey,
                          [NSNumber numberWithInt:16],AVLinearPCMBitDepthKey,
                          [NSNumber numberWithInt:kAudioFormatLinearPCM],AVFormatIDKey,
                          [NSNumber numberWithBool:NO], AVLinearPCMIsFloatKey,
                          [NSNumber numberWithBool:0], AVLinearPCMIsBigEndianKey,
                          [NSNumber numberWithBool:NO], AVLinearPCMIsNonInterleaved,
                          [NSData data], AVChannelLayoutKey, nil];
    
    // Initialize the session for the recording
    NSError *error = nil;
    recordSession = [AVAudioSession sharedInstance];
    [recordSession setCategory:AVAudioSessionCategoryPlayAndRecord error:nil];
    [recordSession setActive:YES error:&error];
    
    audioRecorder = [[AVAudioRecorder alloc]
                         initWithURL:audioFileURL
                         settings:recordSettings
                         error:&error];
    audioRecorder.meteringEnabled = YES;
    audioRecorder.delegate = self;
    
    // Validate no errors in the session initialization
    if (error) {
        
        // Show failure message
        NSDictionary *resultsDict = @{
                                      @"success" : @NO,
                                      @"param"  : [error localizedDescription]
                                      };
        
        // Javascript error handling
        successCallback(@[resultsDict]);
        return;
        
    } else {
        
        // prepare the recording
        [audioRecorder prepareToRecord];
        
    }
    
    // if recording is in progress, stop
    if (audioRecorder.recording) {
        
        [audioRecorder stop];
        [recordSession setActive:NO error:nil];
        
    }
    
    // start recording
    [recordSession setActive:YES error:nil];
    [audioRecorder record];
    NSLog(@"录音－－－－－%@",audioFileURL);
    // Craft a success return message
    NSDictionary *resultsDict = @{
                                  @"success" : @YES,
                                  @"param" : @"Successfully started.",
                                  @"name" : fileName
                                  };
    newFileName = fileName;
    // Call the JavaScript sucess handler
    successCallback(@[resultsDict]);
}

// Persist data
#pragma mark ======== 停止录音 ============
RCT_EXPORT_METHOD(stopRecord:(RCTResponseSenderBlock)successCallback) {
  
    endStr = @"";
    endStr = [self getTimeNow];
    // Validate that the file exists
    NSFileManager *fileManager = [NSFileManager defaultManager];
    
    // Check if file exists
    if (![fileManager fileExistsAtPath:pathForFile]){
        
        // Show failure message
        NSDictionary *resultsDict = @{
                                      @"success" : @NO,
                                      @"param"  : @"File does not exist in app documents directory."
                                      };
        
        // Javascript error handling
        successCallback(@[resultsDict]);
        return;
        
    }
    
    // Validate that session and recorder exist to stop
    if (recordSession && audioRecorder) {
        
        // if recording is in progress, stop
        if (audioRecorder.recording) {
          
            [audioRecorder stop];
            [recordSession setActive:NO error:nil];
            
            // Craft a success return message
//          NSString *timerStr;
//          NSArray *array = [[self intervalFromLastDate:startStr toTheDate:endStr] componentsSeparatedByString:@":"];
//          if ([array objectAtIndex:1] == 0)
//          {
//            timerStr = [array objectAtIndex:2];
//          }
//          else
//          {
//            timerStr = [NSString stringWithFormat:@"%ld",[[array objectAtIndex:1] integerValue]*60+[[array objectAtIndex:2] integerValue]];
//          }
          
          wavdata = [fileManager contentsAtPath:pathForFile];
          NSString *aString = [[NSString alloc] initWithData:wavdata encoding:NSUTF8StringEncoding];
          NSString *pictureDataString=[wavdata base64Encoding];
          // NSLog(@"***********data:%@--%@",wavdata,pictureDataString);
          NSURL *audioFileURL = [NSURL fileURLWithPath:pathForFile];
          AVURLAsset* audioAsset =[AVURLAsset URLAssetWithURL:audioFileURL options:nil];
          
          CMTime audioDuration = audioAsset.duration;
          
          float audioDurationSeconds =CMTimeGetSeconds(audioDuration);
          NSString *timeStr = [NSString stringWithFormat:@"%.1f",audioDurationSeconds];
          NSDictionary *resultsDict = @{
                                        @"success" : @YES,
                                        @"param"  : pathForFile,
                                        @"name" : newFileName,
                                        @"time" : timeStr,
                                        @"Base64": pictureDataString
                                        };
         
            
            // Call the JavaScript sucess handler
            successCallback(@[resultsDict]);
            return;
            
        } else {
            
            // Show failure message
            NSDictionary *resultsDict = @{
                                          @"success" : @NO,
                                          @"param"  : @"Recording not in progress. Can not be stopped."
                                          };
            
            // Javascript error handling
          
            successCallback(@[resultsDict]);
            return;
        }
        
    } else {
        
        // Show failure message
        NSDictionary *resultsDict = @{
                                      @"success" : @NO,
                                      @"param"  : @"Recording was not ever started. Can not be stopped."
                                      };
        
        // Javascript error handling
      
        successCallback(@[resultsDict]);
        return;
        
    }
}

#pragma mark ======== 播放录音 ============
RCT_EXPORT_METHOD(playRecord:(NSString *)playName
                  Callback:(RCTResponseSenderBlock)callBack) {
//  playName = newFileName;
  // NSLog(@"*-*-*-*-***--*******  %@",playName);
  // Validate the file name has positive length
  if ([playName length] < 1) {
    
    // Show failure message
    NSDictionary *resultsDict = @{
                                  @"success" : @NO,
                                  @"errMsg"  : @"Your file does not have a name."
                                  };
    
    // Javascript error handling
    callBack(@[resultsDict]);
    return;
    
  }
  
  // Validate the file name has an extension
  NSRange isRange = [playName rangeOfString:@"." options:NSCaseInsensitiveSearch];
  if (isRange.location == 0) {
    
    // Show failure message
    NSDictionary *resultsDict = @{
                                  @"success" : @NO,
                                  @"errMsg"  : @"Your file does not have a valid name and extension."
                                  };
    
    // Javascript error handling
    callBack(@[resultsDict]);
    return;
    
  } else {
    
    if (isRange.location == NSNotFound) {
      
      // Show failure message
      NSDictionary *resultsDict = @{
                                    @"success" : @NO,
                                    @"errMsg"  : @"Your file does not have a valid extension."
                                    };
      
      // Javascript error handling
      callBack(@[resultsDict]);
      return;
    }
    
  }
  
  // Validate for .caf, .mp3, .aac, , .wav, .aiff
  NSRange isRangeCaf = [playName rangeOfString:@".caf" options:NSCaseInsensitiveSearch];
  NSRange isRangeMp3 = [playName rangeOfString:@".mp3" options:NSCaseInsensitiveSearch];
  NSRange isRangeM4a= [playName rangeOfString:@".m4a" options:NSCaseInsensitiveSearch];
  NSRange isRangeWav = [playName rangeOfString:@".wav" options:NSCaseInsensitiveSearch];
  NSRange isRangeAif = [playName rangeOfString:@".aif" options:NSCaseInsensitiveSearch];
  
  if ((isRangeCaf.location == NSNotFound) && (isRangeMp3.location == NSNotFound) && (isRangeM4a.location == NSNotFound) && (isRangeWav.location == NSNotFound) && (isRangeAif.location == NSNotFound)) {
    
    // Show failure message
    NSDictionary *resultsDict = @{
                                  @"success" : @NO,
                                  @"errMsg"  : @"File should be either a .caf, .mp3, .m4a, .wav, or .aif"
                                  };
    
    // Javascript error handling
    callBack(@[resultsDict]);
    return;
    
  }
  
  // Create an array of directory Paths, to allow us to get the documents directory
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  
  // The documents directory is the first item
  NSString *documentsDirectory = [paths objectAtIndex:0];
  
  // Create the path that the file will be stored at
  NSString *pathForFile = [NSString stringWithFormat:@"%@/%@", documentsDirectory, playName];
  
  NSURL *audioFileURL = [NSURL fileURLWithPath:pathForFile];
   NSLog(@"播放－－－－－%@",audioFileURL);
  // Validate that the file exists
  NSFileManager *fileManager = [NSFileManager defaultManager];
  
  // Check if file exists
  NSString * filepath = [self getCachePath];
  BOOL exists = [fileManager fileExistsAtPath:filepath isDirectory:false];
  if (!exists){
    
    // Show failure message
    NSDictionary *resultsDict = @{
                                  @"success" : @NO,
                                  @"errMsg"  : @"File does not exist in app documents directory."
                                  };
    
    // Javascript error handling
    callBack(@[resultsDict]);
    return;
    
  }
  
  NSError *error = nil;
  
  // Check if audioPlayer exists for initialization
//  if (!audioPlayer) {
  
    // NSLog(@"heihiehiehi  %@",audioFileURL);
    audioPlayer = [[AVAudioPlayer alloc]
                   initWithContentsOfURL: audioFileURL
                   error:&error];
//    audioPlayer = [[AVAudioPlayer alloc] initWithData:wavdata error:&error];
    [audioPlayer setDelegate:self];
    
//  }
  
  NSError *audioError = nil;
  BOOL success = [recordSession overrideOutputAudioPort:AVAudioSessionPortOverrideSpeaker error:&audioError];
  if(!success)
    {
       NSLog(@"error doing outputaudioportoverride - %@", [audioError localizedDescription]);
    }
  
  // Validate no errors in the session initialization
  if (error) {
    
    // Show failure message
    NSDictionary *resultsDict = @{
                                  @"success" : @NO,
                                  @"errMsg"  : [error localizedDescription]
                                  };
    
    // Javascript error handling
    callBack(@[resultsDict]);
    return;
    
  } else {
    
    // play the recording
    //准备播放
    [audioPlayer prepareToPlay];
    //播放
    [audioPlayer play];
    
    // Craft a success return message
//    NSDictionary *resultsDict = @{
//                                  @"success" : @YES,
//                                  @"successMsg" : @"Successfully started."
//                                  };
    
    AVURLAsset* audioAsset =[AVURLAsset URLAssetWithURL:audioFileURL options:nil];
    
    CMTime audioDuration = audioAsset.duration;
    
    float audioDurationSeconds =CMTimeGetSeconds(audioDuration);
//    NSString *timeStr = [NSString stringWithFormat:@"%.1f",audioDurationSeconds];
    __block float timeout = audioDurationSeconds+0.5;
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_source_t _timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0,queue);
    dispatch_source_set_timer(_timer,dispatch_walltime(NULL, 0),1*NSEC_PER_SEC, 0);
    dispatch_source_set_event_handler(_timer, ^{
      if(timeout<=0){
//        resultsDict = @{@"name" : @"播放完毕"};
        
        NSDictionary *resultsDict = @{
                                      @"name" : @"播放完毕"
                                      };
        dispatch_source_cancel(_timer);
        callBack(@[resultsDict]);
        dispatch_async(dispatch_get_main_queue(), ^{
//          [ShowMessage showMessage:@"播放完毕"];
        });
      } else {
        dispatch_async(dispatch_get_main_queue(), ^{
          timeout--;
        });
      }
    });
    dispatch_resume(_timer);
    
    // Call the JavaScript sucess handler
    
    
  }
  
}

#pragma mark ======停止播放=============
RCT_EXPORT_METHOD(stopAllRecord)
{
  [audioPlayer stop];
  audioPlayer = nil;
}

//- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag
//{
//  NSDictionary *resultsDict = @{
//                                @"name" : @"播放完毕"
//                                };
//  dispatch_async(dispatch_get_main_queue(), ^
//                 {
//                   [ShowMessage showMessage:@"播放完毕"];
//                   
//                 });
//}

RCT_EXPORT_METHOD(recordMsg:(NSString *)msg)
{

  dispatch_async(dispatch_get_main_queue(), ^
                 {
                   [ShowMessage showMessage:msg];
                   
                 });
}

#pragma mark ======= 获取当前设备ip地址 ======
RCT_EXPORT_METHOD(getAndroidIpAddress:(RCTResponseSenderBlock)callback)
{
  NSString *address = @"error";
  struct ifaddrs *interfaces = NULL;
  struct ifaddrs *temp_addr = NULL;
  int success = 0;
  // retrieve the current interfaces - returns 0 on success
  success = getifaddrs(&interfaces);
  if (success == 0) {
    temp_addr = interfaces;
    while(temp_addr != NULL) {
      if(temp_addr->ifa_addr->sa_family == AF_INET) {
        if([[NSString stringWithUTF8String:temp_addr->ifa_name] isEqualToString:@"en0"]) {
          address = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_addr)->sin_addr)];
        }
      }
      temp_addr = temp_addr->ifa_next;
    }
  }
  freeifaddrs(interfaces);
  
  // NSLog(@"-*-*-*-------ADDRE:%@",address);
  NSDictionary *resultsDict = @{@"IP" : address};
  callback(@[resultsDict]);
}

/*
NSString *codeString = @"Hello world";
NSLog(@"原文--%@",codeString);

NSString *base64Str = [codeString base64EncodedString];
NSLog(@"Base64编码--%@",base64Str);

NSString *decodeStr = [base64Str base64DecodedString];
NSLog(@"Base64解码--%@",decodeStr);
 */

#pragma mark ======= base64转码 ======
RCT_EXPORT_METHOD(saveRecord:(NSString *)base64 addressIp:(NSString *)IP
                  Callback:(RCTResponseSenderBlock)callBack)
{
   NSString *fileName = [NSString stringWithFormat:@"IOS-%@.wav",[self getTimeNow]];
//    NSRange isRangeWav = [fileName rangeOfString:@".wav" options:NSCaseInsensitiveSearch];
    NSString *cachePath = [self getCachePath];
    BOOL isDir = NO;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    BOOL existed = [fileManager fileExistsAtPath:cachePath isDirectory:&isDir];
    if ( !(isDir == YES && existed == YES) )
    {
      [fileManager createDirectoryAtPath:cachePath withIntermediateDirectories:YES attributes:nil error:nil];
    }
    // Create the path that the file will be stored at
  
  
//  NSString *base64Str = [base64 base64EncodedString];
//  NSLog(@"Base64编码--%@",base64Str);
//  
//  NSString *decodeStr = [base64 base64DecodedString];
//  NSLog(@"Base64解码--%@",decodeStr);
  pathForFile = [NSString stringWithFormat:@"%@/%@", cachePath, fileName];
    NSData *sData   = [[NSData alloc] initWithBase64Encoding:base64];
   [sData writeToFile:pathForFile atomically:YES];
  NSURL *audioFileURL = [NSURL fileURLWithPath:pathForFile];
  AVURLAsset* audioAsset =[AVURLAsset URLAssetWithURL:audioFileURL options:nil];
  
  CMTime audioDuration = audioAsset.duration;
  
  float audioDurationSeconds =CMTimeGetSeconds(audioDuration);
  NSString *timeStr = [NSString stringWithFormat:@"%.1f",audioDurationSeconds];

  
    // NSLog(@"-----**-*pathForFile:---%@  sData:%@ -- %@",pathForFile,sData,base64);
    NSDictionary *resultsDict = @{
                                @"success" : @YES,
                                @"name" : fileName,
                                @"time":timeStr
                                };
  // NSLog(@"^^^^^^^^^^^^^^^^^^^^^%f",audioDurationSeconds);
    callBack(@[resultsDict]);
  
}

#pragma mark ======== 清除缓存 ============
RCT_EXPORT_METHOD(clearCache:(RCTResponseSenderBlock)callback)
{
    NSString * filepath = [self getCachePath];
    NSFileManager *manager = [NSFileManager defaultManager];
    BOOL exists = [manager fileExistsAtPath:filepath isDirectory:false];
    if (!exists) {
        NSDictionary *resultsDict=@{
        @"success" : @NO,
        @"messsge" : @"not exist"
        };
        return callback(@[resultsDict]);
    }
    [manager removeItemAtPath:filepath error:nil];
    NSDictionary *resultsDict=@{
    @"success" : @YES,
    @"messsge" : filepath
    };
    callback(@[resultsDict]);
}

//获取当前时间
- (NSString *)getTimeNow
{
  NSString* date;
  
  NSDateFormatter * formatter = [[NSDateFormatter alloc ] init];
  [formatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
  date = [formatter stringFromDate:[NSDate date]];
  NSString * timeNow = [[NSString alloc] initWithFormat:@"%@", date];
  return timeNow;
}

- (NSString *)intervalFromLastDate: (NSString *) dateString1  toTheDate:(NSString *) dateString2
{
  NSArray *timeArray1=[dateString1 componentsSeparatedByString:@"."];
  dateString1=[timeArray1 objectAtIndex:0];
  
  NSArray *timeArray2=[dateString2 componentsSeparatedByString:@"."];
  dateString2=[timeArray2 objectAtIndex:0];
  
  // NSLog(@"%@.....%@",dateString1,dateString2);
  NSDateFormatter *date=[[NSDateFormatter alloc] init];
  [date setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
  
  NSDate *d1=[date dateFromString:dateString1];
  
  NSTimeInterval late1=[d1 timeIntervalSince1970]*1;
  
  NSDate *d2=[date dateFromString:dateString2];
  
  NSTimeInterval late2=[d2 timeIntervalSince1970]*1;
  
  NSTimeInterval cha=late2-late1;
  NSString *timeString=@"";
  NSString *house=@"";
  NSString *min=@"";
  NSString *sen=@"";
  
  sen = [NSString stringWithFormat:@"%d", (int)cha%60];
  //        min = [min substringToIndex:min.length-7];
  //    秒
  sen=[NSString stringWithFormat:@"%@", sen];
  
  min = [NSString stringWithFormat:@"%d", (int)cha/60%60];
  //        min = [min substringToIndex:min.length-7];
  //    分
  min=[NSString stringWithFormat:@"%@", min];
  
  //    小时
  house = [NSString stringWithFormat:@"%d", (int)cha/3600];
  //        house = [house substringToIndex:house.length-7];
  house=[NSString stringWithFormat:@"%@", house];
  
  timeString=[NSString stringWithFormat:@"%@:%@:%@",house,min,sen];
  
  return timeString;
}

//UTC时间转换成对应系统时间
//-(NSString *)getLocalDateFormateUTCDate:(NSString *)utcDate
//{
//  NSLog(@"UTC=========%@",utcDate);
//  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
//  //输入格式
//  [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSSZ"];
//  NSTimeZone *localTimeZone = [NSTimeZone localTimeZone];
//  [dateFormatter setTimeZone:localTimeZone];
//  
//  NSDate *dateFormatted = [dateFormatter dateFromString:utcDate];
//  //输出格式
//  [dateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
//  NSString *dateString = [dateFormatter stringFromDate:dateFormatted];
//  NSLog(@"UTC=========%@---%@",utcDate,dateString);
//  return dateString;
//}

@end

