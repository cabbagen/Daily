
requirejs.config({
	baseUrl : '/Public/lib/javascript/',
	paths : {
		formVerifier : 'formValidata',
		fetchRequire : 'fetchRequire'
	}
});


requirejs(['formVerifier', 'fetchRequire'], function(FormVerifier, fetchRequire) {
	var form = $('form', '.content').get(0);
	var formVerifier = new FormVerifier(form);

	var registPager = {
		formSelect : function(formVerifier) {
			if(typeof formVerifier === 'undefined') {
				throw new Error('请传入 FormVerifier 实例');
			}
			formVerifier.validata({
				username : 'username',
				password : 'password',
				nickname : 'nickname',
				email : 'email',
				gender : 'gender'
			});
			return formVerifier.isPassValidata();
		},
		uploadAvator : function(sourceInput, targetImg) {
			var isSelectFile = sourceInput.val() !== '' ? true : false; 
			var formData = new FormData();

			if(isSelectFile) {
				formData.append('avatorImg', sourceInput[0].files[0]);
				var promise = fetchRequire('/Home/Login/uploadAvator', 'POST', formData);
				promise.then(function(data) {
					$('<img id="uploadAvator" src="' + data.data + '" />').appendTo(targetImg);
				});
			}
		}
	};
	
	// 表单提交
	$('.submit').on('click', 'button', function() {
		var isPassValidata = registPager.formSelect(formVerifier);
		if(isPassValidata) {
			var formData = new FormData(form);
			var avatorImg = $('#uploadAvator').attr('src') || null;
			formData.append('avator', avatorImg);
			var promise = fetchRequire('/Home/Login/handleRegist','POST', formData);
		}
	});

	// 头像上传
	$('.image-show').on('click', function() {
		$('input', '.avator').click();
	});

	$('button', '.avator').on('click', function() {
		var sourceInput = $(this).prev('input'),
			targetImg = $('.image-show', '.upload-avator');

		registPager.uploadAvator(sourceInput, targetImg);
	});
});
