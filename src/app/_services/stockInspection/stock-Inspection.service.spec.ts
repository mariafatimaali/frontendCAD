import { TestBed } from '@angular/core/testing';

import { stockInspectionService } from './stock-Inspection.service';

describe('stockInspectionService', () => {
  let service: stockInspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(stockInspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
