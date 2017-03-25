
function fetchRequire(requireUrl, method, params) {

	var ajaxParams = {
		url : requireUrl,
		type : method.toLowerCase(),
		data : params,
		dataType : 'json'
	};

	if(params instanceof FormData) {
		ajaxParams = $.extend(ajaxParams, {
			processData : false,
			contentType : false,
			cache : false
		});
	}

	return $.ajax(ajaxParams).then(function(response) {
		if(response.status === 200) {
			return response;
		} else if(response.status === 300) {
			window.location.href = response.data.redirectUrl;
			return null;
		} else {
			alert('网络请求失败，请稍后重试');
			return null;
		}
	}, function(e) {
		console.log(e);
		alert('网络请求失败，请稍后重试');
	});
}

define(function() {
	return fetchRequire;
});