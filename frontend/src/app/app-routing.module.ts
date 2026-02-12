import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./features/transactions/transactions.module').then((m) => m.TransactionsModule),
        canActivate: [RoleGuard],
        data: { roles: ['CLERK', 'MANAGER'] }
      },
      {
        path: 'accounts',
        loadChildren: () => import('./features/accounts/accounts.module').then((m) => m.AccountsModule),
        canActivate: [RoleGuard],
        data: { roles: ['MANAGER'] }
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
