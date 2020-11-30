import { TestBed } from '@angular/core/testing';

import { vendorManagementService } from './vendorManagement.service';

describe('vendorManagementService', () => {
  let service: vendorManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(vendorManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});