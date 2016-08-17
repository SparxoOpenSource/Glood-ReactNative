#import "RecordAudio.h"
#import "RCTLog.h"
#import "AppDelegate.h"
#import "ShowMessage.h"
#import "NSString+Base64.h"
#import "VoiceConverter.h"
#import "KeychainItemWrapper.h"

@import AVFoundation;
@import AudioToolbox;

//#import <ifaddrs.h>
//#import <arpa/inet.h>

#include <ifaddrs.h>
#include <arpa/inet.h>
#include <net/if.h>

#define IOS_CELLULAR    @"pdp_ip0"
#define IOS_WIFI        @"en0"
#define IOS_VPN         @"utun0"
#define IP_ADDR_IPv4    @"ipv4"
#define IP_ADDR_IPv6    @"ipv6"

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
/*
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
  
    NSRange isRangeMp3 = [fileName rangeOfString:@".wav" options:NSCaseInsensitiveSearch];
    
    if (isRangeMp3.location == NSNotFound) {
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
  NSLog(@"-*-***-*-*-露营格式：%@",pathForFile);
    
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
//  NSDictionary *recordSettings  = [NSDictionary dictionaryWithObjectsAndKeys:
//                                  [NSNumber numberWithInt:kAudioFormatMPEGLayer3] ,AVFormatIDKey,
//                                  [NSNumber numberWithFloat:22050.0] ,AVSampleRateKey,
//                                  [NSNumber numberWithInt: 2] ,AVNumberOfChannelsKey,
//                                  [NSNumber numberWithInt:16] ,AVLinearPCMBitDepthKey,
//                                  [NSNumber numberWithBool:NO] ,AVLinearPCMIsBigEndianKey,
//                                  [NSNumber numberWithBool:NO],AVLinearPCMIsFloatKey,nil];
  
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
 */

#pragma mark ======== 开始录音 ============
RCT_EXPORT_METHOD(startRecord:(NSString *)fileName
                  callback:(RCTResponseSenderBlock)successCallback) {
  
    //录音
    
    //根据当前时间生成文件名
    self.recordFileName = [self GetCurrentTimeString];
    //获取路径
    self.recordFilePath = [self GetPathByFileName:self.recordFileName ofType:@"wav"];
    
    //初始化录音
    self.recorder = [[AVAudioRecorder alloc]initWithURL:[NSURL fileURLWithPath:self.recordFilePath]
                                               settings:[VoiceConverter GetAudioRecorderSettingDict]
                                                  error:nil];
    
    //准备录音
    if ([self.recorder prepareToRecord]){
      
      [[AVAudioSession sharedInstance] setCategory: AVAudioSessionCategoryPlayAndRecord error:nil];
      [[AVAudioSession sharedInstance] setActive:YES error:nil];
      
      //开始录音
      [self.recorder record];
      NSDictionary *resultsDict = @{
                                    @"success" : @YES,
                                    @"param" : @"Successfully started.",
                                    @"name" : fileName
                                    };
      
      successCallback(@[resultsDict]);
  }
}

#pragma mark ======== 停止录音 ============
RCT_EXPORT_METHOD(stopRecord:(RCTResponseSenderBlock)successCallback) {
  
    //停止录音
    [self.recorder stop];
    //设置label信息
//  NSLog(@"%@",[NSString stringWithFormat:@"原wav:\n%@",[self getVoiceFileInfoByPath:self.recordFilePath convertTime:0]]);
    //开始转换格式
    
    NSDate *date = [NSDate date];
    NSString *amrPath = [self GetPathByFileName:self.recordFileName ofType:@"amr"];
    
#warning wav转amr
    if ([VoiceConverter ConvertWavToAmr:self.recordFilePath amrSavePath:amrPath]){
      
      //设置label信息
//      NSLog(@"%@",[NSString stringWithFormat:@"原wav转amr:\n%@",[self getVoiceFileInfoByPath:amrPath convertTime:[[NSDate date] timeIntervalSinceDate:date]]]);
      
      date = [NSDate date];
      NSString *convertedPath = [self GetPathByFileName:[self.recordFileName stringByAppendingString:@""] ofType:@"wav"];
//      NSLog(@"dafdfadfa-----%@---%@",convertedPath,amrPath);
      //获取时间
      NSURL *audioFileURL = [NSURL fileURLWithPath:convertedPath];
      AVURLAsset* audioAsset =[AVURLAsset URLAssetWithURL:audioFileURL options:nil];
      CMTime audioDuration = audioAsset.duration;
      float audioDurationSeconds =CMTimeGetSeconds(audioDuration);
      NSString *timeStr = [NSString stringWithFormat:@"%.1f",audioDurationSeconds];
      //转码
      NSFileManager *fileManager = [NSFileManager defaultManager];
      wavdata = [fileManager contentsAtPath:amrPath];
//      NSLog(@"wavdata:%@",wavdata);
      NSString *pictureDataString=[wavdata base64Encoding];
//      NSLog(@"amr:%@",pictureDataString,timeStr);
      NSDictionary *resultsDict = @{
                                    @"success" : @YES,
                                    @"param"  : convertedPath,
                                    @"name" : [NSString stringWithFormat:@"%@.wav",self.recordFileName],
                                    @"time" : timeStr,
                                    @"Base64": pictureDataString
                                    };
      
      // Call the JavaScript sucess handler
      successCallback(@[resultsDict]);
//#warning amr转wav
//      if ([VoiceConverter ConvertAmrToWav:amrPath wavSavePath:convertedPath]){
//        //设置label信息
//        NSLog(@"%@",[NSString stringWithFormat:@"amr转wav:\n%@",[self getVoiceFileInfoByPath:convertedPath convertTime:[[NSDate date] timeIntervalSinceDate:date]]]);
//      }else
//        NSLog(@"amr转wav失败");
      
    }else
      NSLog(@"wav转amr失败");
}

