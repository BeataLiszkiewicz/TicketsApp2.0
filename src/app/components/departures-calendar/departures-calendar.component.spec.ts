import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparturesCalendarComponent } from './departures-calendar.component';

describe('DeparturesCalendarComponent', () => {
  let component: DeparturesCalendarComponent;
  let fixture: ComponentFixture<DeparturesCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeparturesCalendarComponent]
    });
    fixture = TestBed.createComponent(DeparturesCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
