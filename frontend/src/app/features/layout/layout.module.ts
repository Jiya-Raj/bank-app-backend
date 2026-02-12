import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HomeRedirectComponent } from './home-redirect/home-redirect.component';

@NgModule({
  declarations: [SidebarComponent, DashboardLayoutComponent, HomeRedirectComponent],
  imports: [SharedModule, RouterModule],
  exports: [DashboardLayoutComponent]
})
export class LayoutModule {}
