/*
* @Author: TomChen
* @Date:   2018-08-20 09:14:30
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-20 17:05:30
*/
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducer.js'

const store = createStore(reducer,applyMiddleware(thunk));

export default store;