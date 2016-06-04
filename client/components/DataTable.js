import React, { Component } from 'react'
import JsonTable from 'react-json-table'

export class DataTable extends Component {
  render() {
    const { data, colNames } = this.props

    const settings = {
      rowClass : (current, item) => {
        if (item.highlight) {
          return current + ' jsonSelected' 
        }
        return current
      }
    }

    return (
      <JsonTable className="data-table" rows={data} columns={colNames} settings={settings} />
    )
  }
}

export default DataTable