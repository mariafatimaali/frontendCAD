import { TestBed } from '@angular/core/testing';

import { CplogbookApprovedService} from './cplogbook-Approved.service';
//import { CplogbookApprovedService } from './customer-demographic.service';
//import { CustomerDemographicService } from './customer-demographic.service';

describe('CplogbookApprovedService', () => {
  let service: CplogbookApprovedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CplogbookApprovedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
