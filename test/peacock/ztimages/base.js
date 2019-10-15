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
  var mySwiper = new Swiper ('.swiper-main', {
    loop: true, // 循环模式选项
    pagination: { // 如果需要分页器
      el: '.pagination-main',
    },
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
});