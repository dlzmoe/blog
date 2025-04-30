$(function () {
  if (window.location.pathname.indexOf('/weekly-') > -1) {
    var str = window.location.pathname;
    var num = Number(str.match(/\/weekly-(\d+)\.html/)[1]);

    var nextnum = num + 1; // 计算下一期的期数
    var nextUrl = `/blog/weekly-${nextnum}.html`; // 生成下一期的链接

    if (num == 1) {
      $('.weekly-pagination').html(`
        <p>周刊导航：
        <a href="${nextUrl}">下一期（#${nextnum}）</a>
        </p>
      `);
    } else {
      var prevnum = num - 1; // 计算上一期的期数
      var prevUrl = `/blog/weekly-${prevnum}.html`; // 生成上一期的链接

      // 先显示上一期的链接
      $('.weekly-pagination').html(`
        <p>周刊导航：
        <a href="${prevUrl}">上一期（#${prevnum}）</a> 
        | 
        <a href="${nextUrl}" id="next-link">下一期（#${nextnum}）</a>
        </p>
      `);

      // 使用 fetch 检查下一期是否存在
      fetch(nextUrl, {
          method: 'HEAD'
        }) // 使用 HEAD 请求只获取响应头
        .then((response) => {
          if (!response.ok) {
            // 如果响应不成功，隐藏下一期链接和“|”符号
            $('.weekly-pagination').html(`
              <p>周刊导航：
              <a href="${prevUrl}">上一期（#${prevnum}）</a>
              </p>
            `);
          }
        })
        .catch((error) => {
          console.error('Error fetching next link:', error);
        });
    }
  }

  $('.content iframe').wrap('<div class="iframe"></div>');

  if ($('#TableOfContents').html() == "") {
    $('.toc').hide();
  } else {
    $('.toc').show();
  }

  $('#TableOfContents a').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('href');
    $('html,body').animate({
        scrollTop: $(id).offset().top - 30
      },
      500
    );
  });

  $('.content img:not(.not)').addClass('zimgbox');
  $('body').append(
    '<div id="zimgbox-wrap" style="display:none"><img src></div>'
  );
  $('.top-link').click(function () {
    $('html,body').animate({
        scrollTop: 0
      },
      500
    );
  });
  $('.zimgbox').each(function () {
    $(this).click(function () {
      var $url = $(this).attr('src');
      $('html').css('overflow-y', 'hidden');
      $('#zimgbox-wrap').css('display', 'flex');
      $('#zimgbox-wrap img').addClass('zimgbox-act');
      $('#zimgbox-wrap img').attr('src', $url);
    });
  });
  $('#zimgbox-wrap').click(function () {
    $('html').css('overflow-y', 'scroll');
    $('#zimgbox-wrap').css('display', 'none');
    $('#zimgbox-wrap img').removeClass('zimgbox-act');
    $('#zimgbox-wrap img').attr('src', '');
  });

  $('.content a img').removeClass('zimgbox');
});

function goTop() {
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 200) {
      $('.gotop').addClass('act');
    } else {
      $('.gotop').removeClass('act');
    }
  });

  $('.gotop').click(function () {
    $('html,body').animate({
        scrollTop: 0
      },
      500
    );
  });
}
goTop();

function nav(){
  $('.nav a').each(function(){
    var href = $(this).attr('href');
    if (window.location.pathname == href) {
      $(this).addClass('act');
    } else {
      $(this).removeClass('act');
    }
  })
}
nav();