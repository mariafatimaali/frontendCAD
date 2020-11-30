import { TestBed } from '@angular/core/testing';

import { DefandDeferralService } from './defand-deferral.service';

describe('DefandDeferralService', () => {
  let service: DefandDeferralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefandDeferralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
