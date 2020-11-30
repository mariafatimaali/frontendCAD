import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpLogbookComponent } from './cp-logbook.component';

describe('CpLogbookComponent', () => {
  let component: CpLogbookComponent;
  let fixture: ComponentFixture<CpLogbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpLogbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpLogbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
