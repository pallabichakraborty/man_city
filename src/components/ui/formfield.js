import React from 'react';

const formfield = ({ id, formdata, change }) => {

    const showError = () => {
        let errorMessage = <div className="error_label">
            {
                formdata.validation && !formdata.valid ? formdata.validationErrMessage : ''
            }
        </div>
        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = <div></div>;

        if (formdata.element === 'input') 
        {
            formTemplate = (
                <div>
                    {formdata.showlabel ?
                        <div className="label_inputs">
                            {formdata.config.label}
                        </div>
                        : null
                    }
                    <input
                        {...formdata.config}
                        value={formdata.value}
                        onChange={
                            (event) => change({ event, id })
                        }
                    ></input>
                    {showError()}
                </div>
            )
        }
        else if (formdata.element === 'select') {
            formTemplate = (
                <div>
                    {formdata.showlabel ?
                        <div className="label_inputs">
                            {formdata.config.label}
                        </div>
                        : null
                    }
                    <select
                        value={formdata.value}
                        onChange={
                            (event) => change({ event, id })
                        }
                    >
                        <option value=''>Select One</option>
                        {
                            formdata.config.options.map((item) => {
                                return (<option key={item.key} value={item.key}>{item.value}</option>);
                            })
                        }

                    </select>
                    {showError}
                </div>
            )
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