import { TestBed } from '@angular/core/testing';

//import { DefandDeferralService } from './defand-deferral.service';
import {InsuranceTicklerService} from './insuranceTickler.service';
describe('InsuranceTicklerService', () => {
  let service: InsuranceTicklerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceTicklerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
