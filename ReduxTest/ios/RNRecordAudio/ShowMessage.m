//
//  ShowMessage.m
//  HuaYiZu
//
//  Created by Simon-fan on 15/6/5.
//  Copyright (c) 2015年 Simon.Fan. All rights reserved.
//

#import "ShowMessage.h"
#import "MBProgressHUD.h"

#define SCREEN_WIDTH    ([UIScreen mainScreen].bounds.size.width)
#define SCREEN_HEIGHT ([UIScreen mainScreen].bounds.size.height)

@implementation ShowMessage


+(void)showMessage:(NSString *)message
{
    UIWindow * window = [UIApplication sharedApplication].keyWindow;
    UIView *showview =  [[UIView alloc]init];
    showview.backgroundColor = [UIColor blackColor];
    showview.frame = CGRectMake(1, 1, 1, 1);
    showview.alpha = 1.0f;
    showview.layer.cornerRadius = 5.0f;
    showview.layer.masksToBounds = YES;
    [window addSubview:showview];
    
    UILabel *label = [[UILabel alloc]init];
    CGSize LabelSize = [message sizeWithFont:[UIFont systemFontOfSize:20] constrainedToSize:CGSizeMake(290, 9000)];
    label.frame = CGRectMake(10, 5, LabelSize.width, LabelSize.height);
    label.text = message;
    label.textColor = [UIColor whiteColor];
    label.textAlignment = 1;
  label.numberOfLines = 0;
  label.lineBreakMode = NSLineBreakByWordWrapping;
    label.backgroundColor = [UIColor clearColor];
    label.font = [UIFont fontWithName:@"ProximaNova-Semibold" size:14.f];
    [showview addSubview:label];
    showview.frame = CGRectMake((SCREEN_WIDTH - LabelSize.width - 20)/2, SCREEN_HEIGHT - 100, LabelSize.width+20, LabelSize.height+10);
    [UIView animateWithDuration:2 animations:^{
        showview.alpha = 0;
    } completion:^(BOOL finished) {
        [showview removeFromSuperview];
    }];
}

+(void)showMessage:(UIView *) view setMessage:(NSString *) message {
    MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:view animated:YES];
    hud.mode = MBProgressHUDModeText;
    hud.labelText = message;
    hud.margin = 8.f;
    //    hud.yOffset = SCREEN_HEIGHT/2-70;
    hud.removeFromSuperViewOnHide = YES;
    hud.labelFont =[UIFont fontWithName:@"ProximaNova-Semibold" size:14.f];
    [hud hide:YES afterDelay:2];
}

+(void)dismissMessage
{
  
}

+(void)showLastPageMessage:(UIView *) view isHaveFooter:(Boolean) have{
    if(!view) {
        return;
    }
    MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:view animated:YES];
    hud.mode = MBProgressHUDModeText;
    hud.labelText = @"没有更多数据了";
    hud.margin = 5.f;
    if(have) {
        hud.yOffset = SCREEN_HEIGHT/2-65;
    } else {
        hud.yOffset = SCREEN_HEIGHT/2-25;
    }
    hud.removeFromSuperViewOnHide = YES;
    hud.labelFont =[UIFont fontWithName:@"ProximaNova-Semibold" size:12.f];
    [hud hide:YES afterDelay:2];
}

@end
