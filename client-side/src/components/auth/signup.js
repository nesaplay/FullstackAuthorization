import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
    formHelper = ({ label, input, type, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <input {...input} type={type} className="form-control" />
            {touched && (error && <span className="error">{error}</span>)}
        </div>
    );

    onFormSubmit = ({ email, password }) => {
        this.props.signupUser({ email, password });
    };

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <fieldset className="form-group">
                    <Field
                        type="email"
                        name="email"
                        label="Email"
                        component={this.formHelper}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        type="password"
                        name="password"
                        label="Passoword"
                        component={this.formHelper}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        component={this.formHelper}
                    />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </form>
        );
    }
}

const validate = ({ email, password, confirmPassword }) => {
    const errors = {};

    if (!email) {
        errors.email = 'Email is required';
    }
    if (!password) {
        errors.password = 'Password is required!';
    }
    if (password && password.length < 6) {
        errors.password = 'Password should have 6 or more characters';
    }
    if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password!';
    }
    if (password !== confirmPassword) {
        errors.password = 'Passwords must match!';
    }

    return errors;
};

const mapStateToProps = ({ auth }) => ({ errorMessage: auth.error });

export default reduxForm({
    form: 'signup',
    validate
})(connect(mapStateToProps, actions)(Signup));
