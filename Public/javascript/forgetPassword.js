
var FIND_PASSWORD_URL = '';

function checkEmail(email) {
  var regExp = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/;
  if(email.trim().length === 0) {
    return {flag : false, msg : '请输入 email'};
  } else {
    if(regExp.test(email)) {
      return {flag : true};
    } else {
      return {flag : false, msg : '请输入合法的 email'};
    }
  }
}

function findPasswordRequire(email) {
  $.ajax({
    url : '/Home/Email/findPasswordFromEmail',
    type : 'post',
    data : {email : email},
    dataType : 'json',
    success : function(data) {
      if(data.status === 200) {
        alert('邮件已发出，请注意查收！');
      } else {
        alert(data.msg);
      }
    },
    error : function(e) {
      console.log(e);
      alert('系统繁忙，请稍后重试！');
    }
  });
}


$('button', '.content').on('click', function() {
  var email = $('input', '.content').val();
  var result = checkEmail(email);
  if(result.flag) {
    findPasswordRequire(email);
  } else {
    alert(result.msg);
  }
});