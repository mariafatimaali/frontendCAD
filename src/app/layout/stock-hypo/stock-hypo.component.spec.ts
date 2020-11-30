import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHypoComponent } from './stock-hypo.component';

describe('StockHypoComponent', () => {
  let component: StockHypoComponent;
  let fixture: ComponentFixture<StockHypoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockHypoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHypoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
