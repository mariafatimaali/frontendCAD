import { TestBed } from '@angular/core/testing';

import { DocViewService } from './docview-service';

describe('DocViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocViewService = TestBed.get(DocViewService);
    expect(service).toBeTruthy();
  });
});
