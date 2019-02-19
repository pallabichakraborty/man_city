import React, { Component } from 'react';
import AdminLayout from '../../../hoc/adminLayout';

import FormFields from '../../ui/formfield';
import validation from '../../ui/validation';

import { firebaseDB, firebaseTeams, firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc'

class addEditMatches extends Component {
    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'input'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a away team',
                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Away',
                    name: 'result_away_input',
                    type: 'input'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team Result',
                    name: 'select_result',
                    type: 'select',
                    options: [{ key: 'W', value: 'W' },
                    { key: 'L', value: 'L' },
                    { key: 'D', value: 'D' },
                    { key: 'n/a', value: 'N/A' }]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationErrMessage: '',
                showlabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game Played',
                    name: 'select_played',
                    type: 'select',
                    options: [{ key: 'Yes', value: 'Yes' },
                    { key: 'No', value: 'No' }]
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

    updateFields = (match, teamOptions, teams, type, matchId) => {
        const newFormdata = { ...this.state.formData };

        for (let key in newFormdata) {
            if (match) {
                newFormdata[key].value = match[key];
                newFormdata[key].valid = true;

            }

            if (key === 'local' || key === 'away') {
                newFormdata[key].config.options = teamOptions;
            }
        }

        this.setState(
            {
                matchId,
                formType: type,
                formData: newFormdata,
                teams
            }
        )
    }

    successForm = (message) => {
        this.setState(
            {
                formSuccess: message
            }
        );

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            })
        }, 2000)
    }

    SubmitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        this.state.teams.forEach((team) => {
            if (team.shortName === dataToSubmit.local) {
                dataToSubmit['localThmb'] = team.thmb
            }
            else if (team.shortName === dataToSubmit.away) {
                dataToSubmit['awayThmb'] = team.thmb
            }
        })

        if (formIsValid) {
            if (this.state.formType === 'Edit Match') {
                firebaseDB.ref(`matches/${this.state.matchId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.successForm('Updated form successfully');
                    })
                    .catch((e) => {
                        this.setState(
                            { formError: true }
                        )
                    })
            }
            else {
                firebaseMatches.push(dataToSubmit)
                    .then(() => {
                        this.props.history.push('/admin_matches');
                    })
                    .catch((e) => {
                        this.setState(
                            { formError: true }
                        )
                    })
            }
        }
        else {
            this.setState(
                { formError: true }
            )
        }

    }

    componentDidMount = () => {
        const matchId = this.props.match.params.id;

        const getTeams = (match, type) => {
            firebaseTeams.once('value').then((snapshot) => {
                const teams = firebaseLooper(snapshot);
                const teamOptions = [];
                snapshot.forEach((childSnapshot) => {
                    teamOptions.push(
                        {
                            key: childSnapshot.val().shortName,
                            value: childSnapshot.val().shortName
                        }
                    )
                })

                this.updateFields(match, teamOptions, teams, type, matchId);

            })
        }

        if (matchId) {
            firebaseDB.ref(`matches/${matchId}`).once('value')
                .then((snapshot) => {
                    const match = snapshot.val();
                    getTeams(match, 'Edit Match');
                })
        }
        else {
            getTeams(false, 'Add Match');
        }
    }

    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.SubmitForm(event)}>
                            <FormFields
                                id={'date'}
                                formdata={this.state.formData.date}
                                change={
                                    (element) => this.updateForm(element)
                                }
                            />
                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormFields
                                            id={'local'}
                                            formdata={this.state.formData.local}
                                            change={
                                                (element) => this.updateForm(element)
                                            }
                                        />
                                    </div>
                                    <div className="right">
                                        <FormFields
                                            id={'resultLocal'}
                                            formdata={this.state.formData.resultLocal}
                                            change={
                                                (element) => this.updateForm(element)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormFields
                                            id={'away'}
                                            formdata={this.state.formData.away}
                                            change={
                                                (element) => this.updateForm(element)
                                            }
                                        />
                                    </div>
                                    <div className="right">
                                        <FormFields
                                            id={'resultAway'}
                                            formdata={this.state.formData.resultAway}
                                            change={
                                                (element) => this.updateForm(element)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='split_fields'>
                                <FormFields
                                    id={'referee'}
                                    formdata={this.state.formData.referee}
                                    change={
                                        (element) => this.updateForm(element)
                                    }
                                />
                                <FormFields
                                    id={'stadium'}
                                    formdata={this.state.formData.stadium}
                                    change={
                                        (element) => this.updateForm(element)
                                    }
                                />
                                <FormFields
                                    id={'result'}
                                    formdata={this.state.formData.result}
                                    change={
                                        (element) => this.updateForm(element)
                                    }
                                />
                                <FormFields
                                    id={'final'}
                                    formdata={this.state.formData.final}
                                    change={
                                        (element) => this.updateForm(element)
                                    }
                                />
                            </div>
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

export default addEditMatches;