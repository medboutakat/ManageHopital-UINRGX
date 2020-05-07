import { AuthActionTypes, GetStatus } from "./action";
import { Observable } from 'rxjs';
import { User } from '../auth';


// @Effect({ dispatch: false })
// GetStatus: Observable<any> = this.actions
//   .ofType(AuthActionTypes.GET_STATUS)
//   .map((action: GetStatus) => action)
//   .switchMap(payload => {
//     return this.authService.getStatus();
//   });

// @Effect({ dispatch: false })
// GetStatus: Observable<User> = this.actions
//   .ofType(AuthActionTypes.GET_STATUS)
//   .switchMap(payload => {
//     return this.authService.getStatus();
//   });