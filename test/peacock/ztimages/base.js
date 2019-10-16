// 以设计稿900px宽度为基准设置rem
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' :
    'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      // 大于640,就应该去访问pc站了
      if (clientWidth > 640) clientWidth = 640;
      // 页面中换算比例 : rem = px/90, 设计稿按900来
      docEl.style.fontSize = 100 * (clientWidth / 900) + 'px';
    };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(window.document, window)

// 操作dom
$(document).ready(function(){
  // banner swiper
  var swiperMain = new Swiper ('.swiper-main', {
    loop: true, // 循环模式选项
    // pagination: { // 如果需要分页器
    //   el: '.pagination-main',
    // },
    pagination: {
      el: '.pagination-main',
      type: 'custom',
      autoplayDisableOnInteraction : false,
      renderCustom: function (swiper, current, total) {
        var paginationHtml = " ";
        for (var i = 0; i < total; i++) {
          // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
          if (i === (current - 1)) {
            paginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
          }else{
            paginationHtml += '<span class="swiper-pagination-customs"></span>';
          }						  
        }
        return paginationHtml;
      },
    }
  })
  var $headerBtn =  $('.action-header-btn')
  var $headerNav =  $('.action-header-nav')
  var $mainNav =  $('.action-main-nav')
  // 头部导航栏toggle
  $headerBtn.click(function() {
    if ($headerNav.hasClass('nav-block')) {
      $headerNav.removeClass('nav-block')
    } else {
      $headerNav.addClass('nav-block')
    }
  })
  // 中间内容区域的切换
  $mainNav.delegate('.nav-item', 'click', function() {
    $(this).addClass('active').siblings().removeClass('active')
    var navAction = this.dataset.show
    switch (navAction) { // 展示对应的内容
      case 'main-is-what':
        $('.main-is-what').addClass('active')
        $('.main-story').removeClass('active')
        $('.main-video').removeClass('active')        
        break;
      case 'main-story':
        $('.main-story').addClass('active')
        $('.main-is-what').removeClass('active')
        $('.main-video').removeClass('active')        
        break;
      case 'main-video':
        $('.main-video').addClass('active')
        $('.main-story').removeClass('active')
        $('.main-is-what').removeClass('active')        
        break;
      default:
        break;
    }
  })
  // 明星楼盘swiper
  var swiperMxlp = new Swiper('.swiper-mxlp', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.pagination-mxlp',
      clickable: true,
    },
    pagination: {
      el: '.pagination-mxlp',
      type: 'custom',
      autoplayDisableOnInteraction : false,
      renderCustom: function (swiper, current, total) {
        var paginationHtml = " ";
        for (var i = 0; i < total; i++) {
          // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
          if (i === (current - 1)) {
            paginationHtml += '<span class="swiper-pagination-customs-mxlp swiper-pagination-customs-mxlp-active"></span>';
          }else{
            paginationHtml += '<span class="swiper-pagination-customs-mxlp"></span>';
          }						  
        }
        return paginationHtml;
      },
    }
  });  
});