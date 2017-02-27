function HandleLocalStorage() {
	if(typeof window.localStorage !== 'undefined') {
		this.isSupportLocalStorage = true;
	} else {
		this.isSupportLocalStorage = false;
	}
}

HandleLocalStorage.prototype = {
	constructor : HandleLocalStorage,
	addLocalStorage : function(data) {
		var that = this;
		for(var prop in data) {
			if( !that.getLocalStorage(prop) ) {
				window.localStorage.setItem(prop, JSON.stringify(data[prop]));
			}
		}
	},
	removeLocalStorage : function(prop) {
		if(typeof prop !== 'string') {
			throw new Error('请传入字符串');
		}
		window.localStorage.removeItem(prop);
	},
	setLocalStorage : function(data) {
		var that = this;
		for(var prop in data) {
			window.localStorage.setItem(prop, JSON.stringify(data[prop]));
		}
	},
	getLocalStorage : function(prop) {
		if(typeof prop !== 'string') {
			throw new Error('请传入字符串');
		}
		return JSON.parse(window.localStorage.getItem(prop));
	}
};

define(function() {
	return HandleLocalStorage;
});