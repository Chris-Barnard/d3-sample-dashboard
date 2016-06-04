import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Graph from './Graph'



function assembleTotalData(data) {
  // function to combine the line level data into totals

  let totalData = []
  
  // requires data to be sorted by project_name to work
  // data.sort((item) => item.project_name)

  // first we need to get the unique project names into the totalData object
  data.forEach((element, index, array) => {
    if (index === 0) {
     return totalData.push({
      label : element.project_name,
      value : element.time_in_minutes
     })
    }
    // if we don't match the previous value's project name
    //    add a new element
    // if (array[index-1].project_name != element.project_name) {
    if(!totalData.find((item) => item.label === element.project_name)) {
      return totalData.push({
        label : element.project_name,
        value : element.time_in_minutes
      })
    }
    else return false
  })

  totalData.forEach((element) => {
    element.value = data
      .filter((item) => item.project_name === element.label)
      // convert minuts to hours
      .map((item) => item.time_in_minutes / 60) 
      .reduce((prevValue, currentValue) => prevValue + currentValue)
  })

  return totalData

}

class Main extends Component {

  render() {
    const { timeLogs } = this.props

    // const totalData = timeLogs.filter((line) => {
    //   return line.description === 'Total'
    // })

    // const data = totalData.map((line) => {
    //   return {
    //     label : line.project_name,
    //     value : line.time_in_minutes / 60
    //   }
    // })

    // current data set includes legacy "Total" items
    const totalData = assembleTotalData(timeLogs.filter((item) => item.description != 'Total'))

    return (
      <div>
        <h1>
          <Link to="/">D3 Test Project</Link>
        </h1>
        <div className="main-container">
          <Graph data={totalData} />
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    )
  }
}

export default Main