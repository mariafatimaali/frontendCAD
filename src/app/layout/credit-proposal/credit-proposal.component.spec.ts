import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditProposalComponent } from './credit-proposal.component';

describe('CreditProposalComponent', () => {
  let component: CreditProposalComponent;
  let fixture: ComponentFixture<CreditProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
