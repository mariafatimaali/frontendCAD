import { TestBed } from '@angular/core/testing';

import { CplogbookDraftService } from './cplogbook-draft.service';

describe('CustomerDemographicService', () => {
  let service: CplogbookDraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CplogbookDraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
