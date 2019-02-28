# YrobotTouch-WXLP
`YrobotTouch`，一个方便、轻量的 __小程序__ 手势事件监听库  
事件库部分逻辑参考`alloyFinger`，在此做出声明和感谢  

## 支持的事件  
- 支持pinch缩放  
- 支持rotate旋转  
- 支持pressMove拖拽  
- 支持doubleTap双击  
- 支持swipe滑动  
- 支持longTap长按  
- 支持tap按  
- 支持singleTap单击  

## 使用方法  
`tips: 整个仓库是一个demo，核心文件是'/utils/YrobotTouch.js'，只需下载此js文件即可`  

### *.js  
1. 引入YrobotTouch
2. 在page的onload生命周期中实例化YrobotTouch  

实例化语法：    
`new YrobotTouch(page实例,实例对象名,option)`  
_实例对象名：影响到wxml引用的方法名，以及page页储存实例的索引_  
_option：包含各个手势事件的出口函数，具体函数及解析如下参考_

参考：
```
import YrobotTouch from "../../utils/YrobotTouch"; //引入YrobotTouch

Page({
    onLoad: function (options) {
        new YrobotTouch(this, 'touch1', { //会创建this.touch1指向实例对象
            touchStart: function () { },
            touchMove: function () { },
            touchEnd: function () { },
            touchCancel: function () { },
            multipointStart: function () { console.log('multipointStart') }, //一个手指以上触摸屏幕触发
            multipointEnd: function () { console.log('multipointEnd') }, //当手指离开，屏幕只剩一个手指或零个手指触发(一开始只有一根手指也会触发)
            tap: function () { console.log('Tap') }, //点按触发，覆盖下方3个点击事件，doubleTap时触发2次 
            doubleTap: function () { console.log('doubleTap') }, //双击屏幕触发
            longTap: function () { console.log('longTap') },  //长按屏幕750ms触发
            singleTap: function () { console.log('singleTap') }, //单击屏幕触发，包括长按
            rotate: function (evt) { //evt.angle代表两个手指旋转的角度
                console.log('rotate:' + evt.angle);
            },
            pinch: function (evt) { //evt.scale代表两个手指缩放的比例
                console.log('pinch:' + evt.zoom);
            },
            pressMove: function (evt) { //evt.deltaX和evt.deltaY代表在屏幕上移动的距离,evt.target可以用来判断点击的对象
                console.log(evt.target);
                console.log(evt.deltaX);
                console.log(evt.deltaY);
            },
            swipe: function (evt) { //在touch结束触发，evt.direction代表滑动的方向 ['Up','Right','Down','Left']
                console.log("swipe:" + evt.direction);
            }
        });
    },
});  
```

### *.wxml  
在view中绑定事件并对应：  
```
touchstart -> 实例对象名.start  
touchmove -> 实例对象名.move  
touchend -> 实例对象名.end    
touchcancel -> 实例对象名.cancel   
```

参考：（上例js中事例对象名为'touch1'）
```
<view class="box" bindtouchstart="touch1.start" bindtouchmove="touch1.move" bindtouchend="touch1.end" bindtouchcancel="touch1.cancel">
    <view id="target"></view>
</view>
```

-----
以上简单两步即可使用YrobotTouch手势库


__Yrobot__  
_2019年3月1日 01:55:24_
