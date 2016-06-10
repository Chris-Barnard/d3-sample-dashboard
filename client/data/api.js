import fetch from 'isomorphic-fetch'

const URL = 'http://localhost:3000/v1/'

export function fetchTimeLogs() {
  return fetch(URL + 'time_logs')
}

export function deleteTimeLog(timeLogId) {
  const url = URL + 'time_logs/' + timeLogId
  const request = new Request(url,{
    method : 'DELETE',
    headers : new Headers({
      'Content-Type' : 'application/json'
    })
  })
  return fetch(request)
}

export function postTimeLog(json) {
  const url = URL + 'time_logs/'
  const request = new Request(url,{
    method : 'POST',
    headers : new Headers({
      'Content-Type' : 'application/json'
    }),
    body : JSON.stringify(json)
  })
  return fetch(request)
}

export function fetchActiveProjects() {
  const url = URL + 'projects'
  return fetch(url)
}