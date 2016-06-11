import React, { Component, PropTypes } from 'react'
import DataTable from './DataTable'
import LineGraph from './LineGraph'

class Single extends Component {

  render() {
    const { params : { projectName }, graphs, timeLogs, selectActiveHighlight, deselectActiveHighlight, toggleActiveHighlight, removeTimeLog, resizeGraph } = this.props

    // prepare data for LineGraph
    const graphId = 'lineGraph'
    const lineGraph = {
      data : calcLineGraphData(timeLogs.filter((line) => line.project_name === projectName)),
      width : graphs[graphId].width,
      height : graphs[graphId].height
    }

    // prepare data for DataTable
    const dataTable = {
      data : calcDataTableData(timeLogs.filter((line) => line.project_name === projectName)),
      colNames : [
        { key : 'description', label : 'Description' },
        { key : 'time_in_minutes', label : 'Minutes Worked' },
        { key : 'cumulativeHours', label : 'Cumulative Hours Worked'}
      ]
    }

    return (
      <div className="single-project">
        <LineGraph data={lineGraph.data}
          width={lineGraph.width}
          height={lineGraph.height}
          graphId={lineGraph.graphId}
          title={projectName}
          onMouseOver={selectActiveHighlight}
          onMouseOut={deselectActiveHighlight}
          onDotClick={removeTimeLog}
          resizeGraph={resizeGraph}
       />
        <br/>
        <DataTable data={dataTable.data} colNames={dataTable.colNames} onClickRow={toggleActiveHighlight} />
      </div>
    )
  }
}

const calcLineGraphData = (timeLogs) => {
  let totalMinutesWorked = 0
  const lineGraphData = timeLogs
    .map((d,i) => {
    
      totalMinutesWorked += d.time_in_minutes

      return {
        id : d.timelog_id, 
        value : totalMinutesWorked / 60,
        selected : d.highlight
      }
    })

  return lineGraphData
}

const calcDataTableData = (timeLogs) => {
  let totalMinutesWorked = 0
  const data = timeLogs
    .map((d,i) => {

      totalMinutesWorked += d.time_in_minutes

      return ({ ...d, 
        cumulativeHours : (totalMinutesWorked / 60).toFixed(2)
      })
    })

  return data
}

export default Single