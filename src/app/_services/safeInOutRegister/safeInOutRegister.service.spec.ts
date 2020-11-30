import { TestBed } from '@angular/core/testing';

import { safeInOutRegisterService } from './safeInOutRegister.service';

describe('safeInOutRegisterService', () => {
  let service: safeInOutRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(safeInOutRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
