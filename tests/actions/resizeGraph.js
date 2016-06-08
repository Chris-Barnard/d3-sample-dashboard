import expect from 'expect'
import * as actions from '../../client/actions/actionCreators'

describe('actions', () => {
  it('should create an action to resize a graph', () => {
    const graphId = 'barGraph'
    const width = 320
    const height = 240

    const expectedAction = {
      type : 'RESIZE_GRAPH',
      graphId,
      width,
      height
    }
    expect(actions.resizeGraph(graphId, width, height)).toEqual(expectedAction)
  })
})