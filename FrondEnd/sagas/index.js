import * as mainSaga from './main';
import * as fileSaga from './file';
import * as calendarSaga from './calendar';
import * as categorySaga from './category';
import * as groupSage from './group';
import * as shareSage from './share';

const getSagaArrayFromObject = function(sagaObject) {
  var sagaArray = [];
  for(var prop in sagaObject) {
    sagaArray.push(sagaObject[prop]());
  }
  return sagaArray;
}

export default function* rootSaga() {
  yield [
    ...getSagaArrayFromObject(mainSaga),
    ...getSagaArrayFromObject(fileSaga),
    ...getSagaArrayFromObject(calendarSaga),
    ...getSagaArrayFromObject(categorySaga),
    ...getSagaArrayFromObject(groupSage),
    ...getSagaArrayFromObject(shareSage),
  ]
};