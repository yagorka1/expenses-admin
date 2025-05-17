import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: TransactionsListComponent,
      },
      {
        path: 'details/:id',
        component: TransactionDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
