import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="card" style="background:#000; border:1px solid #666; color:#fff; max-width:700px; margin:0 auto;">
      <div class="card-body">
        <h3>Unauthorized Access</h3>
        <p style="color:#ccc;">You do not have permission to access this page.</p>
        <a routerLink="/" class="btn" style="border:1px solid #777; color:#fff;">Go to Dashboard</a>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {}
