import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationExpiryComponent } from './valuation-expiry.component';

describe('ValuationExpiryComponent', () => {
  let component: ValuationExpiryComponent;
  let fixture: ComponentFixture<ValuationExpiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationExpiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
