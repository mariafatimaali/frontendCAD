import { TestBed } from '@angular/core/testing';

//import { DefandDeferralService } from './defand-deferral.service';
import {pledgejointService} from './pledge-joint.service';
describe('pledgejointService', () => {
  let service: pledgejointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(pledgejointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
