import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './pages/deposit/deposit.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { PendingApprovalsComponent } from './pages/pending-approvals/pending-approvals.component';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  { path: 'deposit', component: DepositComponent, canActivate: [RoleGuard], data: { roles: ['CLERK'] } },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [RoleGuard], data: { roles: ['CLERK'] } },
  { path: 'history', component: TransactionHistoryComponent, canActivate: [RoleGuard], data: { roles: ['CLERK', 'MANAGER'] } },
  { path: 'pending', component: PendingApprovalsComponent, canActivate: [RoleGuard], data: { roles: ['MANAGER'] } },
  { path: '', pathMatch: 'full', redirectTo: 'history' }
];

@NgModule({
  declarations: [DepositComponent, WithdrawComponent, TransactionHistoryComponent, PendingApprovalsComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class TransactionsModule {}
