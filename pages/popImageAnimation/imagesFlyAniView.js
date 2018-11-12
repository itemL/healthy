export var movedirectionStyle = {
  top:1,
  left:2,
  bottom:3,
  right:4,
}

class imagesFlyAniView{
  constructor(pageContext){
    this.page = pageContext;
    this.isAnimation = false;
    this.page.__startMoveAnimation = this.__startMoveAnimation.bind(this);
    this.page.__clickPopSetsButton = this.__clickPopSetsButton.bind(this);
    this.page.animationend = this.__animationend.bind(this);
  }
/*
startImageUrl --- 第一个按钮的图标
images        --- 需要弹出的按钮的图标数组
imageSize     --- 图标大小
imageSpace    --- 图标的间距
time          --- 图标的动画运行时间
direction     --- 图标的方向
clickItemsBackBlock ---子图标的点击方法的回调:
*/
  load(startImageUrl,images, imageSize, imageSpace, time, direction, clickItemsBackBlock){
   if (!images || images.length <= 0){
     return;
   }
   var imageList = [];
   for(var i = 0;i<images.length; ++i){
     var url = images[i];
     imageList.push({ url: url,ani:""});
   }
   
   this.imageSize = imageSize && imageSize.width > 0 && imageSize.height > 0 ? imageSize : {width:100,height:100};
   this.imageSpace = imageSpace;
   this.time = time ? time : 1 ; 
   this.direction = direction ? direction : movedirectionStyle.right;
   this.clickItemsBackBlock = clickItemsBackBlock;

    this.page.setData({
      'imageList': imageList,
       imageSize:imageSize,
       startImageUrl: startImageUrl
    })
 }

  replaceImages(images){

  }

  __animationend(event){
    var _this = this;
    var index = event.currentTarget.dataset.index;

    if (_this.isAnimation){
        //开始
        if(index == 0){
          //动画完成

        }
    }else{
      
      if (index === this.page.data.imageList.length - 1){
        this.page.setData({
          animationStatus: false//已经开始动画,隐藏image
        });
      }
    }

    console.warn("event",event);
  }

  __clickPopSetsButton(event){
    var index=  event.currentTarget.dataset.index;
    if (this.clickItemsBackBlock){
      this.clickItemsBackBlock(index);
    }else{
      console.warn("page not has this function : ", this.page.clickPopSetsButton);
    }
  }

  __startMoveAnimation(res){
    var _this = this;
    var list = [];

    if (!this.isAnimation){
      this.isAnimation = true;
      for (var i = 0; i < this.page.data.imageList.length; ++i) {
        var item = this.page.data.imageList[i];
        var moveLength = (this.imageSpace + this.imageSize.width * 2) * (i + 1) / 2;
        item.ani = this.__getAnimation(moveLength);
        list.push(item);
      }
      
      this.page.setData({
        animationStatus:true//已经开始动画,显示隐藏的image
      });

    }else{
      this.isAnimation = false;
      for (var i = 0; i < this.page.data.imageList.length; ++i) {
        var item = this.page.data.imageList[i];
        item.ani = this.__getAnimation(0);
        list.push(item)
      }
    }

    this.page.setData({
      'imageList': list
    })

    for (var i = 0; i < this.page.data.imageList.length; ++i) {
      var item = this.page.data.imageList[i];
      item.ani.export();
    }
  }

  __getAnimation(length){
    if (this.direction == movedirectionStyle.top) { 
      return this.__getAnimationTranslateY(-length);
    } else if (this.direction == movedirectionStyle.left){
      return this.__getAnimationTranslateX(-length);
    } else if (this.direction == movedirectionStyle.bottom){
      return this.__getAnimationTranslateY(length);
    }else{
      return this.__getAnimationTranslateX(length);
    }
  }

  __getAnimationTranslateX(translateX){
    var _this = this;
    var animation = wx.createAnimation({
      duration: _this.time * 1000,
      timingFunction: "linear"
    })
    animation.translateX(translateX).step();
    return animation;
  }

  __getAnimationTranslateY(translateY) {
    var _this = this;
    var animation = wx.createAnimation({
      duration: _this.time * 1000,
      timingFunction: "linear"
    })
    animation.translateY(translateY).step();
    return animation;
  }

}
module.exports = imagesFlyAniView;