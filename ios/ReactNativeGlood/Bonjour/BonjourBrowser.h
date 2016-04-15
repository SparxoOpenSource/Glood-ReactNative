//
//  BonjourBrowser.h
//  TestBonjour
//
//  Created by yanjing on 14-5-25.
//  Copyright (c) 2014年 bravegogo. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AnalyzeNetService.h"

@interface BonjourBrowser : NSObject <NSNetServiceBrowserDelegate>

@property(nonatomic, readonly) NSMutableArray * servers;
@property(nonatomic, strong) NSNetServiceBrowser * bonjourServiceBrowser;
@property(nonatomic, strong)AnalyzeNetService * netser;
// Start browsing for Bonjour services
- (BOOL)start;

// Stop everything
- (void)stop;
@end
