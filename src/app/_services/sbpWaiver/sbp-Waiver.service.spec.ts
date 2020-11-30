import { TestBed } from '@angular/core/testing';

import { sbpWaiverService } from './sbp-Waiver.service';

describe('sbpWaiverService', () => {
  let service: sbpWaiverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(sbpWaiverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
