// increment
export function increment(index) {
  return {
    type : 'INCREMENT_LIKES',
    index
  }
}

// add comment
export function addComment(postId, author, comment) {
  return {
    type : 'ADD_COMMENT', 
    postId,
    author,
    comment
  }
}

// remove comment
export function removeComment(postId, index) {
  return {
    type : 'REMOVE_COMMENT',
    postId,
    index
  }
}

// Above action creators are legacy ones for old state
// New Actions will be put below for now

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

export function removeTimeLog(timeLogId) {
  return {
    type : 'REMOVE_TIME_LOG',
    timeLogId
  }
}