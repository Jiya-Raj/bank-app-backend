import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, ErrorAlertComponent],
  imports: [CommonModule],
  exports: [CommonModule, LoadingSpinnerComponent, ErrorAlertComponent]
})
export class SharedModule {}
