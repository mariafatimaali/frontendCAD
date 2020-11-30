import { TestBed, inject } from '@angular/core/testing';

import { BranchService } from './branches.service';

describe('BranchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchService]
    });
  });

  it('should be created', inject([BranchService], (service: BranchService) => {
    expect(service).toBeTruthy();
  }));
});