// Persist data
/*
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
 */

#pragma mark ======== 播放录音 ============
RCT_EXPORT_METHOD(playRecord:(NSString *)playName
                  Callback:(RCTResponseSenderBlock)callBack) {
  self.player = [[AVAudioPlayer alloc]init];
  [[AVAudioSession sharedInstance] setCategory: AVAudioSessionCategoryPlayback error:nil];
  [[AVAudioSession sharedInstance] setActive:YES error:nil];
  playName = [playName stringByReplacingOccurrencesOfString:@".wav" withString:@""];
  NSString *convertedPath = [self GetPathByFileName:playName ofType:@"wav"];
  self.player = [self.player initWithContentsOfURL:[NSURL URLWithString:convertedPath] error:nil];
  [self.player play];
  
  AVURLAsset* audioAsset =[AVURLAsset URLAssetWithURL:[NSURL URLWithString:convertedPath] options:nil];
  
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
}
/*
#pragma mark ======== 播放录音 ============
RCT_EXPORT_METHOD(playRecord:(NSString *)playName
                  Callback:(RCTResponseSenderBlock)callBack) {
//  playName = newFileName;
   NSLog(@"*-*-*-*-***--*******  %@",playName);
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
//  NSString * filepath = [self getCachePath];
  NSString *convertedPath = [self GetPathByFileName:[self.recordFileName stringByAppendingString:@"IOS-"] ofType:@"wav"];
  BOOL exists = [fileManager fileExistsAtPath:convertedPath isDirectory:false];
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
 */

