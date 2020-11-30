import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDemoComponent } from './customer-demo.component';

describe('CustomerDemoComponent', () => {
  let component: CustomerDemoComponent;
  let fixture: ComponentFixture<CustomerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
