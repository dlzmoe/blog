$(function () {
  $('.postbody img').addClass('slb');
  $('.postbody a').attr('target', '_blank');
  $('.slb').simplebox({
    fadeSpeed: 100
  });
  $('.postbody iframe').wrap('<div class="iframe"></div>');

  $('nav a').each(function () {
    if ($(this).attr('href') == window.location.pathname) {
      $(this).addClass('active');
    }
  })


})