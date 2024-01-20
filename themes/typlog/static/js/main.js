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

  // $(".toggle-button-cover input").click(function () {
  //   if ($(".toggle-button-cover input").prop("checked")) {
  //     $('.twikoo').show();
  //     $('.giscus').hide();
  //   } else {
  //     $('.twikoo').hide();
  //     $('.giscus').show();
  //   }
  // });


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
})

var duration = 15 * 1000;
var animationEnd = Date.now() + duration;
var skew = 1;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

(function frame() {
  var timeLeft = animationEnd - Date.now();
  var ticks = Math.max(200, 500 * (timeLeft / duration));
  skew = Math.max(0.8, skew - 0.001);

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      // since particles fall down, skew start toward the top
      y: (Math.random() * skew) - 0.2
    },
    colors: ['#ffffff'],
    shapes: ['circle'],
    gravity: randomInRange(0.4, 0.6),
    scalar: randomInRange(0.4, 1),
    drift: randomInRange(-0.4, 0.4)
  });

  if (timeLeft > 0) {
    requestAnimationFrame(frame);
  }
}());