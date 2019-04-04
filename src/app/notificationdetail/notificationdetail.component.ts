import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notificationdetail',
  templateUrl: './notificationdetail.component.html',
  styleUrls: ['./notificationdetail.component.scss']
})
export class NotificationdetailComponent implements OnInit {
  notificationDetail: any;
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let notificationDetail = localStorage.getItem('notificationDetail');
    this.notificationDetail =JSON.parse(notificationDetail);
    console.log(this.notificationDetail.notificationTitle)
  }

}
