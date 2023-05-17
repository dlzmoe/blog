const data = new FormData();
data.append('mail', 'example@mail.com');
data.append('content', '这是一封测试邮件');
data.append('name', 'John');

fetch('https://api.zburu.com/api/mail.php', {
  method: 'POST',
  body: data
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error(error);
});
