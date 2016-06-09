import fetch from 'isomorphic-fetch'

export function fetchTimeLogs() {
  return fetch('http://localhost:3000/v1/time_logs')
}

export function deleteTimeLog(timeLogId) {
  const url = 'http://localhost:3000/v1/time_logs/' + timeLogId
  const request = new Request(url,{
    method : 'DELETE',
    headers : new Headers({
      'Content-Type' : 'application/json'
    })
  })
  return fetch(request)
}

export function postTimeLog(json) {
  const url = 'http://localhost:3000/v1/time_logs/'
  const request = new Request(url,{
    method : 'POST',
    headers : new Headers({
      'Content-Type' : 'application/json'
    }),
    body : JSON.stringify(json)
  })
  return fetch(request)
}