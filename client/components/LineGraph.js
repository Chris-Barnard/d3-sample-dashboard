import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

// dots class
class Dots extends Component {

  render() {
    const { data, x, y, onMouseOver, onMouseOut, onClick } = this.props

    // have to shift circles over to center of the rangeBand()
    const circles = (data).map((d,i) => {
      return (
        <circle className={d.selected ? "selected-dot" : "dot"}
        r="7"
        cx={x(d.id) + x.rangeBand() / 2}
        cy={y(d.value)}
        strokeWidth="5px"
        onMouseOver={() => onMouseOver(d.id)}
        onMouseOut={() => onMouseOut(d.id)}
        onClick={() => onClick(d.id)}
        key={i} />
      )
    })

    return (
      <g>
        {circles}
      </g>
    )
  }
}
Dots.PropTypes = {
  data : PropTypes.arrayOf({
    id : PropTypes.number.isRequired,
    value : PropTypes.number.isRequired
  }),
  x : PropTypes.func.isRequired,
  y : PropTypes.func.isRequired
}

// axis class
class Axis extends Component {
  
  componentDidMount() {
    this.renderAxis()
  }
  componentDidUpdate() {
    this.renderAxis()
  }
  renderAxis() {
    const { axis } = this.props
    const node = ReactDOM.findDOMNode(this)

    d3.select(node).call(axis)
  }

  render() {
    const { h, axisType } = this.props
    const translate = 'translate(0,' + h + ')'

    return (
      <g className="axis" transform={axisType == 'x' ? translate : ""}>
      </g>
    )
  }
}
Axis.PropTypes = {
  h : PropTypes.number.isRequired,
  axis : PropTypes.func.isRequired,
  axisType : PropTypes.oneOf(['x', 'y']).isRequired
}

// grid class
class Grid extends Component {
  
componentDidMount() {
    this.renderAxis()
  }
  componentDidUpdate() {
    this.renderAxis()
  }
  renderAxis() {
    const { grid } = this.props
    const node = ReactDOM.findDOMNode(this)

    d3.select(node).call(grid)
  }

  render() {
    const { h, gridType } = this.props
    const translate = 'translate(0,' + h + ')'

    return (
      <g className="y-grid" transform={gridType == 'x' ? translate : ""}>
      </g>
    )
  }
}
Grid.PropTypes = {
  h : PropTypes.number.isRequired,
  grid : PropTypes.func.isRequired,
  gridType : PropTypes.oneOf(['x', 'y']).isRequired
}


// main graph class
class LineGraph extends Component {
  
  componentDidMount() {
    const { graphId, height, resizeGraph } = this.props
    
    // we want to do 2 things here

    // calculate the initial size
    const getNewWidth = () => {
      const node = ReactDOM.findDOMNode(this)
      const width = parseInt(d3.select(node).style('width'), 10)
      resizeGraph(graphId, width, height)
    }

    // and set it to calcutate again on resize
    window.addEventListener('resize', getNewWidth)

    // run function on component mount
    getNewWidth()
  }

  componentWillUnmount() {
    window.removeEventListener('resize')
  }

  render() {
    
    const { data, width, height, graphId, title, onMouseOver, onMouseOut, onDotClick } = this.props

    // set the dimensions of the graph
    const margin = { top : 20, right: 50, bottom : 20, left: 50 }
    const w = width - (margin.left + margin.right)
    const h = height - (margin.top + margin.bottom)
    data.unshift({id : 0, value : 0})

    // transform - this shifts our grid over to the start of our graph to allow for the margins
    const transform = 'translate(' + margin.left + ',' + margin.top + ')'

    const x = d3.scale.ordinal()
      .domain(data.map((d) => d.id ))
      .rangeRoundPoints( [0, w], .9)

    // here we are setting the y scale to be the maximum value of the dataset + 25%
    const y = d3.scale.linear()
      .domain( [0, d3.max(data, (d) => d.value) * 1.25] )
      .range( [h, 0] )

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(3)

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(data.length - 1)

    const yGrid = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(3)
      .tickSize(-w, 0, 0)
      .tickFormat("")

    // attempting to shift line to arrange with the center of the range bands
    const line = d3.svg.line()
      .x((d) => x(d.id) + x.rangeBand() / 2)
      .y((d) => y(d.value))
      .interpolate('cardinal')

    return (
      <div className="line-graph">
        <h3 className="graph-title">{title}</h3>
        <svg id={graphId} width={width} height={height}>
          <g transform={transform}>
            <path className="line" d={line(data)} strokeLinecap="round" />
            <Dots data={data} x={x} y={y} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onDotClick} />
            <Grid h={h} grid={yGrid} gridType="y" />
            <Axis h={h} axis={yAxis} axisType="y" />
            {/*<Axis h={h} axis={xAxis} axisType="x" />*/}
          </g>
        </svg>
      </div>
    )
  }
}
LineGraph.PropTypes = {
  data : PropTypes.arrayOf({
    id : PropTypes.number.isRequired,
    value : PropTypes.number.isRequired
  }).isRequired,
  width : PropTypes.number.isRequired,
  height : PropTypes.number.isRequired,
  graphId : PropTypes.string.isRequired,
  title : PropTypes.string,
  select : PropTypes.array,
  onMouseOver : PropTypes.func,
  onMouseOut : PropTypes.func
}

export default LineGraph