
var modelHandle = {
  _ajax : function(params) {
    $.ajax({
      type : 'post',
      data : params,
      dataType : 'json',
      url : '/Home/UserInfo/changeInfo',
      success : function(data) {
        if(data.status === 200) {
          alert('修改成功');
        } else {
          alert('系统繁忙，请稍后重试！');
        }
      },
      error : function(e) {
        console.log(e);
        alert('系统繁忙，请稍后重试！');
      }
    })
  },
  _checkEmail : function(email) {
    var emailReg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/;
    return emailReg.test(email);
  },
  extra : function($element) {
    var value = $element.find('input[name="extra"]').val();

    if(value.length === 0) {
      alert('该值不能为空！');
      return;
    }
    this._ajax({type : 'extra', value : value});
    console.log('个性签名处理');
  },
  nickname : function($element) {
    var value = $element.find('input[name="nickname"]').val();

    if(value.length === 0) {
      alert('该值不能为空！');
      return;
    }
    this._ajax({type : 'nickname', value : value});
    console.log('昵称处理');
  },
  email : function($element) {
    var value = $element.find('input[name="email"]').val();
    
    if(value.length === 0) {
      alert('该值不能为空！');
      return;
    }

    var isPassEmailCheck = this._checkEmail(value);
    if(isPassEmailCheck) {
      this._ajax({type : 'email', value : value});
    } else {
      alert('请输入合法的 email');
    }
    console.log('email 处理');
  },
  gender : function($element) {
    var value = $element.find('input:checked').length > 0 ? $element.find('input:checked').val() : '';
    if(value.length === 0) {
      alert('请选择选项');
      return;
    }
    this._ajax({type : 'gender', value : value});
    console.log('性别处理');
  }
};


Object.keys(modelHandle).forEach(function(modelType) {
  // 显示
  $('.target-' + modelType).on('click', function() {
    $('.model-wrap').show().find('.' + modelType).addClass('model-show');
  });

  // 取消
  $('.' + modelType).find('button').eq(0).on('click', function() {
    $('.' + modelType).removeClass('model-show').parent('.model-wrap').hide();
  });

  // 确定
  $('.' + modelType).find('button').eq(1).on('click', function() {
    modelHandle[modelType]($('.' + modelType));
    $('.' + modelType).removeClass('model-show').parent('.model-wrap').hide();
  });


});