#pragma mark ======停止播放=============
RCT_EXPORT_METHOD(stopAllRecord)
{
  [self.player stop];
  self.player = nil;
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
#define MOBILE_PHONE_UUID_FAKE @"mobile_phone_uuid_fake"
RCT_EXPORT_METHOD(getAndroidIpAddress:(RCTResponseSenderBlock)callback)
{
//  NSString *address = @"error";
//  struct ifaddrs *interfaces = NULL;
//  struct ifaddrs *temp_addr = NULL;
//  int success = 0;
//  // retrieve the current interfaces - returns 0 on success
//  success = getifaddrs(&interfaces);
//  if (success == 0) {
//    temp_addr = interfaces;
//    while(temp_addr != NULL) {
//      if(temp_addr->ifa_addr->sa_family == AF_INET) {
//        if([[NSString stringWithUTF8String:temp_addr->ifa_name] isEqualToString:@"en0"]) {
//          address = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_addr)->sin_addr)];
//        }
//      }
//      temp_addr = temp_addr->ifa_next;
//    }
//  }
//  freeifaddrs(interfaces);
//  
  // NSLog(@"-*-*-*-------ADDRE:%@",address);
  NSString *ipStr;
//  if ([[self getIPAddresses] count] == 3)
//  {
//    ipStr = [[self getIPAddresses] objectForKey:@"pdp_ip0/ipv4"];
//  }
//  else
//  {
//    ipStr = [[self getIPAddresses] objectForKey:@"en0/ipv4"];
//  }
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  if([[[UIDevice currentDevice] systemVersion] floatValue] >= 6)
  {
    KeychainItemWrapper *keyWrapper=[[KeychainItemWrapper alloc] initWithIdentifier:@"react-glood" accessGroup:nil];//xxxx 自定义
    
    
    if ([NSString stringWithFormat:@"%@", [keyWrapper  objectForKey:(id)CFBridgingRelease(kSecAttrAccount)]] == nil || [[NSString stringWithFormat:@"%@", [keyWrapper  objectForKey:(id)CFBridgingRelease(kSecAttrAccount)]] isEqualToString:@"<null>"] || [[NSString stringWithFormat:@"%@", [keyWrapper  objectForKey:(id)CFBridgingRelease(kSecAttrAccount)]] isEqualToString:@"(null)"] || [[NSString stringWithFormat:@"%@", [keyWrapper  objectForKey:(id)CFBridgingRelease(kSecAttrAccount)]] isEqualToString:@""])
    {
      CFUUIDRef uuidRef =CFUUIDCreate(NULL);
      
      CFStringRef uuidStringRef =CFUUIDCreateString(NULL, uuidRef);
      
      CFRelease(uuidRef);
      
      NSString *uniqueId = (NSString *)CFBridgingRelease(uuidStringRef);
      [keyWrapper setObject:@"myChainValues" forKey:(id)CFBridgingRelease(kSecAttrService)];
      [keyWrapper setObject:uniqueId forKey:(id)CFBridgingRelease(kSecAttrAccount)];
      [defaults setObject:uniqueId forKey:MOBILE_PHONE_UUID_FAKE];
      
    }
    else
    {
      NSString *password = [keyWrapper  objectForKey:(id)CFBridgingRelease(kSecAttrAccount)];
      [defaults setObject:password forKey:MOBILE_PHONE_UUID_FAKE];
    }
  }
  NSLog(@"唯一码:%@",[defaults objectForKey:MOBILE_PHONE_UUID_FAKE]);
  NSDictionary *resultsDict = @{@"IP" : [defaults objectForKey:MOBILE_PHONE_UUID_FAKE]};
  callback(@[resultsDict]);
}

- (NSDictionary *)getIPAddresses
{
  NSMutableDictionary *addresses = [NSMutableDictionary dictionaryWithCapacity:8];
  
  // retrieve the current interfaces - returns 0 on success
  struct ifaddrs *interfaces;
  if(!getifaddrs(&interfaces)) {
    // Loop through linked list of interfaces
    struct ifaddrs *interface;
    for(interface=interfaces; interface; interface=interface->ifa_next) {
      if(!(interface->ifa_flags & IFF_UP) /* || (interface->ifa_flags & IFF_LOOPBACK) */ ) {
        continue; // deeply nested code harder to read
      }
      const struct sockaddr_in *addr = (const struct sockaddr_in*)interface->ifa_addr;
      char addrBuf[ MAX(INET_ADDRSTRLEN, INET6_ADDRSTRLEN) ];
      if(addr && (addr->sin_family==AF_INET || addr->sin_family==AF_INET6)) {
        NSString *name = [NSString stringWithUTF8String:interface->ifa_name];
        NSString *type;
        if(addr->sin_family == AF_INET) {
          if(inet_ntop(AF_INET, &addr->sin_addr, addrBuf, INET_ADDRSTRLEN)) {
            type = IP_ADDR_IPv4;
          }
        } else {
          const struct sockaddr_in6 *addr6 = (const struct sockaddr_in6*)interface->ifa_addr;
          if(inet_ntop(AF_INET6, &addr6->sin6_addr, addrBuf, INET6_ADDRSTRLEN)) {
            type = IP_ADDR_IPv6;
          }
        }
        if(type) {
          NSString *key = [NSString stringWithFormat:@"%@/%@", name, type];
          addresses[key] = [NSString stringWithUTF8String:addrBuf];
        }
      }
    }
    // Free memory
    freeifaddrs(interfaces);
  }
  return [addresses count] ? addresses : nil;
}

/*
NSString *codeString = @"Hello world";
NSLog(@"原文--%@",codeString);

NSString *base64Str = [codeString base64EncodedString];
NSLog(@"Base64编码--%@",base64Str);

NSString *decodeStr = [base64Str base64DecodedString];
NSLog(@"Base64解码--%@",decodeStr);
 */

#pragma mark ======= 处理并保存文件 ======
RCT_EXPORT_METHOD(saveRecord:(NSString *)base64 addressIp:(NSString *)IP
                  Callback:(RCTResponseSenderBlock)callBack)
{
//  NSLog(@"---*-*-*-  %@",base64);
   NSString *fileName = [NSString stringWithFormat:@"%@",[self GetCurrentTimeString]];
//    NSRange isRangeWav = [fileName rangeOfString:@".wav" options:NSCaseInsensitiveSearch];
    NSString *cachePath = [self getCachePath];
  NSString *convertedPath = [self GetPathByFileName:fileName ofType:@"amr"];
//  NSString *convertedPath = [self GetPathByFileName:[self.recordFileName stringByAppendingString:@""] ofType:@"amr"];
    BOOL isDir = NO;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    BOOL existed = [fileManager fileExistsAtPath:convertedPath isDirectory:&isDir];
    if ( !(isDir == YES && existed == YES) )
    {
      [fileManager createDirectoryAtPath:convertedPath withIntermediateDirectories:YES attributes:nil error:nil];
    }
    // Create the path that the file will be stored at
  
  
//  NSString *base64Str = [base64 base64EncodedString];
//  NSLog(@"Base64编码--%@",base64Str);
//  
//  NSString *decodeStr = [base64 base64DecodedString];
//  NSLog(@"Base64解码--%@",decodeStr);
  pathForFile = [NSString stringWithFormat:@"%@/%@", convertedPath, fileName];
  NSData *sData   = [[NSData alloc] initWithBase64Encoding:base64];
  BOOL ss = [sData writeToFile:pathForFile atomically:YES];
//  NSLog(@"-*-*--777----%@---%@--%d",convertedPath,sData,ss);
//  NSLog(@"wavdata**:%@",sData);
  self.recordFilePath = [self GetPathByFileName:fileName ofType:@"wav"];
//  NSLog(@"-*-*--888----%@",self.recordFilePath);
#warning amr转wav
  if ([VoiceConverter ConvertAmrToWav:pathForFile wavSavePath:self.recordFilePath]){
    //设置label信息
    NSLog(@"amr转wav成功");
  }else
  {
    NSLog(@"amr转wav失败");
  }
  
  
  NSURL *audioFileURL = [NSURL fileURLWithPath:self.recordFilePath];
  AVURLAsset* audioAsset =[AVURLAsset URLAssetWithURL:audioFileURL options:nil];
  
  CMTime audioDuration = audioAsset.duration;
  
  float audioDurationSeconds =CMTimeGetSeconds(audioDuration);
  NSString *timeStr = [NSString stringWithFormat:@"%.1f",audioDurationSeconds];

  
    // NSLog(@"-----**-*pathForFile:---%@  sData:%@ -- %@",pathForFile,sData,base64);
    NSDictionary *resultsDict = @{
                                @"success" : @YES,
                                @"name" : [NSString stringWithFormat:@"%@.wav",fileName],
                                @"time":timeStr
                                };
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

#pragma mark - Others

#pragma mark - 生成当前时间字符串
- (NSString*)GetCurrentTimeString{
  NSDateFormatter *dateformat = [[NSDateFormatter  alloc]init];
  [dateformat setDateFormat:@"yyyyMMddHHmmss"];
  return [dateformat stringFromDate:[NSDate date]];
}

#pragma mark - 生成文件路径
- (NSString*)GetPathByFileName:(NSString *)_fileName ofType:(NSString *)_type{
  NSString *directory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)objectAtIndex:0];;
  NSString* fileDirectory = [[[directory stringByAppendingPathComponent:_fileName]
                              stringByAppendingPathExtension:_type]
                             stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
  return fileDirectory;
}

#pragma mark - 获取音频文件信息
- (NSString *)getVoiceFileInfoByPath:(NSString *)aFilePath convertTime:(NSTimeInterval)aConTime{
  
  NSInteger size = [self getFileSize:aFilePath]/1024;
  NSString *info = [NSString stringWithFormat:@"文件名:%@\n文件大小:%dkb\n",aFilePath.lastPathComponent,size];
  
  NSRange range = [aFilePath rangeOfString:@"wav"];
  if (range.length > 0) {
    AVAudioPlayer *play = [[AVAudioPlayer alloc]initWithContentsOfURL:[NSURL URLWithString:aFilePath] error:nil];
    info = [info stringByAppendingFormat:@"文件时长:%f\n",play.duration];
  }
  
  if (aConTime > 0)
    info = [info stringByAppendingFormat:@"转换时间:%f",aConTime];
  return info;
}

#pragma mark - 获取文件大小
- (NSInteger) getFileSize:(NSString*) path{
  NSFileManager * filemanager = [[NSFileManager alloc]init];
  if([filemanager fileExistsAtPath:path]){
    NSDictionary * attributes = [filemanager attributesOfItemAtPath:path error:nil];
    NSNumber *theFileSize;
    if ( (theFileSize = [attributes objectForKey:NSFileSize]) )
      return  [theFileSize intValue];
    else
      return -1;
  }
  else{
    return -1;
  }
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

