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
      .then(response => {
        if (!response.ok) {
          // 如果响应不成功，隐藏下一期链接和“|”符号
          $('.weekly-pagination').html(`
            <p>周刊导航：
            <a href="${prevUrl}">上一期（#${prevnum}）</a>
            </p>
          `);
        }
      })
      .catch(error => {
        console.error('Error fetching next link:', error);
      });
  }
}