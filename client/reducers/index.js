import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import posts from './posts'
// import comments from './comments'
import timeLogs from './timeLogs'
import graphs from './graphs'

const rootReducer = combineReducers({
	timeLogs,
	graphs,
	routing: routerReducer
})

export default rootReducer