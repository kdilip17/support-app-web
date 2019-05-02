import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { _ } from "underscore";
import * as moment from 'moment';
import { MatPaginator, MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  //
  @ViewChild(MatPaginator) paginator: MatPaginator
  //
  bingResults: any[] = [];
  azureResults: any[] = [];
  finalSearchResults: any[] = [];
  finalSearchResults1: any[] = [];
  // results by tabs/filters
  announcementResults: any[] = [];
  softwareResults: any[] = [];
  documentationResults: any[] = [];
  knowledgeResults: any[] = [];
  helpResults: any[] = [];
  //
  totalResults: any = 0;
  filteredOptions = [];
  someInput = '';
  endpoint: string = '';
  pageLength = false;
  pageInit = false;
  showNoResults = false;
  searchTermFinal: string;
  selectedSort = '';
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  pageChange(event) {
    console.log("clicking", event)

    if (event.pageSize > 10 && event.pageIndex == 0) {
      let lastSearchText = localStorage.getItem("lastSearchText");
      this.readData(lastSearchText, event.pageIndex, event.pageSize);
    } else {
      let lastSearchText = localStorage.getItem("lastSearchText");
      this.readData(lastSearchText, event.pageIndex, event.pageSize);
    }
  }
  /***
   * Filter data based on input text
   */
  changeInput() {
    if (this.someInput) {
      this.getAutoSuggestions(this.someInput).subscribe((data: any) => {
        let finalOutput = data.suggestionGroups[0].searchSuggestions;
        this.filteredOptions = finalOutput;
        console.log(this.filteredOptions)
      })
    } else {
      this.filteredOptions = [];
    }
  }

  /**
   * Sort by 
   * @param event 
   */
  sortDate() {
    let sortResult = this.finalSearchResults1.sort((a: any, b: any) => {
      if (<any>moment(a.dateLastCrawled).format('YYYY-MM-DDTHH:MM:SS') < (<any>moment(b.dateLastCrawled).format('YYYY-MM-DDTHH:MM:SS'))) { return -1; }
      if (<any>moment(a.dateLastCrawled).format('YYYY-MM-DDTHH:MM:SS') > (<any>moment(b.dateLastCrawled).format('YYYY-MM-DDTHH:MM:SS'))) { return 1; }
      return 0;
    });
    let finalResult: any = this.selectedSort === 'dateAsc' ? sortResult : this.selectedSort === 'dateDesc' ? sortResult.reverse() : [];
    this.finalSearchResults1 = finalResult;
  }

  selectTest(event) {

  }

  readData(data, pagecount = 0, pageSize = 0) {

    // if(data)
    //   this.spinner.show();

    // console.log(data)
    data = data.replace(/_/g, " ");
    localStorage.setItem("lastSearchText", data);
    console.log(data, "===")
    this.pageLength = false;
    this.showNoResults = false;
    this.bingResults = [];
    this.azureResults = [];
    this.finalSearchResults = [];
    this.finalSearchResults1 = [];


    // console.log("search dta", data);
    // let someInput: String = ""
    let searchTerm = data;
    this.searchTermFinal = data;


    let qs = {
      customconfig: '08cdbf31-92cc-45f4-bbe5-cfc38f27505b',
      q: searchTerm
    }
    let limit = 10;
    let offset = 0;
    if (pagecount > 0) {
      offset = pageSize + 1;
      console.log("changed offset ", offset)
    }
    if (pageSize > 0) {
      limit = pageSize;
    }

    this.endpoint = "https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?customconfig=" + qs.customconfig + "&q=" + qs.q + "&count=" + limit + "&offset=" + offset + "&responseFilter=support";
    console.log("bing endpoint==", this.endpoint)
    this.listNotification().subscribe((data: any) => {

      if (data.hasOwnProperty('webPages')) {
        this.totalResults = data.webPages.totalEstimatedMatches;
      }
      this.bingResults = data.hasOwnProperty('webPages') ? data.webPages.value : [];
      this.bingResults.forEach(bingObject => {
        bingObject['isLocked'] = false;
      });

      this.finalSearchResults1 = this.finalSearchResults1.concat(this.bingResults);
      this.announcementResults = [];
      this.softwareResults = [];
      this.documentationResults = [];
      this.knowledgeResults = [];
      this.helpResults = [];
      //
      this.finalSearchResults1.forEach((resultsObj) => {
        if (resultsObj.url.indexOf("community.arubanetworks.com") != -1) {
          this.knowledgeResults.push(resultsObj);
        } else if (resultsObj.url.indexOf("support.arubanetworks.com") != -1) {
          if (resultsObj.url.toLowerCase().indexOf("documentation") != -1) {
            this.documentationResults.push(resultsObj);
          } else {
            this.softwareResults.push(resultsObj);
            this.knowledgeResults.push(resultsObj);
          }
        } else if (resultsObj.url.indexOf("ase.arubanetworks.com") != -1) {
          this.knowledgeResults.push(resultsObj);
        } else if (resultsObj.url.indexOf("asp.arubanetworks.com") != -1) {
          if (resultsObj.url.toLowerCase().indexOf("documentation") != -1) {
            this.documentationResults.push(resultsObj);
          } else {
            this.announcementResults.push(resultsObj);
            this.softwareResults.push(resultsObj);
          }
        } else if (resultsObj.url.indexOf("help.central.arubanetworks.com") != -1) {
          this.helpResults.push(resultsObj);
        } else if (resultsObj.url.indexOf("www.youtube.com/user/ArubaNetworks") != -1) {
          this.helpResults.push(resultsObj);
        }
      })
      console.log("softwareResults ===", this.softwareResults.length)
      console.log("announcementResults ===", this.announcementResults.length)
      console.log("documentationResults ===", this.documentationResults.length)
      console.log("knowledgeResults ===", this.knowledgeResults.length)
      console.log("helpResults ===", this.helpResults.length)

      if (this.finalSearchResults1.length == 0) {
        this.showNoResults = true;
      }
      if (this.finalSearchResults1.length > 0) {
        this.pageLength = true;
      }
    });

  }

  accessDocument(event, item) {
    if (item.isLocked) {
      // alert("You don't have access to view this document. Please login to view this content.")
      localStorage.setItem('lockedRedirectUrl', item.url)
      // this.router.navigate(['/login'])
      window.open('/login', "_blank");
    } else {
      window.open(item.url, "_blank");
    }
  }

  listNotification(): Observable<any> {
    let subscriptionKey = '74c93b88238e40b493a1c9b0c10e4313';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
      })
    };
    return this.http.get(this.endpoint, httpOptions).pipe(
      map(this.extractData));
  }

  getAutoSuggestions(someInput): Observable<any> {
    let customEndPoint = "https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/suggestions/search?q=" + someInput + "&customconfig=08cdbf31-92cc-45f4-bbe5-cfc38f27505b"
    const autoSuggestHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '6a4426cd961a4a1f99d0b43a84919123'
      })
    };
    return this.http.get(customEndPoint, autoSuggestHeaders).pipe(
      map(this.extractData));
  }

  ngOnInit() {
  }

}
