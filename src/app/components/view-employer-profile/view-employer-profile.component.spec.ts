import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployerProfileComponent } from './view-employer-profile.component';

describe('ViewEmployerProfileComponent', () => {
  let component: ViewEmployerProfileComponent;
  let fixture: ComponentFixture<ViewEmployerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmployerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
