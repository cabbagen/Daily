
// 用于处理 ajax 请求， 依赖 jQuery
const ajax = function(url, method, params) {

	var method = method || 'get',
		params = params || {};

	if(typeof url !== 'undefined') {
		return jQuery.ajax({
			url : url,
			type : method,
			dataType : 'json',
			data : params
		});
	} else {
		console.log(`传入参数： url: ${url}  method: ${method}  params: ${JSON.stringify(params)}`);
		throw new Error('ajax 请求错误，请确定传入参数');
	}
	
}

// formData ajax 上传
const formAjax = function(url, method, params) {

	var method = method || 'get',
		params = params || {};

	if(typeof url !== 'undefined') {
		return jQuery.ajax({
			url : url,
			type : method,
			dataType : 'json',
			data : params,
			cache : false,
			processData : false,
			contentType : false
		});
	} else {
		console.log(`传入参数： url: ${url}  method: ${method}  params: ${JSON.stringify(params)}`);
		throw new Error('ajax 请求错误，请确定传入参数');
	}
	
}


export default {
	ajax,
	formAjax
};