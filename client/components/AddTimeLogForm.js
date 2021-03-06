import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { reduxForm } from 'redux-form'

const fields = { 
  project_name : {
    type : 'select',
    label : 'Project Name',
    required : true,
    options : []
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

  renderSelect(fieldConfig, field) {
    const fieldHelper = this.props.fields[field]
    const { projects } = this.props

    return (
      <div>
        <fieldConfig.type className={fieldHelper.touched && fieldHelper.invalid ? "has-error" : ""}
          placeholder={fieldHelper.touched && fieldHelper.error ? fieldConfig.label + ' ' + fieldHelper.error : fieldConfig.label}
          value={fieldHelper.value || ''}
          {...fieldHelper} >
          <option></option>
          {projects.map(item => <option value={item.name} >{item.name}</option>)}
        </fieldConfig.type>
      </div>
    )
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field]
    if (fieldConfig.type === 'select') { return this.renderSelect(fieldConfig, field) }
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