import { createStore, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import d3 from 'd3'
// const fs = require('fs')

// import the root reducer
import rootReducer from './reducers/index'

// import data
import timeLogs from './data/timeLogData'


// read in the csv
// fs.readFile('./data/timeLogData.csv', (err, data) => {
//   console.log(err)
//   console.log(data)
// })

// parse the timelog csv for starting values
/*d3.csv("/csvFile", (err, data) => {
  console.log(err)
  console.log(data[0])

})*/

const defaultState = {
  timeLogs : timeLogs.map((d) => {
    return { ...d,
      time_in_minutes : d.time_in_minutes * 1,
      timelog_id : d.timelog_id * 1,
      highlight : false
    }
  }),

}

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, defaultState, enhancers)
export const history = syncHistoryWithStore(browserHistory, store)

if (module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}
// create an object for default data
// const defaultState = {
//   timeLogs
// }

export default store