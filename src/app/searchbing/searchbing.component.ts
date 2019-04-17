import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {Router} from '@angular/router';
let endpoint = 'http://localhost:7733';
//
const searchTerm = 'IAP-92 and IAP-93 Wireless Access Point';
var subscriptionKey = '74c93b88238e40b493a1c9b0c10e4313';
var customConfigId = '08f16ed4-528c-486f-91fa-c4d8c0baa357';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey
  })
};
let qs = {
  customconfig: customConfigId,
  q: searchTerm
}
endpoint = "https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?customconfig=" + qs.customconfig + "&q=" + qs.q;
console.log(endpoint)
//

@Component({
  selector: 'app-searchbing',
  templateUrl: './searchbing.component.html',
  styleUrls: ['./searchbing.component.scss']
})
export class SearchbingComponent implements OnInit {

  bingResults: any[] = [];

  constructor(private http: HttpClient,private router: Router) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  ngOnInit() {
    this.listNotification().subscribe((data: any) => {
      
      for (var i = 0; i < data.webPages.value.length; ++i) {
        var webPage = data.webPages.value[i];
        this.bingResults.push({
            pageName: webPage.name,
            pageUrl: webPage.url,
            pageDisplayUrl: webPage.displayUrl,
            pageSnippet: webPage.snippet,
            pageDateLastCrawled: webPage.dateLastCrawled
        })
      }
      console.log(this.bingResults)
    });
  }
  
  listNotification (): Observable<any> {
    return this.http.get(endpoint,httpOptions).pipe(
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
