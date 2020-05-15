import AuthAction from './../Action/AuthAction'

const INITIAL_STATE = {
   isProcessing:false,
   isRegistered:false,
   isError:false,
   errorMessage:{},
   isAuthenticated : false,
   authUser:{},
}

function AuthReducer(state=INITIAL_STATE,action){
    switch(action.type){

    //  Sign Up   
    case AuthAction.SIGNUP :
        return {...state,isProcessing:true,isRegistered:false,isError:false};
    case AuthAction.SIGNUP_SUCCESSFUL :
        return {...state,isProcessing:false,isRegistered:true,isError:false,authUser:action.payload};
    case AuthAction.SIGNUP_REJECTED :
        return {...state,isProcessing:false,isRegistered:false,isError:true,errorMessage:action.payload};
     
    // Sign In
    case AuthAction.SIGNIN:
        return {...state, isProcessing: true, isAuthenticated: false, isError : false};
    case AuthAction.SIGNIN_SUCCESSFUL:
        return {...state, isProcessing: false, isAuthenticated: true, isError : false, authUser: action.payload ,  errorMessage: {}};
    case AuthAction.SIGNIN_REJECTED:
        return {...state, isProcessing: false, isAuthenticated: false,authUser:{}, isError : true, errorMessage: action.payload};

    case AuthAction.LOGOUT:
        return {...state, isProcessing: true};
    case AuthAction.LOGOUT_SUCCESSFUL:
        return {...state, isProcessing: false, isAuthenticated: false,authUser:{}};

    default : 
        return state;
    }
}

export default AuthReducer;