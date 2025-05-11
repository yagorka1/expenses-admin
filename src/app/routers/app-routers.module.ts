import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../components/main-layout/main-layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AlreadyAuthenticatedGuard } from '../core/guards/alreadyAuthenticated.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'transactions',
  },
  // Auth
  {
    path: 'transactions',
    canActivate: [AlreadyAuthenticatedGuard],
    loadChildren: () => import('../features/auth/auth.module').then((m) => m.AuthModule),
  },

  // Application
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // Admin
      {
        path: 'admin',
        data: {
          crumbs: null,
        },
        children: [
          {
            path: 'transactions',
            loadChildren: () =>
              import('../features/transactions/transactions.module').then((m) => m.TransactionsModule),
          },
        ],
      },
    ],
  },
];

routes.push({
  path: '**',
  redirectTo: 'not-found',
});

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutersModule {}
