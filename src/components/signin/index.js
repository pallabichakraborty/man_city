import React, { Component } from 'react';
import FormFields from '../ui/formfield';
import validation from '../ui/validation';

import { firebase } from '../../firebase';

class SignIn extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationErrMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: ''
            }
        }
    }

    SubmitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            firebase.auth()
                .signInWithEmailAndPassword(
                    dataToSubmit.email,
                    dataToSubmit.password
                )
                .then(() => {

                   this.props.history.push('/dashboard');
                })
                .catch(error => {
                    this.setState(
                        {
                            formSuccess: '',
                            formError: true
                        }
                    )
                })
        }
        else {
            this.setState(
                { formError: true }
            )
        }

    }


    updateForm = (element) => {

        const newFormdata = { ...this.state.formData }
        const newElement = { ...newFormdata[element.id] }

        newElement.value = element.event.target.value;

        let validData = validation(newElement);

        newElement.valid = validData[0];
        newElement.validationErrMessage = validData[1];



        newFormdata[element.id] = newElement;

        this.setState(
            {
                formError: false,
                formData: newFormdata
            }
        )
    }

    render() {
        return (
            <div className="container">
                <div className="signin_wrapper"
                    style={{
                        margin: '100px'
                    }}
                >
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <h2> Please Login</h2>
                        <FormFields
                            id={'email'}
                            formdata={this.state.formData.email}
                            change={
                                (element) => this.updateForm(element)
                            }
                        />
                        <FormFields
                            id={'password'}
                            formdata={this.state.formData.password}
                            change={
                                (element) => this.updateForm(element)
                            }
                        />
                        {
                            this.state.formError ?
                                <div className="error_label">Something is wrong. Try Again</div>
                                : null
                        }
                        <div className="success_label">{this.state.formSuccess}</div>
                        <button onClick={(event) => this.SubmitForm(event)}>Log In</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;