import * as mainSage from './main';

const getSagaArrayFromObject = function(sagaObject) {
	var sagaArray = [];
	for(var prop in sagaObject) {
		sagaArray.push(sagaObject[prop]());
	}
	return sagaArray;
}

export default function* rootSaga() {
	yield [
		...getSagaArrayFromObject(mainSage)
	]
};