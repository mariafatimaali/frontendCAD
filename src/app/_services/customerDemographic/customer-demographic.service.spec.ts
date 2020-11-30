import { TestBed } from '@angular/core/testing';

import { CustomerDemographicService } from './customer-demographic.service';

describe('CustomerDemographicService', () => {
  let service: CustomerDemographicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerDemographicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
