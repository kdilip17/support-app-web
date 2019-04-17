import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbingComponent } from './searchbing.component';

describe('SearchbingComponent', () => {
  let component: SearchbingComponent;
  let fixture: ComponentFixture<SearchbingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
