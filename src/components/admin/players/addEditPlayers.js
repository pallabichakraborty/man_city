import React, { Component } from 'react';
import AdminLayout from '../../../hoc/adminLayout';

import FormFields from '../../ui/formfield';
import validation from '../../ui/validation';


class addEditPlayers extends Component {
    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        formData: {
            firstName: {
                element: 'input',
                value: '',
                config: {
                    label: 'First Name',
                    name: 'firstName_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: true
            },
            lastName: {
                element: 'input',
                value: '',
                config: {
                    label: 'Last Name',
                    name: 'lastName_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Number',
                    name: 'number_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Position',
                    name: 'position_select',
                    type: 'select',
                    options: [
                        { key: 'Keeper', value: 'Keeper' },
                        { key: 'Defence', value: 'Defence' },
                        { key: 'Midfield', value: 'Midfield' },
                        { key: 'Striker', value: 'Striker' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: true
            }

        }
    }
    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>{this.state.formType}</h2>
                    <div>
                        <form onSubmit={(event) => this.SubmitForm(event)}>
                            <FormFields
                                id={'firstName'}
                                formdata={this.state.formData.firstName}
                                change={
                                    (element) => this.updateForm(element)
                                }
                            />
                            <FormFields
                                id={'lastName'}
                                formdata={this.state.formData.lastName}
                                change={
                                    (element) => this.updateForm(element)
                                }
                            />
                            <FormFields
                                id={'number'}
                                formdata={this.state.formData.number}
                                change={
                                    (element) => this.updateForm(element)
                                }
                            />
                            <FormFields
                                id={'position'}
                                formdata={this.state.formData.position}
                                change={
                                    (element) => this.updateForm(element)
                                }
                            />
                            <div className="success_label">{this.state.formSuccess}</div>
                            {
                                this.state.formError ?
                                    <div className="error_label">Something went wrong</div>
                                    : null
                            }

                            <div className="admin_submit">
                                <button onSubmit={(event) => this.SubmitForm(event)}>{this.state.formType}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default addEditPlayers;