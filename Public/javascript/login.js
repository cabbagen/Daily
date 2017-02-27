
requirejs.config({
	baseUrl : '/Public/lib/javascript/',
	paths : {
		handleLocalStorage : 'handleLocalStorage'
	}
});


requirejs(['handleLocalStorage'], function(handleLocalStorage) {
	var formStorage = new HandleLocalStorage();
	var isSupportLocalStorage = formStorage.isSupportLocalStorage;
	var formElement = $('form', '.login-form').get(0);

	// 初次赋值
	$(function() {
		if(isSupportLocalStorage && formStorage.getLocalStorage('dailyUserInfo')) {
			var dailyUserInfo = formStorage.getLocalStorage('dailyUserInfo');
			formElement.username.value = dailyUserInfo.username;
			formElement.password.value = dailyUserInfo.password;
			formElement.remeber.checked = true;
		}
	});

	// 表单提交
	$(function() {
		$('button', '.submit').on('click', function() {
			var isRemember = formElement.remeber.checked;
			if(isRemember && isSupportLocalStorage) {
				formStorage.addLocalStorage({
					dailyUserInfo : {
						username : formElement.username.value,
						password : formElement.password.value
					}
				});
			} else if(isSupportLocalStorage) {
				formStorage.removeLocalStorage('dailyUserInfo');
			}
			formElement.submit();
		});
	});
});


