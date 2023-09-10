// $(function () {

//   function textareainner() {
//     var str = $('.el-textarea__inner').val();
//     if (str != '') {
//       $('.tk-meta-input').css('display', 'flex');
//     } else {
//       $('.tk-meta-input').hide();
//     }
//   }
//   textareainner();

//   $('.el-textarea__inner').on("input", function () {
//     textareainner();
//   });

//   tagStatus();
//   $('.el-textarea__inner,.el-input__inner').focus(function () {
//     tagStatus();
//   })

// })

// function tagStatus() {
//   if ($('.tk-avatar.tk-has-avatar .tk-avatar-img').length > 0) {
//     $('.tk-tag-status').hide();
//   } else {
//     $('.tk-submit .tk-avatar').after('<div class="tk-tag-status">游客</div>')
//   }
// }