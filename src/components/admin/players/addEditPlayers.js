import React, { Component } from 'react';
import AdminLayout from '../../../hoc/adminLayout';
import FileUploader from '../../ui/fileUploader';

import FormFields from '../../ui/formfield';
import validation from '../../ui/validation';

import { firebasePlayers, firebaseDB, firebase } from '../../../firebase';


class addEditPlayers extends Component {
    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
            name: {
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
            lastname: {
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
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }

        }
    }

    updateFields = (player,playerId,formType,imageurl) => {
        const newFormData={...this.state.formData};
        for(let key in newFormData)
        {
            newFormData[key].value=player[key];
            newFormData[key].valid=true;
        }

        this.setState(
            {
                playerId: playerId,
                defaultImg: imageurl,
                formType: formType,
                formData: newFormData
            }
        )
    }

    componentDidMount = () => {
        const playerId = this.props.match.params.id;

        if (!playerId) {
            this.setState(
                {
                    formType: 'Add Player'
                }
            )
        }
        else {
            this.setState(
                {
                    formType: 'Edit Player'
                }
            )
            firebaseDB.ref(`players/${playerId}`)
                      .once('value')
                      .then((snapshot) => {
                          const playerData=snapshot.val();
                          firebase.storage()
                                  .ref('players')
                                  .child(playerData.image)
                                  .getDownloadURL()
                                  .then((imageurl) => {
                                      this.updateFields(playerData,playerId,'Edit Player',imageurl)
                                  })
                                  .catch((error) => {
                                    this.updateFields({
                                                        ...playerData,
                                                        image:''
                                                      },playerId,'Edit Player','')
                                  })
                      })
                      .catch((error) =>
                      {
                          this.setState({
                              formError:true
                          })
                      })
        }

    }

    updateForm = (element, content = '') => {

        const newFormdata = { ...this.state.formData }
        const newElement = { ...newFormdata[element.id] }

        if (content === '') {
            newElement.value = element.event.target.value;
        }
        else {
            newElement.value = content;
        }

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

    successForm = (successMessage) => {
        this.setState(
            {
                formSuccess: successMessage
            }
        );

        setTimeout(() => {
            this.setState(
                {
                    formSuccess: ''
                }
            )
        },2000)
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
            if(this.state.formType==='Edit Player')
            {
                firebaseDB.ref(`players/${this.state.playerId}`)
                           .update(dataToSubmit)
                           .then(() => {
                               this.successForm('Updated Successfully')
                           })
                           .catch((error) => {
                               this.setState({
                                   formError: true
                               })
                           })
            }
            else
            {
                firebasePlayers.push(dataToSubmit)
                .then(() => {
                    this.props.history.push('/admin_players')
                })
                .catch(() => {
                    this.setState({
                        formError:true
                    })
                })
            }
        }
        else {
            this.setState(
                { formError: true }
            )
        }
    }

    resetImage = () => {
        const newFormData = { ...this.state.formData };
        newFormData['image'].value = '';
        newFormData['image'].valid = false;
        this.setState(
            {
                defaultImg: '',
                formData:newFormData
            }
        )
    }

    storeFileName = (fileName) => {
        this.updateForm({ id: 'image' }, fileName)
    }

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>{this.state.formType}</h2>
                    <div>
                        <form onSubmit={(event) => this.SubmitForm(event)}>
                            <FileUploader dir="players"
                                tag={"Player Image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formData.image.value}
                                resetImage={() => this.resetImage()}
                                fileName={(fileName) => this.storeFileName(fileName)}
                            />
                            <FormFields
                                id={'name'}
                                formdata={this.state.formData.name}
                                change={
                                    (element) => this.updateForm(element)
                                }
                            />
                            <FormFields
                                id={'lastname'}
                                formdata={this.state.formData.lastname}
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