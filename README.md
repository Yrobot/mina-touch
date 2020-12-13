# mina-touch
`mina-touch`，一个方便、轻量的 __小程序__ 手势事件监听库  
事件库部分逻辑参考`alloyFinger`，在此做出声明和感谢  

## change log：  
1. 2019.3.10 优化监听和绘制逻辑，动画不卡顿
2. 2019.3.12 修复第二次之后缩放闪烁的bug，pinch添加singleZoom参数
3. 2020.12.13 0.更名mina-touch 1上传npm库 2优化README 3优化使用方式

## 支持的事件  
- 支持pinch缩放  
- 支持rotate旋转  
- 支持pressMove拖拽  
- 支持doubleTap双击  
- 支持swipe滑动  
- 支持longTap长按  
- 支持tap按  
- 支持singleTap单击  

## demo展示  

1. demo1：监听 pressMove拖拽 手势  
![ ](https://mmbiz.qpic.cn/mmbiz_gif/Z3Bib6gP5N9ibSYjwVu2fc0T5MIklMmy9L5T1bMWzIibFemR3xCsSNOLWyiclzzNPkXFuk2PRyBNDpKdEWTu645ZWg/0?wx_fmt=gif)
2. demo2: 监听 pinch缩放 和 rotate旋转 手势 (已优化动画卡顿bug)  
![ ](https://mmbiz.qpic.cn/mmbiz_gif/Z3Bib6gP5N9ibSYjwVu2fc0T5MIklMmy9LdqfBrUTgmR9ic1AtO3ic9QwrnCEfTOsibsaRlCsg4wRpxv6pOhictjaExw/0?wx_fmt=gif)

## 使用方法  


### *.js  
1. 引入mina-touch
2. 在page的onload生命周期中实例化mina-touch  

实例化语法：    
`new mina-touch(page实例,监听实例对象名,option)`  
_实例对象名：影响到wxml引用的方法名，以及page页储存实例的索引_  
_option：包含各个手势事件的出口函数，具体函数及解析如下参考_

NOTE:  
1. 多个事件监听触发setData时，建议把setData合并在touchMove中，以减少多个setData引起的动画延迟和卡顿（参考demo2）   

参考：
```
import MinaTouch from "mina-touch"; //引入mina-touch

Page({
    onLoad: function (options) {
        new MinaTouch(this, 'touch1', { //会创建this.touch1指向实例对象
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
            pinch: function (evt) { //evt.zoom代表两个手指缩放的比例(多次缩放的累计值),evt.singleZoom代表单次回调中两个手指缩放的比例
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

NOTE:  
1. 建议使用catch捕获事件，否则易造成监听动画卡顿（参考demo2）  

参考：（上例js中事例对象名为'touch1'）
```
<view class="box" catchtouchstart="touch1.start" catchtouchmove="touch1.move" catchtouchend="touch1.end" catchtouchcancel="touch1.cancel">
    <view id="target"></view>
</view>
```

-----
以上简单两步即可使用mina-touch手势库
