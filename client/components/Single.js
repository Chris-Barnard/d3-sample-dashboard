import React, { Component, PropTypes } from 'react'
import DataTable from './DataTable'
import LineGraph from './LineGraph'

// import { selectActiveHighlight, deselectActiveHighlight } from '../actions/actionCreators'

// import testData from '../data/timeLogData'


class Single extends Component {

  render() {
    const { params : { dataId }, graphs, timeLogs, selectActiveHighlight, deselectActiveHighlight, removeTimeLog, resizeGraph } = this.props

    // prepare data for LineGraph
    // we need { id, value }
    let totalMinutesWorked = 0
    const lineGraphData = timeLogs
      .filter((line) => line.project_name === dataId)
      .map((d,i) => {
      
        totalMinutesWorked += d.time_in_minutes

        return {
          id : d.timelog_id, 
          value : totalMinutesWorked / 60
        }
      })

    const graphId = 'lineGraph'
    const width = graphs[graphId].width
    const height = graphs[graphId].height

    // prepare data for DataTable
    // reset our cumulativeHours counter
    totalMinutesWorked = 0
    const data = timeLogs
      .filter((line) => line.project_name === dataId)
      .map((d,i) => {

        totalMinutesWorked += d.time_in_minutes
        
        return ({ ...d, 
          cumulativeHours : (totalMinutesWorked / 60).toFixed(2)
        })
      })

    const colNames = [
      { key : 'description', label : 'Description' },
      { key : 'time_in_minutes', label : 'Minutes Worked' },
      { key : 'cumulativeHours', label : 'Cumulative Hours Worked'}
    ]

    return (
      <div className="single-project">
        <LineGraph data={lineGraphData}
          width={width}
          height={height}
          graphId={graphId}
          title={dataId}
          onMouseOver={selectActiveHighlight}
          onMouseOut={deselectActiveHighlight}
          onDotClick={removeTimeLog}
          resizeGraph={resizeGraph}
       />
        <br/>
        <DataTable data={data} colNames={colNames} />
      </div>
    )
  }
}

export default Single