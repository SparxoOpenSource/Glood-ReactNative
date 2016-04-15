//
//  AnalyzeNetService.h
//  TestBonjour
//
//  Created by yanjing on 14-5-26.
//  Copyright (c) 2014年 bravegogo. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AnalyzeNetService : NSObject <NSNetServiceDelegate>{
    
    // Connection info: NSNetService
//    NSNetService *   netService;
}
@property(nonatomic,strong)  NSNetService *   netMyService;
-(void)opit;
@end
