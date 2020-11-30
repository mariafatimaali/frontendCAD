import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicklersComponent } from './ticklers.component';

describe('TicklersComponent', () => {
  let component: TicklersComponent;
  let fixture: ComponentFixture<TicklersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicklersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicklersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
