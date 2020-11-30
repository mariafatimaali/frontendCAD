import { TestBed } from '@angular/core/testing';

import { stockInspectionPledgeService } from './stockInspectionPledge.service'

describe('stockInspectionPledgeService', () => {
  let service: stockInspectionPledgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(stockInspectionPledgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
