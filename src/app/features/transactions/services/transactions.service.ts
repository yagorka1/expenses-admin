import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AUTH_API } from '../../../core/api/auth-api';
import { TRANSACTIONS_API } from '../../../core/api/transactions-api';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}


  public loadTransactions(): Observable<any> {
    return this.http.get(TRANSACTIONS_API.transactionsList).pipe(
      tap((resp) => {
       return resp;
      }),
    );
  }

  public loadTransaction(id: string): Observable<any> {
    return this.http.get(TRANSACTIONS_API.transactionId(id)).pipe(
      tap((resp) => {
       return resp;
      }),
    );
  }
}
