import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './mynotification/mynotification.component';
import { NotificationdetailComponent } from './notificationdetail/notificationdetail.component'
import {SearchbingComponent} from "./searchbing/searchbing.component"
// import { AppComponent } from "./app.component";
import { from } from 'rxjs';

const routes: Routes = [
  // { path: '', component: AppComponent },
  // { path: '', redirectTo: '/mynotifications', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notificationdetail', component: NotificationdetailComponent},
  { path: 'mynotifications', component: NotificationComponent },
  { path: 'searchbing', component: SearchbingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
