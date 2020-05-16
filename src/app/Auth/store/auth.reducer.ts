import { Auth } from '../auth.model';
import { AuthActionTypes, All } from './auth.actions';
import { Register } from '../register';

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: Auth | null;
    // error message
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};
export function reducerAuth(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    username: action.payload.username,
                    password: action.payload.password,
                    token: action.payload.token
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect email and/or password.'
            };
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}
export interface StateRegistre {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: Register | null;
    // error message
    errorMessage: string | null;
}
export const initialState2: StateRegistre = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};
export function reducerRegister(state = initialState2, action: All): StateRegistre {
    switch (action.type) {
        case AuthActionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                errorMessage: null
            };
        }

        case AuthActionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                errorMessage: 'That username is already in use'
            }
        }
        default: {
            return state
        }  

    }
}