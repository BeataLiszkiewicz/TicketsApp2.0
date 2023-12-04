import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneSeatsComponent } from './plane-seats.component';

describe('PlaneSeatsComponent', () => {
  let component: PlaneSeatsComponent;
  let fixture: ComponentFixture<PlaneSeatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaneSeatsComponent]
    });
    fixture = TestBed.createComponent(PlaneSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
