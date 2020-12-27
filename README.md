# mina-touch

`mina-touch`，一个方便、轻量的 **小程序** 手势事件监听库  
事件库部分逻辑参考`alloyFinger`，在此做出声明和感谢

## change log：

1. 2019.03.10 优化监听和绘制逻辑，动画不卡顿
2. 2019.03.12 修复第二次之后缩放闪烁的 bug，pinch 添加 singleZoom 参数
3. 2020.12.13 更名 mina-touch
4. 2020.12.27 上传 npm 库；优化使用方式；优化 README

## 支持的事件

- 支持 pinch 缩放
- 支持 rotate 旋转
- 支持 pressMove 拖拽
- 支持 doubleTap 双击
- 支持 swipe 滑动
- 支持 longTap 长按
- 支持 tap 按
- 支持 singleTap 单击

## demo 展示

1. demo1：监听 pressMove 拖拽 手势
   | ![](https://636f-could-test-1258393788.tcb.qcloud.la/README/touchmove.gif) | ![](https://636f-could-test-1258393788.tcb.qcloud.la/QRCode/pages-mina-touch-demo1-index_qrcode%3D1.jpg) |
   | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |

2. demo2: 监听 pinch 缩放 和 rotate 旋转 手势 (已优化动画卡顿 bug)  
   | ![](https://636f-could-test-1258393788.tcb.qcloud.la/README/multipleTouch.gif?sign=d0eea6eea6bfb92b4b7f0e32d6c4ffb8&t=1609054476) | ![](https://636f-could-test-1258393788.tcb.qcloud.la/QRCode/pages-mina-touch-demo2-index_qrcode%3D1.jpg) |
   | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |

3. demo3: 测试监听双击事件  
   | ![](https://636f-could-test-1258393788.tcb.qcloud.la/README/doubleTap.gif) | ![](https://636f-could-test-1258393788.tcb.qcloud.la/QRCode/pages-mina-touch-demo3-index_qrcode%3D1.jpg) |
   | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |

4. demo4: 测试监听长按事件  
   | ![](https://636f-could-test-1258393788.tcb.qcloud.la/README/longTap.gif) | ![](https://636f-could-test-1258393788.tcb.qcloud.la/QRCode/pages-mina-touch-demo4-index_qrcode%3D1.jpg) |
   | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |

## 使用方法

**大致可以分为 4 步：**

1. npm 安装 mina-touch，开发工具构建 npm
2. 引入 mina-touch
3. onload 实例化 mina-touch
4. wxml 绑定实例

### 命令行

`npm install mina-touch `  
安装完成后，开发工具构建 npm

### \*.js

```javascript
import MinaTouch from 'mina-touch'; // 1. 引入mina-touch

Page({
  onLoad: function (options) {
    new MinaTouch(this, 'touch1', {
      // 2. onload实例化mina-touch
      //会创建this.touch1指向实例对象
      touchStart: function () {},
      touchMove: function () {},
      touchEnd: function () {},
      touchCancel: function () {},
      multipointStart: function () {
        console.log('multipointStart');
      }, //一个手指以上触摸屏幕触发
      multipointEnd: function () {
        console.log('multipointEnd');
      }, //当手指离开，屏幕只剩一个手指或零个手指触发(一开始只有一根手指也会触发)
      tap: function () {
        console.log('Tap');
      }, //点按触发，覆盖下方3个点击事件，doubleTap时触发2次
      doubleTap: function () {
        console.log('doubleTap');
      }, //双击屏幕触发
      longTap: function () {
        console.log('longTap');
      }, //长按屏幕750ms触发
      singleTap: function () {
        console.log('singleTap');
      }, //单击屏幕触发，包括长按
      rotate: function (evt) {
        //evt.angle代表两个手指旋转的角度
        console.log('rotate:' + evt.angle);
      },
      pinch: function (evt) {
        //evt.zoom代表两个手指缩放的比例(多次缩放的累计值),evt.singleZoom代表单次回调中两个手指缩放的比例
        console.log('pinch:' + evt.zoom);
      },
      pressMove: function (evt) {
        //evt.deltaX和evt.deltaY代表在屏幕上移动的距离,evt.target可以用来判断点击的对象
        console.log(evt.target);
        console.log(evt.deltaX);
        console.log(evt.deltaY);
      },
      swipe: function (evt) {
        //在touch结束触发，evt.direction代表滑动的方向 ['Up','Right','Down','Left']
        console.log('swipe:' + evt.direction);
      },
    });
  },
});
```

NOTE:

1. 多类型事件监听触发 setData 时，建议把数据合并，在 touchMove 中一起进行 setData ，以减少短时内多次 setData 引起的动画延迟和卡顿（参考 demo2）

### \*.wxml

在 view 上绑定事件并对应：

```html
<view
  catchtouchstart="touch1.start"
  catchtouchmove="touch1.move"
  catchtouchend="touch1.end"
  catchtouchcancel="touch1.cancel"
>
</view>
<!-- 
touchstart -> 实例对象名.start
touchmove -> 实例对象名.move
touchend -> 实例对象名.end
touchcancel -> 实例对象名.cancel 
-->
```

NOTE:

1. 如果不影响业务，建议使用 catch 捕获事件，否则易造成监听动画卡顿（参考 demo2）

---

以上简单几步即可使用 mina-touch 手势库
