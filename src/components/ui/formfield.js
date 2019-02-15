import React from 'react';

const formfield = ({id,formdata,change}) => {

    const showError = () => {
        let errorMessage = <div className="error_label">
            {
                formdata.validation && !formdata.valid ? formdata.validationErrMessage:''
            }
        </div>
        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate=null;

        switch(formdata.element){
            case('input'):
                formTemplate=(
                    <div>
                        <input 
                               {...formdata.config}
                               value={formdata.value}
                               onChange ={
                                   (event) => change({event,id})
                               }
                        ></input>
                        {showError()}
                    </div>
                )
                break;
            default: formTemplate=formTemplate;
        }

        return formTemplate;
    }
    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default formfield;