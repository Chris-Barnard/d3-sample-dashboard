import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import d3 from 'd3'
import { Link } from 'react-router'
import testData from '../data/timeLogData'

/*const totalData = testData.filter((line) => {
  return line.description === 'Total'
})*/

/*const data = totalData.map((line) => {
  return {
    label : line.project_name,
    value : line.time_in_minutes / 60
  }
})*/



// this class is responsible for drawing the axes
export class Axis extends Component {
  
  componentDidUpdate() {
    this.renderAxis()
  }

  componentDidMount() {
    this.renderAxis()  
  }

  renderAxis() {
    const { axis } = this.props
    const node = ReactDOM.findDOMNode(this)

    d3.select(node).call(axis)
  }

  render() {
    const { h, axisType } = this.props
    const translate = "translate(0," + h + ")"
    
    return (
      <g className="axis" transform={axisType == 'x' ? translate : ""}></g>
    )
  }
}
Axis.PropTypes = {
  h : PropTypes.number.isRequired,
  axis : PropTypes.func.isRequired,
  axisType : PropTypes.oneOf(['x','y']).isRequired
}



class Graph extends Component {

  
  render() {

    const { data } = this.props

    // these should be inputs via props eventually
    const width = 480
    const height = 320

    // set the dimensions of the graph
    const margin = { top : 40, right: 50, bottom : 20, left: 50 }
    const w = width - (margin.left + margin.right)
    const h = height - (margin.top + margin.bottom)

    // transform ?!?
    const transform = 'translate(' + margin.left + ',' + margin.top + ')'

    // x & y - I think these are functions to map the data to the screen coordinates
    const x = d3.scale.ordinal()
      .domain(data.map(d => d.label))
      .rangeRoundBands( [0, w], .35)

    // here we are setting the y scale to be the maximum value of the dataset + 25%
    const y = d3.scale.linear()
      .domain( [0, d3.max(data, (d) => d.value) * 1.25] )
      .range( [h, 0] )

    // Attempting to add in the Axes here
    // we will start with the x axis
    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .tickValues(data.map((d,i) => d.label))
      .ticks(data.length)

    // and now I try the y axis
    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(5)

    const title = () => {
      return (
        <text x={width / 2}
          y={0}
          dy="1em"
          className="graph-title">
          Hours Worked by Project
        </text>
      )
    }
        
    // here we define the background rectangle
    const rectBackground = (data).map((d, i) => {
      return (
        <rect fill="#58657f" key={i}
          x={x(d.label)} y={0}
          height={ h }
          width={x.rangeBand()}
        />
      )
    })
    // and here is the main part of the graph
    const rectForeground = (data).map((d, i) => {
      return (
        <Link to={`/view/${d.label}`} className="graph-link">
          <rect key={i}
            x={x(d.label)} y={y(d.value)} className="shadow"
            height={h - y(d.value)}
            width={x.rangeBand()}
          />
        </Link>
      )
    })
    // and here I am trying to put in labels - it worked and I have tried to center them in the bar graph
    const labels = (data).map((d, i) => {
      return (
        <text x={x(d.label) + x.rangeBand() / 2} 
          y={h / 2}
          dx="-0.5em"
          key={i}
          class="graph-label">
          {d.value}
        </text>
      )
    })

    return (
      <div className="main-graph">
        <svg id="chart" width={width} height={height}>
          {title()}
          <g transform={transform}>
            {rectBackground}
            {rectForeground}
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x" />
          </g>
        </svg>
      </div>
    )
  }
}

export default Graph