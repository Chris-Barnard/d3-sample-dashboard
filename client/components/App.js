import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/actionCreators'
// import { selectActiveHighlight, deselectActiveHighlight } from '../actions/actionCreators'
import Main from './Main'

function mapStateToProps(state) {
  return {
    timeLogs : state.timeLogs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
  /*return {
    selectActiveHighlight : (timeLogId) => {
      dispatch(selectActiveHighlight(timeLogId))
    }
  }*/
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App