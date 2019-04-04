import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './mynotification/mynotification.component';
import { NotificationdetailComponent } from './notificationdetail/notificationdetail.component'
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: '/mynotifications', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notificationdetail', component: NotificationdetailComponent},
  { path: 'mynotifications', component: NotificationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
