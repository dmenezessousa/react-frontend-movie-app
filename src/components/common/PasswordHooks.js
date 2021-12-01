import { useState, useEffect } from "react";
import {isEmpty, isStrongPassword,} from "validator";

function PasswordHooks() {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [pwOnFocus, setPwOnFocus] = useState(false);
    const [pwOnBlur, setPwOnBlur] = useState(false);

    useEffect(() => {

        if(pwOnFocus){
            if(password.length > 0){
                if(!isStrongPassword(password,
                    {minLength:8,
                    minLowercase:1,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbol:1
                })){
                    setPasswordError("Is Not Strong Password")
                }

                if(isStrongPassword(password,
                    {minLength:8,
                    minLowercase:1,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbol:1
                })){
                    setPasswordError("Is Strong Password")
                }
            }
        }

        if(pwOnBlur){
            if(isEmpty(password)){
                setPasswordError("Password cannot be empty")
            };
        };

    },[password,pwOnFocus,pwOnBlur]);

    function handlePwOnChange(e){
        setPassword(e.target.value);
    };

    return [password,handlePwOnChange,passwordError,setPwOnFocus,setPwOnBlur]
};

export default PasswordHooks;
