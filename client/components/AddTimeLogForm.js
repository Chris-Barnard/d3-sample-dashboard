import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const fields = ['description', 'project_name', 'time_in_minutes']

// need to add in validation

class AddTimeLogForm extends Component {
  render() {
    const { fields : { description, project_name, time_in_minutes }, handleSubmit, resetForm } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input type="text" placeholder="Project Name" {...project_name} />
          </div>
        </div>
        <div>
          <div>
            <input type="text" placeholder="Description" {...description} />
          </div>
        </div>
        <div>
          <div>
            <input type="text" placeholder="Time in Minutes" {...time_in_minutes} />
          </div>
        </div>
        <div>
          <button className="btn-submit" onClick={handleSubmit} >Submit</button>
          <button className="btn-cancel" onClick={resetForm} >Clear Form</button>
        </div>
      </form>
    )
  }
}

AddTimeLogForm.PropTypes = {
  fields : PropTypes.object.isRequired,
  handleSubmit : PropTypes.func.isRequired,
  resetForm : PropTypes.func.isRequired
}

export default reduxForm({
  form : 'addTimeLog',
  fields
})(AddTimeLogForm)