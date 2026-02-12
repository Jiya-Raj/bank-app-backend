import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: '<p *ngIf="loading">Loading...</p>'
})
export class LoadingSpinnerComponent {
  @Input() loading = false;
}
