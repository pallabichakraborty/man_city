import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormFields from '../../ui/formfield';
import validation from '../../ui/validation';

import {firebasePromotions} from '../../../firebase'

class enroll extends Component {

    state ={
        formError: false,
        formSuccess:'',
        formData:{
            email: {
                element: 'input',
                value:'',
                config: {
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation :{
                    required: true,
                    email:true
                },
                valid:false,
                validationErrMessage: ''
            }
        }
    }

    resetFormSuccess = (type) => {
        const newFormdata=  {...this.state.formData}
        for(let key in this.state.formData)
        {
            newFormdata[key].value='';
            newFormdata[key].valid=false;
            newFormdata[key].validationErrMessage='';
        }

            this.setState(
                {
                    formError:false,
                    formData:newFormdata,
                    formSuccess:type ? 'Congrats':"Already in database"
                }
            );

       this.successMessage();
    
    }

    successMessage =() => {
        setTimeout(() => {
            this.setState(
                {
                    formSuccess:''
                }
            )
        },2000)
    }

    SubmitForm = (event) =>{
        event.preventDefault();

        let dataToSubmit ={};
        let formIsValid = true;

        for(let key in this.state.formData)
        {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid=this.state.formData[key].valid && formIsValid;
        }

        if(formIsValid)
        {
            firebasePromotions.orderByChild('email')
                              .equalTo(dataToSubmit.email).once("value")
                              .then((snapshot) => {
                                  if(snapshot.val() ===null)
                                  {
                                    firebasePromotions.push(dataToSubmit);
                                    this.resetFormSuccess(true);
                                  }
                                  else
                                  {
                                    this.resetFormSuccess(false);
                                  }
                              })
        }
        else
        {
            this.setState(
                {formError:true}
            )
        }

    }

    updateForm = (element) => {

        const newFormdata=  {...this.state.formData}
        const newElement={...newFormdata[element.id]}
        
        newElement.value=element.event.target.value;

        let validData = validation(newElement);

        newElement.valid=validData[0];
        newElement.validationErrMessage=validData[1];

        

        newFormdata[element.id]=newElement;

        this.setState(
            {
                formError:false,
                formData:newFormdata
            }
        )
    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={
                        (event) => this.SubmitForm(event)
                    }>
                        <div className="enroll_title">
                            Enter your email
                        </div>
                        <div className="enroll_input">
                            <FormFields 
                                        id={'email'}
                                        formdata={this.state.formData.email}
                                        change={
                                            (element) => this.updateForm(element)
                                        }/>
                                        {
                                            this.state.formError?
                                                                 <div className="error_label">Something is wrong. Try Again</div>
                                                                 :null
                                        }
                                        <div className="success_label">{this.state.formSuccess}</div>
                                        <button onClick={ (event) => this.SubmitForm(event)}>Enroll</button>    
                                        <div className="enroll_disclaimer">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</div>  
                        </div>
                    </form>

                </div>   
            </Fade>
        );
    }
}

export default enroll;