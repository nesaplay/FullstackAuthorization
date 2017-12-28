import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit = ({ email, password }) => {
        this.props.signinUser({ email, password });
    };

    fieldHelper = ({ input, type, label, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <input {...input} type={type} className="form-control" />
            {touched && (error && <span className="error">{error}</span>)}
        </div>
    );

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
        return null;
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <fieldset className="form-group">
                    <Field
                        type="email"
                        name="email"
                        label="Email"
                        component={this.fieldHelper}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        type="password"
                        name="password"
                        label="Password"
                        component={this.fieldHelper}
                    />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">
                    Sing in
                </button>
            </form>
        );
    }
}

const validate = ({ email, password }) => {
    const errors = {};

    if (!email) {
        errors.email = 'Email is required';
    }
    if (!password) {
        errors.password = 'Password is required!';
    }

    return errors;
};

const mapStateToProps = ({ auth }) => ({
    errorMessage: auth.error
});

export default reduxForm({
    form: 'signin',
    validate
})(connect(mapStateToProps, actions)(Signin));
