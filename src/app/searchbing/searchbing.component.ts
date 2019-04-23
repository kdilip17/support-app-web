import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// import { Ngx}
let endpoint = 'http://localhost:7733';

var subscriptionKey = '74c93b88238e40b493a1c9b0c10e4313';
// var customConfigId = '639844c0-618d-4e38-bffe-ea39006fc86c';
var customConfigId = '08cdbf31-92cc-45f4-bbe5-cfc38f27505b' // dilip config id
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey
  })
};
/// azure options
const azureUrlOptions = {
  apiKey: 'B23575A30B7513505B299CE460DC999D',
  qs: {
    apiversion: '2017-11-11',
    searchfields: 'name'
  }
}

const azureOptions = {
  endpoint: "https://arubacontentsearch.search.windows.net/indexes/azureblob-index6/docs?api-version="
    + azureUrlOptions.qs.apiversion +"&search=aruba&searchfields=" + azureUrlOptions.qs.searchfields
}
// 
const azureHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'api-key': azureUrlOptions.apiKey
  })
};
//

@Component({
  selector: 'app-searchbing',
  templateUrl: './searchbing.component.html',
  styleUrls: ['./searchbing.component.scss']
})
export class SearchbingComponent implements OnInit {
  bingResults: any[] = [];
  azureResults: any[] = [];
  finalSearchResults: any[] = [];
  finalSearchResults1: any[] = [];
  options = [{ id: 1, name: 'aruba' }, { id: 2, name: 'air wave' }, { id: 3, name: 'documentation' },
  { id: 4, name: 'community' }];
  filteredOptions = [];
  someInput = '';
  pageLength = false;
  searchTermFinal: string;

  constructor(private http: HttpClient, private router: Router) {

  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  /***
   * Filter data based on input text
   */
  changeInput() {
    if (this.someInput) {
      this.filteredOptions = this.getSearchedValue(this.someInput);

    }
  }
  getSearchedValue(name) {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  readAzureData() {
    
  }
  readData(data) {
    this.bingResults = [];
    this.azureResults = [];
    this.finalSearchResults = [];
    this.finalSearchResults1 = [];
    // console.log("search dta", data);
    let someInput: String = ""
    let searchTerm = data;
    this.searchTermFinal = data;


    let qs = {
      customconfig: customConfigId,
      q: searchTerm
    }
   
    endpoint = "https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?customconfig=" + qs.customconfig + "&q=" + qs.q + "&count=50&offset=0";
    this.listNotification().subscribe((data: any) => {
      // let showData = data

      // console.log("printing listData", data.webPages.value);
      this.bingResults = data.webPages.value;
      console.log(this.bingResults.length, " Bing results found")
      this.bingResults.forEach(bingObject => {
        bingObject['isLocked'] = false;
      });
      // this.finalSearchResults = this.finalSearchResults.concat(this.bingResults)
      this.listAzureNotification().subscribe((data: any) => {
        this.azureResults = data;
        console.log(this.azureResults.length, " Azure results found")
        this.finalSearchResults1 = this.finalSearchResults1.concat(this.bingResults)
        this.finalSearchResults1 = this.finalSearchResults1.concat(this.azureResults);
        // console.log(this.finalSearchResults1.length)
        if (this.finalSearchResults1.length > 0) {
           this.pageLength = true;
        }
      });
      
      
    });

  }

  ngOnInit() {
  }

  accessDocument(event, item) {
    if (item.isLocked) {
      alert("You don't have access to view this document")
    } else {
      window.open(item.url, "_blank");
    }
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }

  listNotification(): Observable<any> {
    return this.http.get(endpoint, httpOptions).pipe(
      map(this.extractData));
  }
  listAzureNotification(): Observable<any> {
    let customEndPoint = "http://localhost:7789/azure?searchTerm="+this.searchTermFinal
    const customhttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'http://localhost:7789'
      })
    };
    return this.http.get(customEndPoint,customhttpOptions).pipe(
      map(this.extractData));
  }
  private handleError<T>(operation = 'operation', result?: T) {
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
