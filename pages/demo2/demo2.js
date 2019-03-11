import YrobotTouch from "../../utils/YrobotTouch"; //引入YrobotTouch

var angle = 0, zoom = 1;

Page({
    data: {
        angle: 0,
        zoom: 1,
    },
    onLoad: function (options) {
        const that = this;
        new YrobotTouch(this, 'touch1', { //会创建this.touch1指向实例对象
            touchStart: function () { },
            touchMove: function () {
                that.setData({
                    angle,
                    zoom
                })
            },
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
                angle = that.data.angle + evt.angle;
            },
            pinch: function (evt) { //evt.zoom代表两个手指缩放的比例(多次缩放的累计值),evt.singleZoom代表单次回调中两个手指缩放的比例
                console.log('pinch:' + evt.zoom);
                zoom = evt.zoom;
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

