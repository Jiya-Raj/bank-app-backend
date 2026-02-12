import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div class="card" style="background:#000;border:1px solid #666;color:#fff;max-width:900px;">
    <div class="card-body">
      <h4>Clerk User Management</h4>
      <p style="color:#ccc; margin:0;">No clerk-management endpoints are exposed by the backend API, so this screen is limited to scope-safe display only.</p>
    </div>
  </div>
  `
})
export class ClerkManagementComponent {}
