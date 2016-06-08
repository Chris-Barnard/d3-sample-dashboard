import expect from 'expect'
import reducer from '../../client/reducers/graphs'

describe('graphs reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual({})
  })

  let graphId = 'barGraph'
  let width = 320
  let height = 240
  it('should handle RESIZE_GRAPH', () => {
    expect(reducer({}, {
      type : 'RESIZE_GRAPH',
      graphId,
      width,
      height
    })).toEqual({
      [graphId] : {
        width,
        height
      }
    })

    expect(reducer({
      lineGraph : {
        width : 720,
        height : 240
      }}, {
        type : 'RESIZE_GRAPH',
        graphId,
        width,
        height
      })).toEqual({
      lineGraph : {
        width : 720,
        height : 240
      },
      [graphId] : {
        width,
        height
      }
    })

  })
})
