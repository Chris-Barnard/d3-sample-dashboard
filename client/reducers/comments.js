function postComments(state = [], action) {
  
  switch(action.type) {

    case 'ADD_COMMENT':
      return [...state, {
        user : action.author,
        text : action.comment
      }]
    case 'REMOVE_COMMENT':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    default:
      return state  
  }
}

function reducer(state = {}, action) {

  switch(action.type) {

    case 'ADD_COMMENT':
      console.log('Adding comment', action)
      return {
        ...state,
        [action.postId] : postComments(state[action.postId], action)
      }
    case 'REMOVE_COMMENT':
      console.log('Removing comment', action)
      return {
        ...state,
        [action.postId] : postComments(state[action.postId], action)
      }
    default:
      return state
  }
}

export default reducer