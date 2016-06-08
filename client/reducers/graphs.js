function graph(state = {}, action) {
  switch(action.type) {
    case 'RESIZE_GRAPH':
      return {
        height : action.height,
        width : action.width
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