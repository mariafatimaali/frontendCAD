import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbpwaiversComponent } from './sbpwaivers.component';

describe('SbpwaiversComponent', () => {
  let component: SbpwaiversComponent;
  let fixture: ComponentFixture<SbpwaiversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbpwaiversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbpwaiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
