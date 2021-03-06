const validation = (props) => {
    let error=[true,''];

    function ValidateEmail(emailAddress) 
    {
    if (/\S+@\S+\.\S+/.test(emailAddress))
    {
        return (true)
    }
        return (false)
    }

    if(props.validation.email)
    {
        const valid=ValidateEmail(props.value.trim());
        const message =`${!valid?'Must be a valid email':''}`;
        error=!valid?[valid,message]:error;
    }
    
    if(props.validation.required)
    {
        const valid = props.value.trim() !=='';
        const message =`${!valid?'This field is required':''}`;
        error=!valid?[valid,message]:error;
    }
    return error;
};

export default validation;