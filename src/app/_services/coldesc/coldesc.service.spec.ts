import { TestBed, inject } from '@angular/core/testing';

import { ColdescService } from './coldesc.service';

describe('ColdescService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColdescService]
    });
  });

  it('should be created', inject([ColdescService], (service: ColdescService) => {
    expect(service).toBeTruthy();
  }));
});