function graph(state = {}, action) {
  switch(action.type) {
    case 'RESIZE_GRAPH':
      return {
        width : action.width,
        height : action.height
      }
    default:
      return state
  }
}

function reducer(state = {}, action) {
  switch(action.type) {
    case 'RESIZE_GRAPH':
      return {
        ...state,
        [action.graphId] : graph(state.graphId, action)
      }
    default:
      return state
  }
}

export default reducer