import 'babel-polyfill';
import ReactDom from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import moment from 'moment';

import Pagination from './container/';
import reducer from './reducers/';
import rootSaga from './sagas/';

moment.locale('zh-cn');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);


ReactDom.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={Pagination.initLoading} />
			<Route path="/web" component={Pagination.main}>
				<Route path="/folders/:folders" component={Pagination.file}>
					<Route path="/folders/:folders/:file" />
				</Route>
				<Route path="/calendars/:calendars" component={Pagination.calendar} />
				<Route path="/categorys/:categorys" component={Pagination.category} />
				{/*
				<Route path="/groups/:groups" component={Pagination.group}>
					<Route path="/groups/:groups/:group" />
				</Route>
				<Route path="/shares/:shares" component={Pagination.share}>
					<Route path="/shares/:shares/:share" />
				</Route>
				*/}
			</Route>
		</Router>
	</Provider>
, document.getElementById('root'));




