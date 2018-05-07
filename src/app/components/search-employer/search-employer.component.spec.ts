import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmployerComponent } from './search-employer.component';

describe('SearchEmployerComponent', () => {
  let component: SearchEmployerComponent;
  let fixture: ComponentFixture<SearchEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
