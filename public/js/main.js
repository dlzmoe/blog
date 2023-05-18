$(function () {
  $('.post-content a').attr('target', '_blank');
  $('#TableOfContents a').attr('target', '')
  $('.post-content img').addClass('slb');
  $('.slb').simplebox({
    fadeSpeed: 100
  });
  $('iframe').wrap('<p class="iframe"></p>');

  $(document).on('scroll', function () {
    var $pageScrollTop = $(this).scrollTop()
    if ($pageScrollTop > 200) {
      $('.gotop').addClass('act')
    } else {
      $('.gotop').removeClass('act')
    }
  })

  $('.gotop').on('click', function () {
    $('html, body').stop().animate({
      scrollTop: 0
    })
  })

  $('.mob-menu').click(function () {
    $(this).toggleClass('act');
    $('.nav').toggleClass('active');
  })

  $('.nav a').each(function () {
    if ($(this).attr('href') == window.location.pathname) {
      $(this).addClass('active');
    }
  })
})

$(window).on("scroll", function () {
  if ($(window).scrollTop() >= 80) {
    $('header').addClass('is-active');
    var title = $('.single-title').text();
    $('.header-title').html(title)
  } else {
    $('header').removeClass('is-active');
    $('.header-title').html('')
  }
});

// 统计总数字和文章数
$(document).ready(function () {
  $.ajax({
    url: '/index.json',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      const pageUrls = data;
      const totalNum = pageUrls.length;
      $('#totalNum').html(totalNum);
      let totalWords = 0;
      pageUrls.forEach(urlObj => {
        $.get(urlObj.permalink, function (data) {
          const content = data.replace(/(<([^>]+)>)/gi, " ").replace(/[^\w\s]/gi, " ");
          const words = content.split(" ");
          const wordCount = words.filter(word => word !== "").length;
          totalWords += wordCount;
          $('#totalWords').html(totalWords);
        });
      });
    },
    error: function () {
      console.log('error')
    }
  })

});

// 创建一个图片懒加载实例
function callback_loaded(el) {
  if (el.getAttribute('data-src')) {
    el.parentNode.classList.add('lazy-loaded');
  }
}

window.addEventListener('DOMContentLoaded', function () {
  var elements = document.querySelectorAll('.lazy');
  if (typeof LazyLoad === 'function') {
    var lazyLoadInstance = new LazyLoad({
      elements_selector: '.lazy',
      callback_loaded: callback_loaded
    });
    window.ll = lazyLoadInstance;
  }
});
