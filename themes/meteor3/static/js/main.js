$(function () {
  $('.post-content img').addClass('slb');
  $('.slb').simplebox({
    fadeSpeed: 100
  });
  $('.post-content iframe').wrap('<div class="iframe"></div>');

  $('nav a').each(function () {
    if ($(this).attr('href') == window.location.pathname) {
      $(this).addClass('active');
    }
  })

  $('.gotop').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });
})