import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AccountListComponent } from './account-list/account-list.component';
import { PendingApprovalsComponent } from './pending-approvals/pending-approvals.component';
import { ManagerTransactionHistoryComponent } from './transaction-history/transaction-history.component';

@NgModule({
  declarations: [ManagerDashboardComponent, AccountListComponent, PendingApprovalsComponent, ManagerTransactionHistoryComponent],
  imports: [SharedModule, ManagerRoutingModule, ReactiveFormsModule, FormsModule]
})
export class ManagerModule {}
