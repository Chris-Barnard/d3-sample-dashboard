import React, { Component } from 'react'
import JsonTable from 'react-json-table'

export class DataTable extends Component {
  render() {
    const { data, colNames, onClickRow } = this.props

    const settings = {
      rowClass : (current, item) => {
        if (item.highlight) {
          return current + ' jsonSelected' 
        }
        return current
      }
    }

    return (
      <JsonTable className="data-table" rows={data} columns={colNames} onClickRow={(e, item) => onClickRow(item.timelog_id)} settings={settings} />
    )
  }
}

export default DataTable