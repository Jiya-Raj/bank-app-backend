import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  template: '<p class="error-text" *ngIf="message">{{ message }}</p>'
})
export class ErrorAlertComponent {
  @Input() message = '';
}
