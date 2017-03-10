import 'babel-polyfill';
import ReactDom from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import Pagination from './container/';
import reducer from './reducers/';
import rootSaga from './sagas/';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);


ReactDom.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={Pagination.initLoading} />
			<Route path="/web" component={Pagination.main}>
				<Route path="/web/:folders" component={Pagination.file}>
					<Route path="/web/:folders/:file" />
				</Route>
			</Route>
		</Router>
	</Provider>
, document.getElementById('root'));



