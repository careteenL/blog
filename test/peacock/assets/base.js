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
  var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
  })
  var $headerBtn =  $('.header-btn')
  var $headerNav =  $('.header-nav')
  $headerBtn.click(function() { // 头部导航栏toggle
    if ($headerNav.hasClass('nav-block')) {
      $headerNav.removeClass('nav-block')
    } else {
      $headerNav.addClass('nav-block')
    }
  })
});