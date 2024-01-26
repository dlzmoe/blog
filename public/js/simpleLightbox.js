/*lightbox widget*/


//通用模块定义
(function (window, factory){
    
  if(typeof define === 'function' && define.amd){
  //AMD   
      define(factory);
      
  }else if(typeof module === 'object' && module.exports){
  //CMD   
      
      module.exports = factory();
      
  }else{
  //挂载在window下
      window.lightbox = factory();
  }
  
}(typeof window !== 'undefined' ? window : this, function(){
  
  var lightbox = function(selector, userOptions){

  "use strict";
  
 /*******
  默认配置
  *******/
  var options = {
      //是否显示capition
      captions: true,
      
      //设置caption的选择器为self
      captionSelector: "self",
      
      //获取caption,从给定的属性中，默认title
      captionAttribute: "title",
      
      nav: "auto",
      
      navText: ["&lsaquo;", "&rsaquo;"],
      
      //是否存在关闭按钮
      close: true,
      
      //关闭按钮文字
      closeText: "&times;",
      
      //是否显示总数目
      counter: true,
      
      //是否显示缩放按钮
      zoom: true,
      
      //缩放按钮文字
      zoomText: "&plus;",
      
      //点击外部时是否关闭lightbox
      docClose: true,
      
      //向下滑动关闭lightbox
      swipClose: true,
      
      //是否绑定键盘事件
      keyboard: true,
      
      //隐藏滚动条
      scroll: false
  }
  
  
  /*******
  全局变量
  *******/
  
  //图片数组
  var gallery = [];
  
  //图片数量
  var galleryLength = null;
  
  // 所有的slider Elements
  var sliderElement = [];
  
  //当前图片索引
  var currentIndex = 0;
  
  //触摸位置
  var touch = {};
  
  //判断该是否完成触摸滑动
  var touchFlag = false;
  
  //?
  var lastFocus = null;
  
 
  /**************
  创建灯箱所需的元素
  ***************/ 
 
  //1.遮罩层overlay
  var overlay = document.createElement('div');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-hidden', true);
  overlay.classList.add('lightbox-overlay');
  document.getElementsByTagName("body")[0].appendChild(overlay);
  
  //2.slider
  var slider = document.createElement('div');
  slider.classList.add("lightbox-slider");
  overlay.appendChild(slider);
  
  //3.previousBtn
  var prevButton = document.createElement('button');
  prevButton.setAttribute("type", "button");
  prevButton.setAttribute("aria-label", "previous");
  overlay.appendChild(prevButton);
  
  //4.nextButton
  var nextButton = document.createElement('button');
  nextButton.setAttribute("type", "button");
  nextButton.setAttribute("aria-label", "next")
  overlay.appendChild(nextButton);
      
  //5.closeBtn
  var closeButton = document.createElement('button');
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("aria-label", "close");
  overlay.appendChild(closeButton);
      
  //6.counter
  var counter = document.createElement('div');
  counter.classList.add("lightbox-counter");
  overlay.appendChild(counter);
      
  /*******
  全局函数
  *******/     
  
  //1.混合配置参数，类似 extend mixin
  var mergeOptions = function(userOptions, options){
      Object.keys(userOptions).forEach(function(key){
          options[key] = userOptions[key]
      })
      
  }
  
  //2.图片加载
  var loadImage = function(index, callback){
      
      //如果不存在
      if(typeof gallery[index] === "undefined" || typeof sliderElement[index] === "undefined"){
          return;
          
      //如果已经加载完成
      }else if(!sliderElement[index].getElementsByTagName("img")[0].hasAttribute("data-src")){
          callback && callback();
          return;
      }
      
      var figure = sliderElement[index].getElementsByTagName('figure')[0],
          image = figure.getElementsByTagName('img')[0],
          figcaption = figure.getElementsByTagName('figcaption')[0];
      
      //图片加载完成后移除加载动画
      image.onload = function(){
          var loader = figure.querySelector('.lightbox-loader');
          figure.removeChild(loader);
          image.style.opacity = "1";
          if(figcaption){
              figcaption.style.opacity = "1";
          }
      }
      
      image.setAttribute("src", image.getAttribute("data-src"));
      image.removeAttribute("data-src");
      
      //如果有回调函数，执行回掉函数
      callback && callback();
  }
  
  //3.计数
  var updataCounter = function(){
      counter.innerHTML = (currentIndex + 1) + " / " + galleryLength;
  }
  
  //4.更新偏移量
  var updateOffset = function(){
      var offset = -currentIndex * 100 + "%";
      
      if(typeof slider.style.perspective!== "undefined"){
          slider.style.transform = "translate("+ offset+", 0)";
      }else{
          slider.style.left = offset;
      }
  }
  
  //5.更新按钮焦点
  var updateFocus = function(direction){
      prevButton.disabled = false;
      nextButton.disabled = false;
      
      //如果是最后一张
      if(currentIndex === galleryLength - 1){
         prevButton.disabled = false;
         nextButton.disabled = true;
      }else if(currentIndex === 0){
          prevButton.disabled = true;
          nextButton.disabled = false;
      }
      
      if(options.nav){
          if(!nextButton.disabled && direction !== "left"){
              nextButton.focus();
          }else{
              prevButton.focus();
          }
      }else{
          closeButton.focus();
      }
  }
  
  //6.预加载图片
  var preloadImage = function(index){
      loadImage(index);
  }
  
  //7.下一张图片
  var nextImage = function(){
      //如果下一张存在
      if(currentIndex < galleryLength - 1){
          currentIndex++;
          
          updateOffset();   //更新偏移量
          updataCounter();  //更新计数
          updateFocus();    //更新按钮焦点
          
          preloadImage(currentIndex + 1); //预加载下一张图片
      }
  }
  
  //8.上一张图片
  var prevImage = function(){
      //如果上一张存在
      if(currentIndex > 0){
          currentIndex--;
          
          updateOffset();   //更新偏移量
          updataCounter();  //更新计数
          updateFocus();    //更新按钮焦点
          
          preloadImage(currentIndex - 1); //预加载上一
      }
  }
  
  //9.slider中新建内容
  var createOverlay = function(){
      var x=0,
          figure = null,
          figureIds = [],
          figcaption = null,
          figcaptionsIds = [];
      
      for(var i=0; i<galleryLength; i++){
          
          sliderElement[i] = document.createElement('div');
          sliderElement[i].classList.add('lightbox-content');
          sliderElement[i].id = "lightbox-content-"+i;
          
          //创建figure
          figure = document.createElement('figure');
          figure.innerHTML = '<div class="lightbox-loader"></div>';
          
          //创建image
          var image = document.createElement('img');
          image.style.opacity = "0";
          if(gallery[i].getElementsByTagName('img')[0] && gallery[i].getElementsByTagName('img')[0].alt){
              image.alt = gallery[i].getElementsByTagName('img')[0].alt;
          }else{
              image.alt = "";
          }
          
          image.setAttribute("src", "");
          image.setAttribute("data-src", gallery[i].href);
          
          //插如figure中
          figure.appendChild(image);
          
          //创建figcaption
          if(options.captions){
              figcaption = document.createElement('figcaption');
              figcaption.style.opacity = "0";
              
              if(options.captionSelector == "self"&& gallery[i].getAttribute(options.captionAttribute)){
                  figcaption.innerHTML = gallery[i].getAttribute(options.captionAttribute);
              }else if(options.captionSelector=="img" && gallery[i].getElementsByTagName("img")[0].getAttribute(options.captionAttribute)){
                  figcaption.innerHTML = gallery[i].getElementsByTagName("img")[0].getAttribute(options.captionAttribute);
              }  
          }
          
          if(figcaption.innerHTML){
              figure.id = "lightbox-figure-"+x;
              figcaption.id = "lightbox-figcaption-"+x;
              figure.appendChild(figcaption);
              
              figcaptionsIds.push("lightbox-figcaption-"+x);
              figureIds.push( "lightbox-figure-"+x);
              
              ++x;
          }
          
          
          sliderElement[i].appendChild(figure);
          slider.appendChild(sliderElement[i]);
      }
      
      if(x!==0){
          overlay.setAttribute("aria-labelledby", figureIds.join(" "));
          overlay.setAttribute("aria-describedby", figcaptionsIds.join(" "));
      }
          
      //隐藏按钮 if necessary
      if(!options.nav || galleryLength === 1 || (options.nav === "auto"&& "ontouchstart" in window)){
          prevButton.style.display = "none";
          nextButton.style.display = "none";
      }else{
          prevButton.innerHTML = options.navText[0];
          nextButton.innerHTML = options.navText[1];
      }
           
      //隐藏counter if necessary
      if(!options.counter || galleryLength === 1){
          counter.style.display = "none";
      }
          
      if(!options.close){
          closeButton.style.display = "none";
      }else{
          closeButton.innerHTML = options.closeText;
      }
  }
  
  //10.打开遮罩
  var openOverlay = function(index){
      if(overlay.getAttribute("aria-hidden") == "false"){
          return;
      }
      
      if(!options.scroll){
          document.documentElement.classList.add("lightbox-no-scroll");
          document.body.classList.add("lightbox-no-scroll");
      }
      
      //保存最后获取焦点元素
      lastFocus = document.activeElement;
      
      //设置当前index
      currentIndex = index;
      
      //绑定事件
      bindEvents();
      
      //重设触摸位置
      touch = {
          count: 0,
          startX: null,
          startY: null,
          moveX: null,
          moveY: null
      };
      
      loadImage(currentIndex,function(){
          preloadImage(currentIndex+1);
          preloadImage(currentIndex-1);
      });
      
      updateOffset();
      updataCounter();
      overlay.setAttribute("aria-hidden", false);
      updateFocus();
  }
  
  //11.关闭遮罩
  var closeOverlay = function(){
      if(overlay.getAttribute("aria-hidden" === "true")){
          return;
      }
      
      if (!options.scroll) {
          document.documentElement.classList.remove("lightbox-no-scroll");
          document.body.classList.remove("lightbox-no-scroll");
      }
      
      //移除绑定事件
      unbindEvent();
      
      //移除lightbox
      overlay.setAttribute("aria-hidden", "true");
      
      lastFocus.focus();
  }
  

  /*******
  按钮事件绑定
  *******/ 
  
  //11.点击事件
  var clickHandler = function(e){
      //阻止默认事件
      e.preventDefault();
      
      if(this === prevButton){
          prevImage();
          updateFocus("left");
      }else if(this === nextButton){
          nextImage();
          updateFocus("right");
      }else if(this === closeButton){
          closeOverlay();
      } else if(this === overlay && e.target.id.indexOf("lightbox-content")!== -1){
          closeOverlay();
      }
               
  }
  
  //12.键盘事件
  var keyboardHandler = function(e){
      switch(e.keyCode){
          //left
          case 37:
              prevImage();
              updateFocus("left");
              break;
          //right
          case 39:
              nextImage();
              updateFocus("right");
              break;
          //Esc
          case 27:
              closeOverlay();
              break;
      }
  }
  
  //13.触摸事件
  var touchstartHandler = function(e){
      touch.count++;
      if(touch.count > 1){
          touch.multitouch = true;
      }
      
      //获取触摸位置
      touch.startX = e.changedTouches[0].pageX;
      touch.startY = e.changedTouches[0].pageY;
  }
  
  var touchmoveHandler = function(e){
      
       e.preventDefault();
      
      //如果动作已经触发或者是多点触摸
      if(touchFlag || touch.multitouch){
          return;
      }
      
      touch.moveX = e.changedTouches[0].pageX;
      touch.moveY = e.changedTouches[0].pageY;
      
      //超过50像素切换上一张或下一张
      if(touch.moveX - touch.startX > 50){
          touchFlag = true;
          prevImage();
      }else if(touch.moveX - touch.startX < -50){
          touchFlag = true;
          nextImage();
      }
      
      //向上滑动关闭lightbox
      if(options.swipClose && touch.moveY - touch.startY > 100){
          closeOverlay();
      }
   }
  
  var touchendHandler = function(e){
      touch.count--;
      if(touch.count <= 0){
          touch.multitouch = false;
      }
      touchFlag = false;
  }
  
  //13.事件绑定
  var bindEvents = function(){
      
      //绑定键盘事件
      if(options.keyboard){
          document.addEventListener("keyup", keyboardHandler, false);
      }
      
      //遮罩绑定事件
      if(options.docClose){
          overlay.addEventListener("click", clickHandler, false);
      }
      
      //按钮绑定事件
      prevButton.addEventListener("click", clickHandler, false);
      nextButton.addEventListener("click", clickHandler, false);
      closeButton.addEventListener("click", clickHandler, false);
      
      //触摸事件绑定
      overlay.addEventListener("touchstart", touchstartHandler, false);
      overlay.addEventListener("touchmove", touchmoveHandler, false);
      overlay.addEventListener("touchend", touchendHandler, false);
  }
  
  //14.事件移除
  var unbindEvent = function(){
      //移除键盘事件
      if(options.keyboard){
           document.removeEventListener("keyup", keyboardHandler, false);
      }
      //移除点击事件
      if(overlay.docClose){
          overlay.removeEventListener("click", clickHandler, false);
      }
      
      prevButton.removeEventListener("click", clickHandler, false);
      nextButton.removeEventListener("click", clickHandler, false);
      closeButton.removeEventListener("click", clickHandler, false);
      
      //移除触摸事件
      overlay.removeEventListener("touchstart", touchstartHandler, false);
      overlay.removeEventListener("touchsmove", touchmoveHandler, false);
      overlay.removeEventListener("touchsend", touchendHandler, false);
  }
  
   /*******
  初始设置
  *******/ 
  var initSetup = function(selector, userOptions){
      
      //混合参数
      if(userOptions){
          mergeOptions(userOptions, options);
      }
      
      //获取带有class为lightbox的元素
      var elements = document.querySelectorAll(selector);
      
      if(!elements.length){
          console.log("无法获取对象 \""+selector+"\".");
          return;
      }
      
      //为每个元素绑定事件
      [].forEach.call(elements, function(element, index){
          
          //把带有lightbox的元素放进gallery
          gallery.push(element);
          
          //为每个元素绑定click事件
          element.addEventListener("click", function(e){
              //点击打开遮罩
              openOverlay(index);
          
              //阻止默认事件
              e.preventDefault();
              
          },true)
      
      });
      
      
     galleryLength = gallery.length
      
     //初始化
     createOverlay();
  }
  
  //执行初始化
  initSetup(selector, userOptions);

  };
  
return lightbox;
  
}));