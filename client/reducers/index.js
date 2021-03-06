import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import optimist from 'redux-optimist'

// import posts from './posts'
// import comments from './comments'
import timeLogs from './timeLogs'
import graphs from './graphs'
import projects from './projects'



const rootReducer = optimist(combineReducers({
  timeLogs,
  projects,
  graphs,
  routing : routerReducer,
  form : formReducer
}))

export default rootReducer