import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Constants } from '../constants/constans';
import { GLOBAL_ROUTES } from '../constants/global-routes';
import { AUTH_API } from '../api/auth-api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private static createSession(token: string): void {
    localStorage.setItem(Constants.STORAGE_AUTH_TOKEN, token);
  }

  private static destroySession(): void {
    localStorage.removeItem(Constants.STORAGE_AUTH_TOKEN);
  }

  // @ts-ignore
  public signIn(data: SignInDataInterface): Observable<any> {
    return this.http.post(AUTH_API.signIn, data).pipe(
      tap((resp) => {
        // @ts-ignore
        AuthService.createSession(resp.accessToken);
        this.router.navigate([GLOBAL_ROUTES.MAIN]);
      }),
    );
  }
  //
  // public signUp(data: SignUpDataInterface): Observable<any> {
  //   return this.http.post(AUTH_API.signUp, data).pipe(
  //     tap(() => {
  //       this.signIn({ email: data.email, password: data.password }).pipe(take(1)).subscribe();
  //     }),
  //   );
  // }
  //
  // public dirtySignOut(): void {
  //   AuthService.destroySession();
  //   this.router.navigate([GLOBAL_ROUTES.AUTH]);
  // }

  public getAuthenticationToken(): string | null {
    return localStorage.getItem(Constants.STORAGE_AUTH_TOKEN);
  }

  public isSignedIn(): boolean {
    return !!this.getAuthenticationToken();
  }
}
