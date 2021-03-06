export default class AuthAction{
    static SIGNUP = 'SIGNUP'
    static SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL'
    static SIGNUP_REJECTED = 'SIGNUP_REJECTED'

    static SIGNIN = 'SIGNIN';
    static SIGNIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL';
    static SIGNIN_REJECTED = 'SIGNIN_REJECTED';

    static LOGOUT = 'LOGOUT';
    static LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';

    
    static signup(){
        return {
            type:AuthAction.SIGNUP
        }
    }

    static signupSuccessful(authUser){
        return {
            type:AuthAction.SIGNUP_SUCCESSFUL,
            payload:authUser   
        }
    }

    static signupRejected(error){
        return{
            type:AuthAction.SIGNUP_REJECTED,
            payload:error
        }    
    }

    static signin() {
        return {
            type: AuthAction.SIGNIN
        }
    }

    static signinSuccessful(authUser) {
        return {
            type: AuthAction.SIGNIN_SUCCESSFUL,
            payload: authUser
        }
    }

    static signinRejected(error) {
        return {
            type: AuthAction.SIGNIN_REJECTED,
            payload: error
        }
    }

    static logout() {
        return {
            type: AuthAction.LOGOUT
        }
    }

    static logoutSuccessful() {
        return {
            type: AuthAction.LOGOUT_SUCCESSFUL
        }
    }

}