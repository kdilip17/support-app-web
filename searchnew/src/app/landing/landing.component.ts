import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface State {
  flag: string;
  name: string;
  // population: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Switches in Announcements (05)',
      // population: '2.978M',      
      flag: '../../assets/images/landing/announcements.png'
    },
    {
      name: 'Switches in Software downloads (65)',
      // population: '39.14M',      
      flag: '../../assets/images/landing/downloads.png'
    },
    {
      name: 'Switches in Documents (35)',
      // population: '20.27M',
      flag: '../../assets/images/landing/documents.png'
    },
    {
      name: 'Switches in KB Articles (15)',
      // population: '27.47M',
      flag: '../../assets/images/landing/articles.png'
    },
    {
      name: 'Switches in Help & FAQs (05)',
      // population: '27.47M',
      flag: '../../assets/images/landing/search_faq.png'
    }
  ];

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
   }
   private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
  }
  

}
