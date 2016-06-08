function timeLog(state, action) {
  switch(action.type) {
    case 'SELECT_ACTIVE_HIGHLIGHT':
      if (state.timelog_id === action.timeLogId) {
        return { ...state,
          highlight : true
        }
      } else {
        return state
      }
    case 'DESELECT_ACTIVE_HIGHLIGHT':
      if (state.timelog_id === action.timeLogId) {
        return { ...state,
          highlight : false
        }
      } else {
        return state
      }
    default:
      return state
  }
}

function reducer(state = [], action) {
  
  switch(action.type) {
    case 'SELECT_ACTIVE_HIGHLIGHT':
      return state.map((data) => timeLog(data, action))
    case 'DESELECT_ACTIVE_HIGHLIGHT':
      return state.map((data) => timeLog(data, action))
    case 'REMOVE_TIME_LOG':
      const timeLogIndex = state.findIndex((element, index, array) => {
        while (element.timelog_id <= action.timeLogId) {
          if (element.timelog_id != action.timeLogId) {
            return false
          }
          return element
        }
      })
      return [
        ...state.slice(0,timeLogIndex),
        ...state.slice(timeLogIndex + 1)
      ]
    case 'ADD_TIME_LOG':
      return [
        ...state, {
          timelog_id : action.timeLogId,
          description : action.description,
          time_in_minutes : action.timeInMinutes,
          project_name : action. projectName
        }
      ]
    default:
      return state
  }
}

export default reducer