import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { LogoutComponent } from './features/auth/logout/logout.component';
import { DashboardLayoutComponent } from './features/layout/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeRedirectComponent } from './features/layout/home-redirect/home-redirect.component';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'clerk',
        canActivate: [RoleGuard],
        data: { roles: ['CLERK'] },
        loadChildren: () => import('./features/clerk/clerk.module').then((m) => m.ClerkModule)
      },
      {
        path: 'manager',
        canActivate: [RoleGuard],
        data: { roles: ['MANAGER'] },
        loadChildren: () => import('./features/manager/manager.module').then((m) => m.ManagerModule)
      },
      { path: '', pathMatch: 'full', component: HomeRedirectComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
