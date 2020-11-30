import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpMonitoringComponent } from './cp-monitoring.component';

describe('CpMonitoringComponent', () => {
  let component: CpMonitoringComponent;
  let fixture: ComponentFixture<CpMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
