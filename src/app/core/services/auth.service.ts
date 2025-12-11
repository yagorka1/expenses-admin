import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AUTH_API } from '../api/auth-api';
import { Constants } from '../constants/constants';
import { GLOBAL_ROUTES } from '../constants/global-routes';
import { SignInDataInterface } from '../interfaces/auth-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public signIn(data: SignInDataInterface): Observable<any> {
    return this.http.post<any>(AUTH_API.signIn, data).pipe(
      tap((resp) => {
        this.createSession(resp.accessToken);
        this.router.navigate([GLOBAL_ROUTES.DASHBOARD]);
      }),
    );
  }

  public getAuthenticationToken(): string | null {
    return localStorage.getItem(Constants.STORAGE_AUTH_TOKEN);
  }

  public isSignedIn(): boolean {
    return !!this.getAuthenticationToken();
  }

  public signOutWithoutRequest(): void {
    this.destroySession();
    this.router.navigate([GLOBAL_ROUTES.AUTH]);
  }

  private createSession(token: string): void {
    localStorage.setItem(Constants.STORAGE_AUTH_TOKEN, token);
  }

  private destroySession(): void {
    localStorage.removeItem(Constants.STORAGE_AUTH_TOKEN);
  }
}
