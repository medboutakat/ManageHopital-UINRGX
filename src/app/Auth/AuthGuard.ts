// // src/app/auth/services/auth.guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { of } from 'rxjs';
// import { mergeMap, map, take } from 'rxjs/operators';
// import { Store, State } from '@ngrx/store';
// import { AppState } from './store/app.state'

// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private authService: AuthService,
//     private store: Store<AppState>,
//     private router: Router
//   ) {}

//   canActivate() {
//     return this.checkStoreAuthentication().pipe(
//       mergeMap(storeAuth => {
//         if (storeAuth) {
//           return of(true);
//         }

//         return this.checkApiAuthentication();
//       }),
//       map(storeOrApiAuth => {
//         if (!storeOrApiAuth) {
//           this.router.navigate(['/login']);
//           return false;
//         }

//         return true;
//       })
//     );
//   }

//   checkStoreAuthentication() {
//     return this.store.select(AppState.selectIsLoggedIn).pipe(take(1));
//   }

//   checkApiAuthentication() {
//     return of(this.authService.authenticated);
//   }
// }