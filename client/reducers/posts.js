function reducer(state = [], action) {

  switch(action.type) {
    case 'INCREMENT_LIKES':
      console.log('Incrementing Likes!!', action)
      return [
        ...state.slice(0,action.index), // everything before the element we want to change
        {...state[action.index], likes : state[action.index].likes + 1 }, // the component we want, but with an altered likes count
        ...state.slice(action.index + 1) // everything after the element we want to change
      ]
    default:
      return state
  }

}

export default reducer