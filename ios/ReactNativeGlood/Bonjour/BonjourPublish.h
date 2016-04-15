//
//  BonjourPublish.h
//  TestBonjour
//
//  Created by yanjing on 14-5-25.
//  Copyright (c) 2014年 bravegogo. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface BonjourPublish : NSObject <NSNetServiceDelegate>

@property(nonatomic,strong)NSNetService * bonjourService;

@property(nonatomic,assign) int port;

-(BOOL)bonjourPublish;
-(void)unpublishBonjourService;

@end
