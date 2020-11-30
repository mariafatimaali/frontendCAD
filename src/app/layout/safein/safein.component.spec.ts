import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeinComponent } from './safein.component';

describe('SafeinComponent', () => {
  let component: SafeinComponent;
  let fixture: ComponentFixture<SafeinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
