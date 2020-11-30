import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPledgeComponent } from './stock-pledge.component';

describe('StockPledgeComponent', () => {
  let component: StockPledgeComponent;
  let fixture: ComponentFixture<StockPledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
