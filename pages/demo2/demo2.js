import YrobotTouch from "../../utils/YrobotTouch"; //引入YrobotTouch

Page({
    data: {
        angle: 0,
        zoom: 1,
    },
    onLoad: function (options) {
        const that = this;
        new YrobotTouch(this, 'touch1', { //会创建this.touch1指向实例对象
            touchStart: function () { },
            touchMove: function () { },
            touchEnd: function () { },
            touchCancel: function () { },
            multipointStart: function (evt) { },//一个手指以上触摸屏幕触发
            multipointEnd: function () { }, //当手指离开，屏幕只剩一个手指或零个手指触发(一开始只有一根手指也会触发)
            tap: function () { }, //点按触发，覆盖下方3个点击事件，doubleTap时触发2次 
            doubleTap: function () { }, //双击屏幕触发
            longTap: function () { },  //长按屏幕750ms触发
            singleTap: function () { }, //单击屏幕触发，包括长按
            rotate: function (evt) { //evt.angle代表两个手指旋转的角度
                console.log(evt.angle)
                that.setData({
                    angle: that.data.angle + evt.angle
                })
            },
            pinch: function (evt) { //evt.scale代表两个手指缩放的比例
                console.log('pinch:' + evt.zoom);
                that.setData({
                    zoom: that.data.zoom * evt.zoom < 1 ? 1 : that.data.zoom * evt.zoom
                })
            },
            pressMove: function (evt) { //evt.deltaX和evt.deltaY代表在屏幕上移动的距离,evt.target可以用来判断点击的对象
                // console.log(evt.target);
                // console.log(evt.deltaX);
                // console.log(evt.deltaY);
            },
            swipe: function (evt) { //在touch结束触发，evt.direction代表滑动的方向 ['Up','Right','Down','Left']
                // console.log("swipe:" + evt.direction);
            }
        });
    },

});

