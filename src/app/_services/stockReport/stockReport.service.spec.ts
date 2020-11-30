import { TestBed } from '@angular/core/testing';

import { stockReportService } from './stockReport.service';

describe('sbpWaiverService', () => {
  let service: stockReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(stockReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
