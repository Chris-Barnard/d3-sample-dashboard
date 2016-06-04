import React, { Component, PropTypes } from 'react'
import DataTable from './DataTable'
import LineGraph from './LineGraph'

// import { selectActiveHighlight, deselectActiveHighlight } from '../actions/actionCreators'

// import testData from '../data/timeLogData'


class Single extends Component {

  render() {
    const { params : { dataId }, timeLogs, selectActiveHighlight, deselectActiveHighlight, removeTimeLog } = this.props

    // prepare data for LineGraph
    // we need { id, value }
    let totalMinutesWorked = 0
    const lineGraphData = timeLogs
      .filter((d) => d.project_name === dataId && d.description != 'Total')
      .map((d,i) => {
      
      totalMinutesWorked += d.time_in_minutes

      return {
        id : d.timelog_id, 
        value : totalMinutesWorked / 60

      }
    })


    // prepare data for DataTable
    // reset our cumulativeHours counter
    totalMinutesWorked = 0
    const nonTotalData = timeLogs.filter((line) => line.description != 'Total')
    const data = nonTotalData
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
          title={dataId}
          onMouseOver={selectActiveHighlight}
          onMouseOut={deselectActiveHighlight}
          onDotClick={removeTimeLog}   
       />
        <br/>
        <DataTable data={data} colNames={colNames} />
      </div>
    )
  }
}

export default Single