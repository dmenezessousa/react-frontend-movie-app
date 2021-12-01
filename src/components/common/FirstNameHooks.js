import {useState,useEffect} from "react";
import {isAlpha} from "validator";

function FirstNameHooks(){
    const [firstName, setFirstName] = useState("");
    const [error, setError] = useState("");
    const [firstNameOnFocus, setFirstNameOnFocus] = useState(false);
    const [firstNameOnBlur, setFirstNameOnBlur] = useState(false)

    useEffect(()=>{

        if(firstNameOnFocus){
            if(firstName.length > 0){
                if(!isAlpha(firstName)){
                    setError("Cannot have char or #")
                };

                if(isAlpha(firstName)){
                    setError("")
                };
            };
        };

        if(firstNameOnBlur){
            if(firstName.length === 0){
                setError("Last Name cannot be empty")
            }
        };
    },[firstName,firstNameOnFocus,firstNameOnBlur])

    function handlefirstNameOnChange (e){
        setFirstName(e.target.value)
    };

    return [firstName, handlefirstNameOnChange,error,setFirstNameOnFocus,setFirstNameOnBlur];
};

export default FirstNameHooks;