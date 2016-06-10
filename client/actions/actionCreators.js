import { BEGIN, COMMIT, REVERT } from 'redux-optimist'

let nextAsyncId = 0

import * as api from '../data/api'

/***  Helper Functions  ***/

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

/***  OLD Actions  ***/

// // increment
// export function increment(index) {
//   return {
//     type : 'INCREMENT_LIKES',
//     index
//   }
// }

// // add comment
// export function addComment(postId, author, comment) {
//   return {
//     type : 'ADD_COMMENT', 
//     postId,
//     author,
//     comment
//   }
// }

// // remove comment
// export function removeComment(postId, index) {
//   return {
//     type : 'REMOVE_COMMENT',
//     postId,
//     index
//   }
// }

/***  UI Syncrohonous Actions  ***/

// select active time log
export function selectActiveHighlight(timeLogId) {
  return {
    type : 'SELECT_ACTIVE_HIGHLIGHT',
    timeLogId
  }
}

// deselect active time log
export function deselectActiveHighlight(timeLogId) {
  return {
    type : 'DESELECT_ACTIVE_HIGHLIGHT',
    timeLogId
  }
}

export function resizeGraph(graphId, width, height) {
  return {
    type : 'RESIZE_GRAPH',
    graphId,
    width,
    height
  }
}

/***  ASYNC Data Actions  ***/

  /***  REMOVE_TIME_LOG  ***/  

function removeTimeLogRequest(timeLogId, asyncId) {
  return {
    type : 'REMOVE_TIME_LOG',
    timeLogId,
    optimist : {
      type : BEGIN,
      id : asyncId
    }
  }
}

function removeTimeLogError(error, asyncId) {
  return {
    type : 'REMOVE_TIME_LOG_ERROR',
    error,
    optimist : {
      type : REVERT,
      id : asyncId
    }
  }
}

function removeTimeLogResponse(data, asyncId) {
  return {
    type : 'REMOVE_TIME_LOG_RESPONSE',
    optimist : {
      type : COMMIT,
      id : asyncId
    }
  }
}

// new async version of removeTimeLog
export function removeTimeLog(timeLogId) {
  return (dispatch) => {
    let asyncId = nextAsyncId++
    dispatch(removeTimeLogRequest(timeLogId, asyncId))

    return api.deleteTimeLog(timeLogId)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => dispatch(removeTimeLogResponse(data.data, asyncId)))
      .catch(err => dispatch(removeTimeLogError(err.message, asyncId)))
  }
}

  /***  ADD_TIME_LOG  ***/

function addTimeLogRequest(json, asyncId) {
  const autoMin = 1000
  const autoId = json.timelog_id ? json.timelog_id : Math.floor( Math.random() * autoMin ) + autoMin

  return {
    type : 'ADD_TIME_LOG',
    timeLogId : autoId,
    projectName : json.project_name,
    description : json.description,
    timeInMinutes : json.time_in_minutes * 1,
    optimist : {
      type : BEGIN,
      id : asyncId
    }
  }
}

function addTimeLogResponse(data, asyncId) {
  return {
    type : 'ADD_TIME_LOG_RESPONSE',
    timeLogId : data[0].timelog_id,
    projectName : data[0].project_name,
    description : data[0].description,
    timeInMinutes : data[0].time_in_minutes,
    optimist : {
      type : REVERT,
      id : asyncId
    }
  }
}

function addTimeLogError(error, asyncId) {
  return {
    type : 'ADD_TIME_LOG_ERROR',
    error,
    optimist : {
      type : REVERT,
      id : asyncId
    }
  }
}

// async addTimeLog
export function addTimeLog(json) {
  // we could manipulate json here, but i'll do it on the server
  return (dispatch) => {
    // we will want an asyncId for this action
    let asyncId = nextAsyncId++
    // dispatch action in app to add stub along with our asyncId
    dispatch(addTimeLogRequest(json, asyncId))
    // and send request to server as well
    return api.postTimeLog(json)
      .then(handleErrors)
      .then(response => response.json())
      // if we get a positive response, then revert stub data and add item from server
      .then(data => dispatch(addTimeLogResponse(data.data, asyncId)))
      // if we get an error then revert action
      .catch(err => dispatch(addTimeLogError(err.message, asyncId)))
  }
}

  /***  FETCH_TIME_LOGS  ***/

function fetchTimeLogsRequest() {
  return {
    type : 'LOAD_TIME_LOGS_REQUEST'
  }
}

function fetchTimeLogsResponse(data) {
  return {
    type : 'LOAD_TIME_LOGS_RESPONSE',
    data
  }
}

function fetchTimeLogsError(error) {
  return {
    type : 'LOAD_TIME_LOGS_ERROR',
    error
  }
}

// async action
export function fetchTimeLogs() {
  return (dispatch) => {
    dispatch(fetchTimeLogsRequest())

    return api.fetchTimeLogs()
      .then(handleErrors)
      .then(response => response.json())
      .then(data => dispatch(fetchTimeLogsResponse(data.data)))
      .catch(err => dispatch(fetchTimeLogsError(err.message)))
  }
}

  /***  FETCH_PROJECTS  ***/
function fetchActiveProjectsRequest() {
  return {
    type : 'FETCH_ACTIVE_PROJECTS_REQUEST'
  }
}

function fetchActiveProjectsResponse(data) {
  return {
    type : 'FETCH_ACTIVE_PROJECTS_RESPONSE',
    data
  }
}

function fetchActiveProjectsError(error) {
  return {
    type : 'FETCH_ACTIVE_PROJECTS_ERROR',
    error
  }
}

// async functino
export function fetchActiveProjects() {
  return (dispatch) => {
    dispatch(fetchActiveProjectsRequest())

    return api.fetchActiveProjects()
      .then(handleErrors)
      .then(response => response.json())
      .then(data => dispatch(fetchActiveProjectsResponse(data.data)))
      .catch(err => dispatch(fetchActiveProjectsError(err.message)))
  }
}
