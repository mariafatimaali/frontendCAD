import { TestBed } from '@angular/core/testing';

import { valuationExpiryService } from './valuationExpiry.service';

describe('valuationExpiryService', () => {
  let service: valuationExpiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(valuationExpiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
