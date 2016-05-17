#import "RecordAudio.h"
#import "RCTLog.h"

@implementation RecordAudio {
    
    AVAudioSession *recordSession;
    AVAudioRecorder *audioRecorder;
    NSString *pathForFile;
    NSString *newFileName;
    AVAudioPlayer *audioPlayer;
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

// Persist data
#pragma mark ======== 开始录音 ============
RCT_EXPORT_METHOD(startRecord:(NSString *)fileName
                  callback:(RCTResponseSenderBlock)successCallback) {
  
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
            NSDictionary *resultsDict = @{
                                          @"success" : @YES,
                                          @"param"  : pathForFile,
                                          @"name" : newFileName
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
  if (!audioPlayer) {
  
    NSLog(@"heihiehiehi  %@",audioFileURL);
    audioPlayer = [[AVAudioPlayer alloc]
                   initWithContentsOfURL: audioFileURL
                   error:&error];
    [audioPlayer setDelegate:self];
    
  }
  
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
    NSDictionary *resultsDict = @{
                                  @"success" : @YES,
                                  @"successMsg" : @"Successfully started."
                                  };
    
    // Call the JavaScript sucess handler
    callBack(@[resultsDict]);
    
  }
  
}

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag
{
  UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"end!" message:[NSString stringWithFormat:@"End"] delegate:self cancelButtonTitle:@"ok" otherButtonTitles:nil, nil];
  [alertView show];

}

//RCT_EXPORT_METHOD(playFinish:(RCTResponseSenderBlock)callback)
//{
//  NSString *str = @"end!";
//  callback(@[str]);
//}

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
  [formatter setDateFormat:@"YYYYMMddhhmmss"];
  date = [formatter stringFromDate:[NSDate date]];
  NSString * timeNow = [[NSString alloc] initWithFormat:@"%@", date];
  return timeNow;
}

@end

