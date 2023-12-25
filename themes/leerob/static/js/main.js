$(function () {
  $('.content img').addClass('slb');
  $('.slb').simplebox({
    fadeSpeed: 100
  });
  $('.content iframe').wrap('<div class="iframe"></div>');

  $('nav a').each(function () {
    if ($(this).attr('href') == window.location.pathname) {
      $(this).addClass('active');
    }
  })

  // 
  $('#menu-btn').click(function () {
    $('.site-nav').toggleClass('act');
  })
})