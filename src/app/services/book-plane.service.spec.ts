import { TestBed } from '@angular/core/testing';

import { BookPlaneService } from './book-plane.service';

describe('BookPlaneService', () => {
  let service: BookPlaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookPlaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
