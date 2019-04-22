import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-searchbing',
  templateUrl: './searchbing.component.html',
  styleUrls: ['./searchbing.component.scss']
})
export class SearchbingComponent implements OnInit {
  bingResults: any[] = [];
  options = [{id:1,name:'test1'},{id:2,name:'test2'},{id:3,name:'test3'},
  {id:4,name:'test'}];
  filteredOptions = [];
  someInput = '';

  constructor(private http: HttpClient, private router: Router) { }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  /***
   * Filter data based on input text
   */
  changeInput(){
    if(this.someInput){
      this.filteredOptions = this.getSearchedValue(this.someInput);

    }
  }
  getSearchedValue(name){
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  readData(data) {
    console.log("search dta", data);
    let someInput: String = ""
    let searchTerm = data;


    let qs = {
      customconfig: customConfigId,
      q: searchTerm
    }
    endpoint = "https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?customconfig=" + qs.customconfig + "&q=" + qs.q + "&count=100";
    this.listNotification().subscribe((data: any) => {
      // let showData = data

      console.log("printing listData", data.webPages.value);
      this.bingResults = data.webPages.value;
      console.log(this.bingResults)
    });

  }

  ngOnInit() {
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }

  listNotification(): Observable<any> {
    return this.http.get(endpoint, httpOptions).pipe(
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
