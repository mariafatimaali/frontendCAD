import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentLegalComponent } from './document-legal.component';

describe('DocumentLegalComponent', () => {
  let component: DocumentLegalComponent;
  let fixture: ComponentFixture<DocumentLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentLegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
