import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	//destructured to take the input and label out
	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	handleSubmitButton = (formValues) => {
		//Calls our action creater of "createStream"
		this.props.onSubmit(formValues);
	};

	render() {
		// console.log(this.props);
		return (
			// onSubmit - this.props.handleSubmit is a callback function that is provided to our component by redux form
			// We call that function with our callback method called this.handleSubmitButton
			<form
				className="ui form error"
				onSubmit={this.props.handleSubmit(this.handleSubmitButton)}
			>
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field
					name="description"
					component={this.renderInput}
					label="Enter Description"
				/>
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}

	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}

	return errors;
};

export default reduxForm({
	form: 'streamForm',
	validate,
})(StreamForm);
