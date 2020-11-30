import { TestBed, inject } from '@angular/core/testing';

import { CustService } from './custdemo.service';

describe('CustService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustService]
    });
  });

  it('should be created', inject([CustService], (service: CustService) => {
    expect(service).toBeTruthy();
  }));
});