import * as auth from '../store/auth.reducer';
import { createFeatureSelector } from '@ngrx/store';


export interface AppState {
    authState: auth.State;
    RegisterState: auth.StateRegistre;
}
export const reducers = {
    auth: auth.reducerAuth,
    registre: auth.reducerRegister
};
export const selectAuthState = createFeatureSelector<AppState>('auth');