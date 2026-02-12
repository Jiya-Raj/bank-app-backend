import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [SharedModule, ReactiveFormsModule],
  exports: [LoginComponent, LogoutComponent]
})
export class AuthModule {}
