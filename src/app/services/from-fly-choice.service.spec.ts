import { TestBed } from '@angular/core/testing';

import { FromFlyChoiceService } from './from-fly-choice.service';

describe('FromFlyChoiceService', () => {
  let service: FromFlyChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FromFlyChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
