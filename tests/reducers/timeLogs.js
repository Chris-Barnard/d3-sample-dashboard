import expect from 'expect'
import reducer from '../../client/reducers/timeLogs'
import * as actions from '../../client/actions/actionCreators'

describe('timeLogs reducer', () => {
  
  it('should return initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual([])
  })

  it('should handle REMOVE_TIME_LOG', () => {
    const id = 11
    const initialState = [{
        timelog_id : id,
        description : 'dummy',
        time_in_minutes : 99
      },
      {
        timelog_id : 99,
        description : 'dummy 2',
        time_in_minutes : 10
      },
      {
        timelog_id : 89,
        description : 'dummy 3',
        time_in_minutes : 15
      }]
    const expectedState = [{
        timelog_id : 99,
        description : 'dummy 2',
        time_in_minutes : 10
      },
      {
        timelog_id : 89,
        description : 'dummy 3',
        time_in_minutes : 15
      }]
    expect(reducer(initialState, actions.removeTimeLog(id)))
    .toEqual(expectedState)
  })

  it('should handle ADD_TIME_LOG', () => {
    const initialState = [{
      timelog_id : 3,
      description : 'dummy',
      time_in_minutes : 99,
      project_name : 'Trucking Ticket'
    }]
    const time_in_minutes = 20
    const description = 'New Entry'
    const project_name = 'Trucking Ticket'
    const timelog_id = 99
    const expectedState = [{
      timelog_id : 3,
      description : 'dummy',
      time_in_minutes : 99,
      project_name : 'Trucking Ticket'
    },
    {
      timelog_id,
      description, 
      time_in_minutes,
      project_name
    }]

    expect(reducer(initialState, actions.addTimeLog(timelog_id, project_name, description, time_in_minutes))).toEqual(expectedState)

  })

})