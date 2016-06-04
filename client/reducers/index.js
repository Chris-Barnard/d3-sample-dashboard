import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import posts from './posts'
// import comments from './comments'
import timeLogs from './timeLogs'

const rootReducer = combineReducers({
	timeLogs,
	routing: routerReducer
})

export default rootReducer