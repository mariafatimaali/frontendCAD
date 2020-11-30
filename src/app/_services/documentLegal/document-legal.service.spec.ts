import { TestBed } from '@angular/core/testing';

//import { DefandDeferralService } from './defand-deferral.service';
import {DocumentLegalService} from './document-legal.service';
describe('documentLegalService', () => {
  let service: DocumentLegalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentLegalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
