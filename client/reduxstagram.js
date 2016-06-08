// let's go!
import React from 'react'

import { render } from 'react-dom'

// import CSS
import css from './styles/style.styl'

// import components
import App from './components/App'
import Single from './components/Single'
// import Placeholder from './components/Placeholder'
import AddTimeLog from './components/AddTimeLog'

// import react router deps
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './store'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={AddTimeLog}></IndexRoute>
        <Route path="/view/:dataId" component={Single}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'))