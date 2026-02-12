import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AccountListComponent } from './account-list/account-list.component';
import { PendingApprovalsComponent } from './pending-approvals/pending-approvals.component';
import { ManagerTransactionHistoryComponent } from './transaction-history/transaction-history.component';

const routes: Routes = [
  { path: '', component: ManagerDashboardComponent },
  { path: 'accounts', component: AccountListComponent },
  { path: 'pending-approvals', component: PendingApprovalsComponent },
  { path: 'history', component: ManagerTransactionHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule {}
