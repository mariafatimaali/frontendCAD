import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { logBookDraftService } from './logBookDraft.service';

describe('CustomerDemographicService', () => {
  let service: logBookDraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(logBookDraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});