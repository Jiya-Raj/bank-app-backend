import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClerkDashboardComponent } from './clerk-dashboard/clerk-dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

const routes: Routes = [
  { path: '', component: ClerkDashboardComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'history', component: TransactionHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkRoutingModule {}
