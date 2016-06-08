import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { reduxForm } from 'redux-form'

const fields = { //['description', 'project_name', 'time_in_minutes']
  project_name : {
    type : 'input',
    label : 'Project Name',
    required : true
  },
  description : {
    type : 'input',
    label : 'Description',
    required : true
  },
  time_in_minutes : {
    type : 'input',
    label : 'Time in Minutes',
    // required : false
  }
}

// synchronous validation attempt
const validate = (values) => {

  const errors = {}

  _.each(fields, (item, field) => {
    console.log('item',item)
    if (!values[field] && item.required) {
      errors[field] = 'is required'
    }
  })

  if (isNaN(Number(values.time_in_minutes))) {
    errors.time_in_minutes = 'must be a number'
  }

  return errors
}

class AddTimeLogForm extends Component {

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field]
    return (
      <div>
        <fieldConfig.type className={fieldHelper.touched && fieldHelper.invalid ? "has-error" : ""}
          type="text"
          placeholder={fieldHelper.touched && fieldHelper.error ? fieldConfig.label + ' ' + fieldHelper.error : fieldConfig.label}
          {...fieldHelper}
        />
      </div>
    )
  }



  render() {
    const { handleSubmit, resetForm } = this.props

    return (
      <form onSubmit={handleSubmit}>
        {_.map(fields, this.renderField.bind(this))}
        <div>
          <button type="submit" className="btn-submit" >Submit</button>
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
  fields : _.keys(fields),
  validate
})(AddTimeLogForm)