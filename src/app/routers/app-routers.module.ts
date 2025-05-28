import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../components/main-layout/main-layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AlreadyAuthenticatedGuard } from '../core/guards/alreadyAuthenticated.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin',
  },

  { path: 'auth', canActivate: [AlreadyAuthenticatedGuard],
    loadChildren: () => import('../features/auth/auth.module').then((m) => m.AuthModule),
  },

  // Application
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // Admin
      {
        path: '',
        data: {
          crumbs: null,
        },
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../features/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('../features/transactions/transactions.module').then((m) => m.TransactionsModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('../features/categories/categories.module').then((m) => m.CategoriesModule),
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
