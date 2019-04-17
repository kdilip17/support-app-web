import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {Router} from '@angular/router';
const endpoint = 'http://10.150.90.42:7733';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-tables',
  templateUrl: './mynotification.component.html',
  styleUrls: ['./mynotification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit {
  API = 'http://10.150.90.42:7733';
  notifications: any[] = [];

  constructor(private http: HttpClient,private router: Router) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  ngOnInit() {
    this.listNotification().subscribe((data: any) => {
      // console.log(data.notifications);
      this.notifications= data.notifications;
      console.log(this.notifications)
    });
  }
  selectedNotification: any = Notification;
  onSelect(notification : Notification):void{
    this.selectedNotification = notification;
    let notificationId = this.selectedNotification.id;
    this.getNotification(notificationId).subscribe((data: any) => {
        localStorage.setItem('notificationDetail',JSON.stringify(data.notification))
        this.router.navigate(['./notificationdetail']);
    })
    
  }
  
  listNotification (): Observable<any> {
    return this.http.post(endpoint + '/ans/notification/list/REC',httpOptions).pipe(
      map(this.extractData));
  }
  getNotification(notificationId): Observable<any> {
    return this.http.get(endpoint + '/ans/notification/get/' + notificationId).pipe(
      map(this.extractData));
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
