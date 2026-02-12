import { Component } from '@angular/core';

@Component({
  selector: 'app-pending-approvals',
  templateUrl: './pending-approvals.component.html'
})
export class PendingApprovalsComponent {
  readonly message = 'Pending approval API endpoints are not exposed in current backend controller.';
}
