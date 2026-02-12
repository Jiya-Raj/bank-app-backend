import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ClerkRoutingModule } from './clerk-routing.module';
import { ClerkDashboardComponent } from './clerk-dashboard/clerk-dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

@NgModule({
  declarations: [ClerkDashboardComponent, DepositComponent, WithdrawComponent, TransactionHistoryComponent],
  imports: [SharedModule, ClerkRoutingModule, ReactiveFormsModule, FormsModule]
})
export class ClerkModule {}
