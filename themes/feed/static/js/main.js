document.addEventListener('DOMContentLoaded', function () {
  Array.from(document.querySelectorAll('.post-content a')).forEach(function (link) {
    link.setAttribute('target', '_blank');
  });
  Array.from(document.querySelectorAll('#TableOfContents a')).forEach(function (link) {
    link.removeAttribute('target');
  });
  Array.from(document.querySelectorAll('.post-content img')).forEach(function (img) {
    img.classList.add('slb');
  });
  Array.from(document.querySelectorAll('.slb')).forEach(function (slb) {
    slb.addEventListener('click', function () {
      simplebox.init({
        fadeSpeed: 100
      });
    });
  });
  Array.from(document.querySelectorAll('iframe')).forEach(function (iframe) {
    var wrapper = document.createElement('p');
    wrapper.classList.add('iframe');
    iframe.parentNode.insertBefore(wrapper, iframe);
    wrapper.appendChild(iframe);
  });

  document.addEventListener('scroll', function () {
    var pageScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (pageScrollTop > 200) {
      document.querySelector('.gotop').classList.add('act');
    } else {
      document.querySelector('.gotop').classList.remove('act');
    }
  });

  document.querySelector('.gotop').addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.querySelector('.mob-menu').addEventListener('click', function () {
    this.classList.toggle('act');
    document.querySelector('.nav').classList.toggle('active');
  });

  Array.from(document.querySelectorAll('.nav a')).forEach(function (link) {
    if (link.getAttribute('href') === window.location.pathname) {
      link.classList.add('active');
    }
  });
});

// 统计总数字和文章数
document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/index.json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      var pageUrls = JSON.parse(xhr.responseText);
      var totalNum = pageUrls.length;
      document.getElementById('totalNum').innerHTML = totalNum;
      var totalWords = 0;
      pageUrls.forEach(function (urlObj) {
        var innerXhr = new XMLHttpRequest();
        innerXhr.open('GET', urlObj.permalink);
        innerXhr.onload = function () {
          if (innerXhr.status === 200) {
            var content = innerXhr.responseText.replace(/(<([^>]+)>)/gi, " ").replace(/[^\w\s]/gi, " ");
            var words = content.split(" ");
            var wordCount = words.filter(function (word) {
              return word !== "";
            }).length;
            totalWords += wordCount;
            document.getElementById('totalWords').innerHTML = totalWords;
          }
        };
        innerXhr.send();
        innerXhr.onerror = function () {
          console.log('Error');
        };
        innerXhr.send();
      });
    } else {
      console.log('Error');
    }
  };
  xhr.onerror = function () {
    console.log('Error');
  };
  xhr.send();
});