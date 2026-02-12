import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './pages/account-list/account-list.component';
import { AccountManagementComponent } from './pages/account-management/account-management.component';

const routes: Routes = [
  { path: 'list', component: AccountListComponent },
  { path: 'manage', component: AccountManagementComponent },
  { path: '', pathMatch: 'full', redirectTo: 'list' }
];

@NgModule({
  declarations: [AccountListComponent, AccountManagementComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class AccountsModule {}
