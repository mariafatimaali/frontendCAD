import { TestBed } from '@angular/core/testing';

//import { DefandDeferralService } from './defand-deferral.service';
import {limitfeedingService} from './limitfeeding.service';
describe('limitfeedingService', () => {
  let service: limitfeedingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(limitfeedingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
