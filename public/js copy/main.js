$(function () {
  $('.post-content iframe').wrap('<div class="iframe"></div>');
  $('nav a').each(function () {
    if ($(this).attr('href') == window.location.pathname) {
      $(this).addClass('active');
    }
  })

  $('.post-content img').addClass('zimgbox');
  $('body').append('<div id="zimgbox-wrap" style="display:none"><img src></div>');
  $(".top-link").click(function () {
    $("html,body").animate({
      scrollTop: 0
    }, 500)
  })

  if ($('.toc').html() == '' || $('#TableOfContents').html() == '') {
    $('.toc').hide();
  }

  $('.zimgbox').each(function () {
    $(this).click(function () {
      var $url = $(this).attr('src');
      $('html').css('overflow-y', 'hidden');
      $('#zimgbox-wrap').css('display', 'flex');
      $('#zimgbox-wrap img').addClass('zimgbox-act');
      $('#zimgbox-wrap img').attr('src', $url);
    })
  })
  $('#zimgbox-wrap').click(function () {
    $('html').css('overflow-y', 'scroll');
    $('#zimgbox-wrap').css('display', 'none');
    $('#zimgbox-wrap img').removeClass('zimgbox-act');
    $('#zimgbox-wrap img').attr('src', '');
  })

  function TimeDifference() {
    const time = $('.date time').html();
    var now = new Date(); // 获取当前时间
    var end = new Date(time); // 设置结束时间
    var diff = Math.abs(now - end); // 计算两个日期之间的差值，结果是毫秒数
    var diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24)); // 将毫秒转换为天数

    if (diffDays < 99) {
      $('.expired-tips').hide();
    } else {
      $('.expired-tips').show().html(`提醒：本文最后更新于 ${diffDays} 天前，文中所描述的信息可能已发生改变，请谨慎使用。`)
    }
  }
  TimeDifference();

  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 50) {
      $(".fixed").addClass("is-active")
    } else {
      $(".fixed").removeClass("is-active")
    }
  });
  
})