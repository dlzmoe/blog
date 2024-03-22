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
      console.log('1');
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

  // $('.highlight>pre>code').each(function(){
  //   const datalang = $(this).attr('data-lang');
  //   $(this).parents('.chroma').before(`<span class="tag">${datalang}</span>`);
  // })

})
