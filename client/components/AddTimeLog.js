import React, { Component, PropTypes } from 'react'
import AddTimeLogForm from './AddTimeLogForm'

class AddTimeLog extends Component {
	render() {
		const { addTimeLog } = this.props
		return (
			<div className="add-time-log-form">
				<h2>Add Time Logged</h2>
				<AddTimeLogForm onSubmit={addTimeLog} />
			</div>
		);
	}
}

export default AddTimeLog
