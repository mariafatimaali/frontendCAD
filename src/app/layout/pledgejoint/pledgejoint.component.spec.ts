import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PledgejointComponent } from './pledgejoint.component';

describe('PledgejointComponent', () => {
  let component: PledgejointComponent;
  let fixture: ComponentFixture<PledgejointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PledgejointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PledgejointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
