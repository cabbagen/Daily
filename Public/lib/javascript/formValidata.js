
function FormVerifier(formElement) {
	this.formElement = formElement;
};

FormVerifier.prototype = {
	constructor : FormVerifier,
	isPassValidata : function() {
		var noError = true;
		$('.error', '.field').each(function(index, element) {
			if($(element).css('display') !== 'none') {
				noError = false;
			}
		});
		return noError;
	},
	validata : function(validataFiledObject) {
		var that = this;
		if(typeof validataFiledObject !== 'undefined' && validataFiledObject instanceof Object) {
			for(var prop in validataFiledObject) {
				that._fieldValidata(validataFiledObject[prop]);
			}
		} else {
			throw new Error('Please check the params, It is a object of field name');
		}

		return this;
	},
	_fieldValidata : function(fieldName) {
		var fieldElement = this.formElement[fieldName],
			isMultiSelectFiled = this._isMultiSelectFiled(fieldElement);

		if(isMultiSelectFiled) {
			this._checkMultiSelectFiled(fieldElement);
		} else {
			this._checkSingleField(fieldElement);
		}
	},
	_isMultiSelectFiled : function(fieldElement) {
		if(fieldElement.length) {
			return true;
		}
		return false;
	},
	_checkMultiSelectFiled : function(fieldElements) {
		var fieldName = fieldElements[0].getAttribute('name');
		var isSelected = this.formElement[fieldName].value.length > 0 ? true : false;

		if(isSelected) {
			this._hideErrorMsg(fieldElements[0]);
		} else {
			this._showErrorMsg(fieldElements[0]);
		}
	},
	_checkSingleField : function(fieldElement) {
		var checkRules = fieldElement.getAttribute('data-condition').split(' ').map(function(ruleString) {
			return (ruleString === 'required') ? 'required' : new RegExp(ruleString);
		});

		var fieldValue = fieldElement.value;

		var checkResult = true; 

		checkRules.forEach(function(rule) {
			if(rule === 'required') {
				if(fieldValue.length === 0) {
					checkResult = false;
				}
			} else if(fieldValue.length > 0 && !rule.test(fieldValue)) {
				checkResult = false;
			}
		});

		if(!checkResult) {
			this._showErrorMsg(fieldElement);
		} else {
			this._hideErrorMsg(fieldElement);
		}

	},
	_showErrorMsg : function(fieldElement) {
		$(fieldElement).parents('.field').find('.error').show();
	},
	_hideErrorMsg : function(fieldElement) {
		$(fieldElement).parents('.field').find('.error').hide();
	}
};

define(function() {
	return FormVerifier;
});

