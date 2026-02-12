import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { LayoutComponent } from './shared/layout.component';
import { UnauthorizedComponent } from './shared/unauthorized.component';
import { HomeRedirectComponent } from './shared/home-redirect.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard.component';
import { AccountCreationComponent } from './manager/account-creation.component';
import { AccountListingComponent } from './manager/account-listing.component';
import { ClerkManagementComponent } from './manager/clerk-management.component';
import { ApprovalComponent } from './manager/approval.component';
import { ManagerHistoryComponent } from './manager/manager-history.component';
import { ClerkDashboardComponent } from './clerk/clerk-dashboard.component';
import { DepositComponent } from './clerk/deposit.component';
import { WithdrawComponent } from './clerk/withdraw.component';
import { ClerkHistoryComponent } from './clerk/clerk-history.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', component: HomeRedirectComponent },
      { path: 'manager/dashboard', component: ManagerDashboardComponent, canActivate: [roleGuard(['MANAGER'])] },
      { path: 'manager/accounts/create', component: AccountCreationComponent, canActivate: [roleGuard(['MANAGER'])] },
      { path: 'manager/accounts/list', component: AccountListingComponent, canActivate: [roleGuard(['MANAGER'])] },
      { path: 'manager/clerks', component: ClerkManagementComponent, canActivate: [roleGuard(['MANAGER'])] },
      { path: 'manager/approvals', component: ApprovalComponent, canActivate: [roleGuard(['MANAGER'])] },
      { path: 'manager/history', component: ManagerHistoryComponent, canActivate: [roleGuard(['MANAGER'])] },
      { path: 'clerk/dashboard', component: ClerkDashboardComponent, canActivate: [roleGuard(['CLERK'])] },
      { path: 'clerk/deposit', component: DepositComponent, canActivate: [roleGuard(['CLERK'])] },
      { path: 'clerk/withdraw', component: WithdrawComponent, canActivate: [roleGuard(['CLERK'])] },
      { path: 'clerk/history', component: ClerkHistoryComponent, canActivate: [roleGuard(['CLERK'])] }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
