import React,{useReducer} from 'react';

export const AuthContext = React.createContext({});

const initialState = {
    user:null
};

function  reducerFunction(state,action){
    switch(action.type){
        case "LOGIN":
            return{
                user:{
                    email:action.email,
                    isAuth: true,
                },
            };
        case "LOGOUT":
            return{
                user:null,
            };
        default:
            return initialState;
    };
};

function AuthContextComponent({children}){
    const [state,dispatch] = useReducer(reducerFunction,initialState);

    return(
        <AuthContext.Provider  value={{state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextComponent;