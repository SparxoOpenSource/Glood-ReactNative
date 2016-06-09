#import "RCTBridgeModule.h"
#import <AVFoundation/AVFoundation.h>

@interface RecordAudio : NSObject <RCTBridgeModule, AVAudioRecorderDelegate,AVAudioPlayerDelegate>
@property (strong, nonatomic)   AVAudioRecorder  *recorder;
@property (strong, nonatomic)   AVAudioPlayer    *player;
@property (strong, nonatomic)   NSString         *recordFileName;
@property (strong, nonatomic)   NSString         *recordFilePath;
@end